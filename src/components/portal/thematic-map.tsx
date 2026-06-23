"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LayeredMap } from "@/components/map/layered-map"

export function ThematicMap() {
  return (
    <Card id="mapas">
      <CardHeader>
        <CardTitle>Mapa temático</CardTitle>
      </CardHeader>
      <CardContent>
        <LayeredMap defaultView="municipio" showTabs={false} />
      </CardContent>
    </Card>
  )
}
