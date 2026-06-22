export type MapLayerConfig = {
  id: string
  label: string
  defaultOn: boolean
  color: string
  fillColor?: string
  strokeColor?: string
  dashArray?: string
  fillOpacity?: number
  weight?: number
  kind: "polygon" | "point" | "pin"
}

export type LayerFileConfig = MapLayerConfig & {
  file: string
}

export const layerFiles: LayerFileConfig[] = [
  {
    id: "car",
    file: "/data/layers/car.json",
    label: "CAR",
    defaultOn: false,
    color: "#facc15",
    strokeColor: "#ca8a04",
    dashArray: "6 4",
    fillOpacity: 0.08,
    weight: 2,
    kind: "polygon",
  },
  {
    id: "projetos",
    file: "/data/layers/projetos.json",
    label: "Localização do Projeto ou Atividade",
    defaultOn: true,
    color: "#ef4444",
    kind: "pin",
  },
  {
    id: "rio_doce",
    file: "/data/layers/rio-doce-calha.json",
    label: "Rio Doce",
    defaultOn: true,
    color: "#2563eb",
    fillColor: "#2563eb",
    strokeColor: "#1d4ed8",
    fillOpacity: 0.75,
    weight: 1.5,
    kind: "polygon",
  },
  {
    id: "area_elegivel",
    file: "/data/layers/buffer-5km.json",
    label: "Área Elegível (5 km Rio Doce)",
    defaultOn: true,
    color: "#86efac",
    fillColor: "#86efac",
    strokeColor: "#4ade80",
    fillOpacity: 0.35,
    weight: 1,
    kind: "polygon",
  },
  {
    id: "inundacao",
    file: "/data/layers/inundacao.json",
    label: "Mancha de Inundação",
    defaultOn: false,
    color: "#e879f9",
    fillColor: "#e879f9",
    strokeColor: "#c026d3",
    fillOpacity: 0.45,
    weight: 1.5,
    kind: "polygon",
  },
  {
    id: "assentamentos",
    file: "/data/layers/assentamentos.json",
    label: "Assentamentos",
    defaultOn: false,
    color: "#a855f7",
    strokeColor: "#9333ea",
    fillColor: "#a855f7",
    fillOpacity: 0.12,
    weight: 2,
    kind: "polygon",
  },
  {
    id: "comunidades",
    file: "/data/layers/comunidades.json",
    label: "Povos e Comunidades Tradicionais",
    defaultOn: true,
    color: "#a16207",
    strokeColor: "#92400e",
    fillColor: "#ca8a04",
    fillOpacity: 0.15,
    weight: 2,
    kind: "polygon",
  },
  {
    id: "ucs",
    file: "/data/layers/ucs.json",
    label: "Unidades de Conservação",
    defaultOn: true,
    color: "#38bdf8",
    strokeColor: "#0ea5e9",
    fillColor: "#7dd3fc",
    fillOpacity: 0.18,
    weight: 2,
    kind: "polygon",
  },
]

export const layerSources = {
  rio_doce:
    "ANA/Geobases — BHO250, trechos de drenagem do Rio Doce (cocursodag=678)",
  buffer_5km:
    "Derivado dos trechos oficiais do Rio Doce — buffer de 5 km (Turf.js)",
  inundacao:
    "ANA/Geobases — trechos inundáveis do Rio Doce no ES (Vulnerabilidade a Inundações)",
  ucs: "MMA/CNUC via Geobases ES — Unidades de Conservação",
  assentamentos: "INCRA via Geobases ES — Assentamentos na região do Rio Doce",
  quilombolas: "INCRA via Geobases ES — Territórios quilombolas",
  car: "INCRA/SIGEF via Geobases ES — parcelas georreferenciadas (amostra)",
  comunidades:
    "INCRA quilombolas + Geobases/IJSN comunidades nos municípios atingidos",
  projetos:
    "Pontos de exemplo derivados de assentamentos INCRA (a popular com projetos reais)",
} as const
