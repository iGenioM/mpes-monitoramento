"use client"

import { IconEye, IconEyeOff } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { layerFiles, type LayerFileConfig } from "@/lib/data/map-layer-files"
import { cn } from "@/lib/utils"

type MapLayerLegendProps = {
  layers: LayerFileConfig[]
  activeLayers: Record<string, boolean>
  onToggle: (id: string) => void
}

function LayerSwatch({ layer }: { layer: LayerFileConfig }) {
  if (layer.kind === "pin") {
    return (
      <span className="relative flex size-4 items-center justify-center">
        <span
          className="absolute bottom-0 size-2.5 rotate-45 rounded-sm"
          style={{ backgroundColor: layer.color }}
        />
        <span
          className="absolute bottom-1.5 size-2 rounded-full"
          style={{ backgroundColor: layer.color }}
        />
      </span>
    )
  }

  const isDashed = Boolean(layer.dashArray)
  const isOutline = layer.kind === "polygon" && (layer.fillOpacity ?? 0) < 0.2

  return (
    <span
      className={cn("size-4 shrink-0 rounded-sm border-2")}
      style={{
        backgroundColor: isOutline
          ? "transparent"
          : (layer.fillColor ?? layer.color),
        borderColor: layer.strokeColor ?? layer.color,
        borderStyle: isDashed ? "dashed" : "solid",
        opacity: isOutline ? 1 : 0.9,
      }}
    />
  )
}

export function MapLayerLegend({
  layers,
  activeLayers,
  onToggle,
}: MapLayerLegendProps) {
  return (
    <div className="rounded-lg border bg-background/95 p-3 shadow-sm backdrop-blur">
      <p className="mb-2 text-sm font-medium">Camadas</p>
      <div className="flex flex-col gap-0.5">
        {layers.map((layer) => {
          const isActive = activeLayers[layer.id]

          return (
            <Button
              key={layer.id}
              size="sm"
              variant="ghost"
              className={cn(
                "h-8 w-full justify-start gap-2.5 px-2 font-normal",
                !isActive && "opacity-50"
              )}
              onClick={() => onToggle(layer.id)}
            >
              {isActive ? (
                <IconEye className="size-4 shrink-0 text-muted-foreground" />
              ) : (
                <IconEyeOff className="size-4 shrink-0 text-muted-foreground" />
              )}
              <LayerSwatch layer={layer} />
              <span className="truncate text-left text-xs">{layer.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
