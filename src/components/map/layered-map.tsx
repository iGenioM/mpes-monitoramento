"use client"

import L from "leaflet"
import { useEffect, useMemo, useState } from "react"
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import type { FeatureCollection, GeoJsonObject, Point } from "geojson"

import { MapLayerLegend } from "@/components/portal/map-layer-legend"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  layerFiles,
  layerSources,
  type LayerFileConfig,
} from "@/lib/data/map-layer-files"
import { lightMapTiles } from "@/lib/map/tiles"

const mapViews = [
  {
    value: "bioma",
    label: "Bioma",
    center: [-19.6, -40.3] as [number, number],
    zoom: 7,
  },
  {
    value: "mesorregiao",
    label: "Mesorregião",
    center: [-19.5, -40.2] as [number, number],
    zoom: 7,
  },
  {
    value: "bacia",
    label: "Bacia",
    center: [-19.2, -40.35] as [number, number],
    zoom: 8,
  },
  {
    value: "municipio",
    label: "Município",
    center: [-19.55, -40.45] as [number, number],
    zoom: 9,
  },
]

const projectPinIcon = L.divIcon({
  className: "project-pin-icon",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30" fill="none">
    <path d="M11 0C4.925 0 0 4.925 0 11c0 8.25 11 19 11 19s11-10.75 11-19C22 4.925 17.075 0 11 0z" fill="#ef4444"/>
    <circle cx="11" cy="11" r="4" fill="white"/>
  </svg>`,
  iconSize: [22, 30],
  iconAnchor: [11, 30],
  popupAnchor: [0, -30],
})

const renderOrder = [
  "area_elegivel",
  "inundacao",
  "ucs",
  "assentamentos",
  "comunidades",
  "car",
  "rio_doce",
  "projetos",
] as const

type LayerData = Record<string, GeoJsonObject | null>

function getLayerStyle(layer: LayerFileConfig): L.PathOptions {
  return {
    color: layer.strokeColor ?? layer.color,
    fillColor: layer.fillColor ?? layer.color,
    fillOpacity: layer.fillOpacity ?? 0.5,
    weight: layer.weight ?? 2,
    dashArray: layer.dashArray,
  }
}

function GeoJsonLayer({
  layer,
  data,
}: {
  layer: LayerFileConfig
  data: GeoJsonObject
}) {
  const style = getLayerStyle(layer)

  return (
    <GeoJSON
      data={data}
      style={style}
      onEachFeature={(feature, leafletLayer) => {
        const name = feature.properties?.name ?? layer.label
        const municipio = feature.properties?.municipio
        leafletLayer.bindTooltip(
          municipio ? `${name} (${municipio})` : String(name),
          { sticky: true }
        )
      }}
    />
  )
}

function ProjectPins({ data }: { data: FeatureCollection<Point> }) {
  const features = data.features ?? []

  return (
    <>
      {features.map((feature, index) => {
        if (feature.type !== "Feature" || feature.geometry?.type !== "Point") {
          return null
        }

        const [lng, lat] = feature.geometry.coordinates
        const name = feature.properties?.name ?? "Projeto"
        const municipio = feature.properties?.municipio ?? "ES"

        return (
          <Marker
            key={`${name}-${index}`}
            position={[lat, lng]}
            icon={projectPinIcon}
          >
            <Popup>
              <strong>{name}</strong>
              <br />
              {municipio}
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

function LayeredMapView({
  center,
  zoom,
  activeLayers,
  layerData,
  projectPins,
}: {
  center: [number, number]
  zoom: number
  activeLayers: Record<string, boolean>
  layerData: LayerData
  projectPins?: FeatureCollection<Point> | null
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution={lightMapTiles.attribution}
        url={lightMapTiles.url}
        subdomains={lightMapTiles.subdomains}
      />

      {renderOrder.map((layerId) => {
        const layer = layerFiles.find((item) => item.id === layerId)
        if (!layer || !activeLayers[layerId]) return null

        if (layerId === "projetos") {
          const pinData = projectPins ?? layerData.projetos
          if (!pinData || pinData.type !== "FeatureCollection") return null
          return (
            <ProjectPins
              key={layerId}
              data={pinData as FeatureCollection<Point>}
            />
          )
        }

        const data = layerData[layerId]
        if (!data) return null

        return <GeoJsonLayer key={layerId} layer={layer} data={data} />
      })}
    </MapContainer>
  )
}

type LayeredMapProps = {
  projectPins?: FeatureCollection<Point> | null
  defaultView?: string
  heightClassName?: string
  showTabs?: boolean
  showBadges?: boolean
}

export function LayeredMap({
  projectPins = null,
  defaultView = "bacia",
  heightClassName = "h-[520px]",
  showTabs = true,
  showBadges = true,
}: LayeredMapProps) {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(layerFiles.map((layer) => [layer.id, layer.defaultOn]))
  )
  const [activeView, setActiveView] = useState(defaultView)
  const [layerData, setLayerData] = useState<LayerData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadLayers() {
      const layersToLoad = projectPins
        ? layerFiles.filter((layer) => layer.id !== "projetos")
        : layerFiles

      const entries = await Promise.all(
        layersToLoad.map(async (layer) => {
          try {
            const response = await fetch(layer.file)
            if (!response.ok) return [layer.id, null] as const
            const data = (await response.json()) as GeoJsonObject
            return [layer.id, data] as const
          } catch {
            return [layer.id, null] as const
          }
        })
      )

      if (!cancelled) {
        setLayerData(Object.fromEntries(entries))
        setLoading(false)
      }
    }

    loadLayers()

    return () => {
      cancelled = true
    }
  }, [projectPins])

  const currentView =
    mapViews.find((view) => view.value === activeView) ?? mapViews[2]

  const loadedCount = useMemo(
    () => Object.values(layerData).filter(Boolean).length,
    [layerData]
  )

  function toggleLayer(id: string) {
    setActiveLayers((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const mapContent = (view: (typeof mapViews)[number]) => (
    <div className={`map-shell relative overflow-hidden rounded-lg border ${heightClassName}`}>
      {loading ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Carregando camadas geográficas...
        </div>
      ) : (
        <LayeredMapView
          center={view.center}
          zoom={view.zoom}
          activeLayers={activeLayers}
          layerData={layerData}
          projectPins={projectPins}
        />
      )}

      <div className="absolute top-3 right-3 z-[4] w-72 max-w-[calc(100%-1.5rem)]">
        <MapLayerLegend
          layers={layerFiles}
          activeLayers={activeLayers}
          onToggle={toggleLayer}
        />
      </div>
    </div>
  )

  if (!showTabs) {
    return (
      <div className="space-y-4">
        {mapContent(currentView)}
        {showBadges ? (
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Visualização: {currentView.label}</Badge>
            <Badge variant="outline">
              {loadedCount}/{projectPins ? layerFiles.length - 1 : layerFiles.length}{" "}
              camadas carregadas
            </Badge>
            <Badge variant="outline">{layerSources.rio_doce}</Badge>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList>
          {mapViews.map((view) => (
            <TabsTrigger key={view.value} value={view.value}>
              {view.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {mapViews.map((view) => (
          <TabsContent key={view.value} value={view.value}>
            {mapContent(view)}
          </TabsContent>
        ))}
      </Tabs>

      {showBadges ? (
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Visualização: {currentView.label}</Badge>
          <Badge variant="outline">
            {loadedCount}/{projectPins ? layerFiles.length - 1 : layerFiles.length}{" "}
            camadas carregadas
          </Badge>
          <Badge variant="outline">{layerSources.rio_doce}</Badge>
        </div>
      ) : null}
    </div>
  )
}
