"use client"

import { useMemo } from "react"
import type { FeatureCollection, Point } from "geojson"

import { LayeredMap } from "@/components/map/layered-map"
import { gestaoProjectPins } from "@/lib/data/gestao"

function toProjectGeoJson(): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: gestaoProjectPins.map((project) => ({
      type: "Feature",
      properties: {
        name: project.name,
        municipio: project.municipio,
      },
      geometry: {
        type: "Point",
        coordinates: [project.coords[1], project.coords[0]],
      },
    })),
  }
}

export function GestaoMap() {
  const projectPins = useMemo(() => toProjectGeoJson(), [])

  return (
    <LayeredMap
      projectPins={projectPins}
      defaultView="bacia"
      heightClassName="h-[480px]"
    />
  )
}
