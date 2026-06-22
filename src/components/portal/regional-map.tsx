"use client"

import { useEffect, useMemo, useState } from "react"
import {
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet"
import type { Layer, PathOptions } from "leaflet"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { lightMapTiles } from "@/lib/map/tiles"
import {
  getFilteredMunicipalities,
  getMunicipalityStatus,
  projectStatusColors,
  projectStatusLabels,
  type FilterState,
  type ProjectStatus,
} from "@/lib/data/rio-doce"

type RegionalMapProps = {
  filters: FilterState
  selectedMunicipalityId: string | null
  onSelectMunicipality: (id: string | null) => void
}

type GeoFeature = {
  type: "Feature"
  properties?: { id?: string; name?: string }
  geometry: unknown
}

type GeoFeatureCollection = {
  type: "FeatureCollection"
  features: GeoFeature[]
}

function MapResizer() {
  const map = useMap()

  useEffect(() => {
    const timeout = window.setTimeout(() => map.invalidateSize(), 100)
    return () => window.clearTimeout(timeout)
  }, [map])

  return null
}

function getFeatureStyle(
  municipalityId: string,
  isSelected: boolean,
  isDimmed: boolean
): PathOptions {
  const status = getMunicipalityStatus(municipalityId)
  const fillColor = projectStatusColors[status]

  return {
    fillColor,
    fillOpacity: isDimmed ? 0.15 : isSelected ? 0.85 : 0.65,
    color: isSelected ? "#0f172a" : "#ffffff",
    weight: isSelected ? 2.5 : 1,
  }
}

export function RegionalMap({
  filters,
  selectedMunicipalityId,
  onSelectMunicipality,
}: RegionalMapProps) {
  const [geoData, setGeoData] = useState<GeoFeatureCollection | null>(null)

  const filteredIds = useMemo(
    () => new Set(getFilteredMunicipalities(filters).map((m) => m.id)),
    [filters]
  )

  useEffect(() => {
    fetch("/data/es-municipios.json")
      .then((res) => res.json())
      .then((data: GeoFeatureCollection) => setGeoData(data))
      .catch(() => setGeoData(null))
  }, [])

  function onEachFeature(feature: GeoFeature, layer: Layer) {
    const municipalityId = String(feature.properties?.id ?? "")
    const name = String(feature.properties?.name ?? "Município")
    const status = getMunicipalityStatus(municipalityId)
    const isAffected = status !== "nao_atingido"

    layer.bindPopup(
      `<strong>${name}</strong><br/>${projectStatusLabels[status]}`
    )

    if (!isAffected) return

    layer.on({
      click: () => onSelectMunicipality(municipalityId),
      mouseover: (e) => {
        const target = e.target
        target.setStyle({ fillOpacity: 0.9, weight: 2 })
      },
      mouseout: (e) => {
        const target = e.target
        const isSelected = selectedMunicipalityId === municipalityId
        const isDimmed =
          filteredIds.size > 0 && !filteredIds.has(municipalityId)
        target.setStyle(getFeatureStyle(municipalityId, isSelected, isDimmed))
      },
    })
  }

  const legendStatuses: ProjectStatus[] = [
    "em_andamento",
    "investimento_aprovado",
    "investimento_planejado",
    "em_estudo",
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Mapa regional</CardTitle>
        <CardDescription>
          Clique em um município atingido para ver os detalhes ao lado.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="map-shell h-[420px] overflow-hidden rounded-lg border">
          <MapContainer
            center={[-19.6, -40.3]}
            zoom={7}
            className="h-full w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution={lightMapTiles.attribution}
              url={lightMapTiles.url}
              subdomains={lightMapTiles.subdomains}
            />
            <MapResizer />
            {geoData && (
              <GeoJSON
                key={`${selectedMunicipalityId}-${JSON.stringify(filters)}`}
                data={geoData}
                style={(feature) => {
                  const municipalityId = String(feature?.properties?.id ?? "")
                  const isSelected = selectedMunicipalityId === municipalityId
                  const isDimmed =
                    filteredIds.size > 0 && !filteredIds.has(municipalityId)
                  return getFeatureStyle(municipalityId, isSelected, isDimmed)
                }}
                onEachFeature={onEachFeature}
              />
            )}
          </MapContainer>
        </div>

        <div className="flex flex-wrap gap-2">
          {legendStatuses.map((status) => (
            <Badge key={status} variant="outline" className="gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: projectStatusColors[status] }}
              />
              {projectStatusLabels[status]}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
