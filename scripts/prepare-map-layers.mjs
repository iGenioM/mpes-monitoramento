import buffer from "@turf/buffer"
import bbox from "@turf/bbox"
import centroid from "@turf/centroid"
import flatten from "@turf/flatten"
import { feature, featureCollection } from "@turf/helpers"
import simplify from "@turf/simplify"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const SOURCE_DIR = process.env.MAP_SOURCE_DIR ?? "/tmp/map-download"
const OUTPUT_DIR = path.resolve("public/data/layers")

const RIO_DOCE_BBOX = [-41.2, -20.6, -39.4, -18.2] // [minLng, minLat, maxLng, maxLat]

const MUNICIPIOS_ATINGIDOS_CODIGOS = new Set([
  "3200409",
  "3200607",
  "3200805",
  "3201506",
  "3201605",
  "3202207",
  "3203205",
  "3203353",
  "3204909",
  "3205006",
  "3205014",
])

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
}

function inBbox(geometry) {
  if (!geometry) return false
  const [minLng, minLat, maxLng, maxLat] = bbox(feature(geometry))
  return !(
    maxLng < RIO_DOCE_BBOX[0] ||
    minLng > RIO_DOCE_BBOX[2] ||
    maxLat < RIO_DOCE_BBOX[1] ||
    minLat > RIO_DOCE_BBOX[3]
  )
}

function roundCoords(coords) {
  if (typeof coords[0] === "number") {
    return [Number(coords[0].toFixed(5)), Number(coords[1].toFixed(5))]
  }
  return coords.map(roundCoords)
}

function cleanFeature(input, nameKey = "name") {
  const geometry = {
    ...input.geometry,
    coordinates: roundCoords(input.geometry.coordinates),
  }

  const props = input.properties ?? {}
  const name =
    props[nameKey] ??
    props.NOMES_1 ??
    props.nome_uc ??
    props.nome_proje ??
    props.nm_comunid ??
    props.nome_area ??
    props.Nome ??
    props.nome ??
    props.NORIOCOMP ??
    props.noriocomp ??
    "Sem nome"

  const municipio = props.MUNICIPI_1 ?? props.municipio ?? props.municip ?? null

  return {
    type: "Feature",
    properties: {
      name: String(name),
      ...(municipio ? { municipio: String(municipio) } : {}),
    },
    geometry,
  }
}

function cleanCollection(collection, options = {}) {
  const { nameKey, filter } = options
  const features = (collection.features ?? [])
    .filter((item) => inBbox(item.geometry))
    .filter((item) => (filter ? filter(item) : true))
    .map((item) => cleanFeature(item, nameKey))

  return { type: "FeatureCollection", features }
}

function linesToPolygon(fc, kilometers) {
  const flat = flatten(fc)
  const lines = featureCollection(
    flat.features.filter((f) => f.geometry.type.includes("Line"))
  )

  if (!lines.features.length) return null

  const buffered = buffer(lines, kilometers, { units: "kilometers" })
  return simplify(buffered, { tolerance: 0.002, highQuality: false })
}

function filterByMunicipio(item, field = "municipio") {
  const codigo = String(item.properties?.COD_MUN_1 ?? item.properties?.cod_mun ?? "")
  if (codigo && MUNICIPIOS_ATINGIDOS_CODIGOS.has(codigo)) {
    return true
  }

  const value = normalize(item.properties?.[field])
  const names = [
    "anchieta",
    "aracruz",
    "baixo guandu",
    "colatina",
    "conceicao da barra",
    "fundao",
    "linhares",
    "marilandia",
    "sao mateus",
    "serra",
    "sooretama",
  ]

  return names.some((name) => value.includes(name))
}

function osmToGeoJson(osm) {
  const features = []

  for (const element of osm.elements ?? []) {
    if (element.type !== "way" || !element.geometry?.length) continue
    const name = element.tags?.name ?? ""
    if (!normalize(name).includes("doce")) continue

    const coordinates = element.geometry.map((point) => [point.lon, point.lat])
    features.push({
      type: "Feature",
      properties: { name },
      geometry: {
        type: "LineString",
        coordinates: roundCoords(coordinates),
      },
    })
  }

  return { type: "FeatureCollection", features }
}

async function readJson(fileName) {
  const filePath = path.join(SOURCE_DIR, fileName)
  return JSON.parse(await readFile(filePath, "utf8"))
}

