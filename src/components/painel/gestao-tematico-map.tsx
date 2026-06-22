"use client"

import { useEffect, useMemo, useState } from "react"
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet"
import type { Layer, PathOptions } from "leaflet"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  densidadeMunicipios,
  mapaLegendaFaixas,
  temasMapaGestao,
} from "@/lib/data/gestao"
import { lightMapTiles } from "@/lib/map/tiles"
import { cn } from "@/lib/utils"

type GeoFeature = {
  type: "Feature"
  properties?: { id?: string; name?: string }
  geometry: unknown
}

type GeoFeatureCollection = {
  type: "FeatureCollection"
  features: GeoFeature[]
}

const COR_SEM_DADOS = "#e8eef5"

function MapResizer() {
  const map = useMap()

  useEffect(() => {
    const timeout = window.setTimeout(() => map.invalidateSize(), 100)
    const onResize = () => map.invalidateSize()
    window.addEventListener("resize", onResize)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener("resize", onResize)
    }
  }, [map])

  return null
}

function getCorPorFaixa(faixa: string | undefined) {
  if (!faixa) return COR_SEM_DADOS
  return mapaLegendaFaixas.find((item) => item.faixa === faixa)?.cor ?? COR_SEM_DADOS
}

function getFaixaPorMunicipio(nome: string, tema: string) {
  const registro = densidadeMunicipios.find(
    (item) => item.municipio.toLowerCase() === nome.toLowerCase()
  )

  if (!registro) return undefined

  if (tema === "beneficiarios") {
    return registro.faixaBeneficiarios
  }

  if (tema === "investimento") {
    const faixasInvestimento: Record<string, string> = {
      Linhares: "40+",
      Colatina: "30-40",
      "São Mateus": "30-40",
      Serra: "20-30",
      Aracruz: "20-30",
      "Baixo Guandu": "10-20",
      Sooretama: "1-10",
      "Conceição da Barra": "10-20",
      Fundão: "10-20",
      Marilândia: "1-10",
      Anchieta: "1-10",
    }
    return faixasInvestimento[nome]
  }

  return registro.faixa
}

function getFeatureStyle(faixa: string | undefined): PathOptions {
  return {
    fillColor: getCorPorFaixa(faixa),
    fillOpacity: faixa ? 0.9 : 0.55,
    color: "#ffffff",
    weight: 1,
  }
}

type GestaoTematicoMapProps = {
  className?: string
}

export function GestaoTematicoMap({ className }: GestaoTematicoMapProps) {
  const [geoData, setGeoData] = useState<GeoFeatureCollection | null>(null)
  const [tema, setTema] = useState("quantidade")

  const faixaPorMunicipio = useMemo(() => {
    const map = new Map<string, string | undefined>()
    for (const item of densidadeMunicipios) {
      map.set(item.municipio.toLowerCase(), getFaixaPorMunicipio(item.municipio, tema))
    }
    return map
  }, [tema])

  useEffect(() => {
    fetch("/data/es-municipios.json")
      .then((res) => res.json())
      .then((data: GeoFeatureCollection) => setGeoData(data))
      .catch(() => setGeoData(null))
  }, [])

  function onEachFeature(feature: GeoFeature, layer: Layer) {
    const nome = String(feature.properties?.name ?? "Município")
    const faixa =
      faixaPorMunicipio.get(nome.toLowerCase()) ??
      getFaixaPorMunicipio(nome, tema)
    const temaLabel =
      temasMapaGestao.find((item) => item.value === tema)?.label ?? "Tema"

    layer.bindTooltip(
      faixa
        ? `<strong>${nome}</strong><br/>${temaLabel}: ${faixa}`
        : `<strong>${nome}</strong><br/>Sem dados para o tema`
    )

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({ fillOpacity: 1, weight: 1.5 })
      },
      mouseout: (event) => {
        event.target.setStyle(getFeatureStyle(faixa))
      },
    })
  }

  return (
    <div className={cn("flex min-h-[400px] flex-col gap-3", className)}>
      <div className="relative z-10 flex shrink-0 items-center justify-between gap-3">
        <Label htmlFor="tema-mapa" className="text-sm font-medium">
          Tema
        </Label>
        <Select value={tema} onValueChange={(value) => value && setTema(value)}>
          <SelectTrigger id="tema-mapa" className="h-8 w-[220px]">
            <SelectValue placeholder="Selecione o tema" />
          </SelectTrigger>
          <SelectContent>
            {temasMapaGestao.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="map-shell relative min-h-0 flex-1 overflow-hidden rounded-lg border">
        <MapContainer
          center={[-19.4, -40.5]}
          zoom={7}
          className="absolute inset-0 h-full w-full"
          scrollWheelZoom={false}
          dragging
          zoomControl
        >
          <TileLayer
            attribution={lightMapTiles.attribution}
            url={lightMapTiles.url}
            subdomains={lightMapTiles.subdomains}
          />
          <MapResizer />
          {geoData ? (
            <GeoJSON
              key={tema}
              data={geoData}
              style={(feature) => {
                const nome = String(feature?.properties?.name ?? "")
                const faixa =
                  faixaPorMunicipio.get(nome.toLowerCase()) ??
                  getFaixaPorMunicipio(nome, tema)
                return getFeatureStyle(faixa)
              }}
              onEachFeature={onEachFeature}
            />
          ) : null}
        </MapContainer>

        <div className="pointer-events-none absolute right-2 bottom-2 z-[4] rounded-md border bg-background/95 p-2 shadow-sm">
          <p className="mb-1.5 text-[10px] font-medium text-muted-foreground">
            Legenda
          </p>
          <div className="space-y-1">
            {mapaLegendaFaixas.map((item) => (
              <div key={item.faixa} className="flex items-center gap-1.5 text-[10px]">
                <span
                  className="size-3 shrink-0 rounded-sm border border-white"
                  style={{ backgroundColor: item.cor }}
                />
                <span>{item.faixa}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
