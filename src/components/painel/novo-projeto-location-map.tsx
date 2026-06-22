"use client"

import L from "leaflet"
import { useEffect, useState } from "react"
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet"
import type { GeoJsonObject } from "geojson"

import { MapLayerLegend } from "@/components/portal/map-layer-legend"
import { layerFiles, type LayerFileConfig } from "@/lib/data/map-layer-files"
import { satelliteMapTiles } from "@/lib/map/tiles"

const renderOrder = [
  "area_elegivel",
  "inundacao",
  "ucs",
  "assentamentos",
  "comunidades",
  "car",
  "rio_doce",
] as const

const projectPinIcon = L.divIcon({
  className: "project-pin-icon",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30" fill="none">
    <path d="M11 0C4.925 0 0 4.925 0 11c0 8.25 11 19 11 19s11-10.75 11-19C22 4.925 17.075 0 11 0z" fill="#2563eb"/>
    <circle cx="11" cy="11" r="4" fill="white"/>
  </svg>`,
  iconSize: [22, 30],
  iconAnchor: [11, 30],
  popupAnchor: [0, -30],
})

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
  return (
    <GeoJSON
      data={data}
      style={getLayerStyle(layer)}
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

function MapClickHandler({
  onPositionChange,
}: {
  onPositionChange: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click(event) {
      onPositionChange(event.latlng.lat, event.latlng.lng)
    },
  })
  return null
}

type NovoProjetoLocationMapProps = {
  latitude: number
  longitude: number
  onPositionChange?: (lat: number, lng: number) => void
  readOnly?: boolean
}

export function NovoProjetoLocationMap({
  latitude,
  longitude,
  onPositionChange,
  readOnly = false,
}: NovoProjetoLocationMapProps) {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(layerFiles.map((layer) => [layer.id, layer.defaultOn]))
  )
  const [layerData, setLayerData] = useState<LayerData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadLayers() {
      const layersToLoad = layerFiles.filter((layer) => layer.kind === "polygon")

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
  }, [])

  function toggleLayer(id: string) {
    setActiveLayers((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="map-shell relative h-[360px] overflow-hidden rounded-lg border">
      {loading ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Carregando mapa...
        </div>
      ) : (
        <MapContainer
          center={[latitude, longitude]}
          zoom={10}
          className="h-full w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution={satelliteMapTiles.attribution}
            url={satelliteMapTiles.url}
          />
          {!readOnly && onPositionChange ? (
            <MapClickHandler onPositionChange={onPositionChange} />
          ) : null}
          {renderOrder.map((layerId) => {
            const layer = layerFiles.find((item) => item.id === layerId)
            const data = layerData[layerId]
            if (!layer || !data || !activeLayers[layerId]) return null
            return <GeoJsonLayer key={layerId} layer={layer} data={data} />
          })}
          <Marker position={[latitude, longitude]} icon={projectPinIcon}>
            <Popup>Localização do projeto</Popup>
          </Marker>
        </MapContainer>
      )}

      <div className="absolute top-3 right-3 z-[4] w-64 max-w-[calc(100%-1.5rem)]">
        <MapLayerLegend
          layers={layerFiles}
          activeLayers={activeLayers}
          onToggle={toggleLayer}
        />
      </div>
    </div>
  )
}