async function writeLayer(fileName, data) {
  await writeFile(
    path.join(OUTPUT_DIR, fileName),
    JSON.stringify(data)
  )

  const sizeKb = Math.round(Buffer.byteLength(JSON.stringify(data)) / 1024)
  const count = data.features?.length ?? 1
  console.log(`✓ ${fileName} (${count} features, ${sizeKb} KB)`)
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const rioDoceTrechos = await readJson("rio-doce-trechos-ana.json")
  const rioDoceBacia = await readJson("rio-doce-bacia-ana.json")
  const inundaveis = await readJson("inundaveis-es.json")
  const ucs = await readJson("ucs-es.json")
  const assentamentos = await readJson("assentamentos-es.json")
  const quilombolas = await readJson("quilombolas-es.json")
  const carSigef = await readJson("car-sigef-es.json")
  const comunidades = await readJson("comunidades-es.json")
  const osmRio = await readJson("rio-doce-overpass.json")

  const rioDoceLines = cleanCollection(rioDoceTrechos, { nameKey: "noriocomp" })

  const rioDoceMerged = {
    type: "FeatureCollection",
    features: rioDoceLines.features,
    metadata: {
      source: "ANA/Geobases — BHO250 trechos de drenagem (cocursodag=678, Rio Doce)",
    },
  }

  const rioDoceCalha = linesToPolygon(rioDoceLines, 0.15)
  if (rioDoceCalha) {
    rioDoceCalha.metadata = {
      source: "Derivado dos trechos oficiais do Rio Doce (ANA/Geobases)",
    }
    await writeLayer("rio-doce-calha.json", rioDoceCalha)
  }

  const buffer5km = linesToPolygon(rioDoceLines, 5)
  if (buffer5km) {
    buffer5km.metadata = {
      source: "Buffer de 5 km sobre trechos do Rio Doce (ANA/Geobases)",
    }
    await writeLayer("buffer-5km.json", buffer5km)
  }

  const inundacaoLines = cleanCollection(inundaveis, {
    nameKey: "NORIOCOMP",
    filter: (item) => {
      const props = item.properties ?? {}
      return (
        String(props.COCURSODAG) === "678" ||
        normalize(props.NORIOCOMP).includes("doce")
      )
    },
  })

  const inundacaoPoligono = linesToPolygon(inundacaoLines, 0.4)
  if (inundacaoPoligono) {
    inundacaoPoligono.metadata = {
      source:
        "ANA/Geobases — trechos inundáveis do Rio Doce no ES (Vulnerabilidade a Inundações)",
      note: "Representa áreas com ocorrência de inundação mapeadas pela ANA ao longo do Rio Doce.",
    }
    await writeLayer("inundacao.json", inundacaoPoligono)
  }

  const baciaDoce = cleanCollection(rioDoceBacia, { nameKey: "cobacia" })
  baciaDoce.metadata = {
    source: "ANA/Geobases — ottobacias da bacia do Rio Doce (cocursodag=678)",
  }

  await writeLayer("rio-doce-trechos.json", rioDoceMerged)

  await writeLayer(
    "ucs.json",
    cleanCollection(ucs, {
      nameKey: "nome_uc",
      filter: (item) => inBbox(item.geometry),
    })
  )

  await writeLayer(
    "assentamentos.json",
    cleanCollection(assentamentos, {
      nameKey: "nome_proje",
      filter: (item) => filterByMunicipio(item),
    })
  )

  await writeLayer(
    "quilombolas.json",
    cleanCollection(quilombolas, {
      nameKey: "nm_comunid",
      filter: (item) => inBbox(item.geometry),
    })
  )

  await writeLayer(
    "car.json",
    cleanCollection(carSigef, {
      nameKey: "nome_area",
      filter: (item) => inBbox(item.geometry),
    })
  )

  await writeLayer(
    "comunidades.json",
    {
      type: "FeatureCollection",
      features: [
        ...cleanCollection(quilombolas, {
          nameKey: "nm_comunid",
          filter: (item) => inBbox(item.geometry),
        }).features,
        ...cleanCollection(comunidades, {
          nameKey: "NOMES_1",
          filter: (item) => filterByMunicipio(item, "MUNICIPI_1"),
        }).features,
      ],
      metadata: {
        source:
          "INCRA quilombolas + Geobases/IJSN comunidades nos municípios atingidos",
      },
    }
  )

  const projectExamples = {
    type: "FeatureCollection",
    features: assentamentos.features
      .filter((item) => filterByMunicipio(item))
      .slice(0, 8)
      .map((item, index) => {
        const center = centroid(item)
        return {
          type: "Feature",
          properties: {
            name: `Projeto exemplo ${index + 1} — ${item.properties?.nome_proje ?? "Ação de recuperação"}`,
            municipio: item.properties?.municipio ?? "ES",
          },
          geometry: center.geometry,
        }
      }),
    metadata: {
      source:
        "Pontos derivados de assentamentos INCRA na região do Rio Doce (exemplos para o mapa)",
    },
  }

  await writeLayer("projetos.json", projectExamples)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
