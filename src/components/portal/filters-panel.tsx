"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LabeledSelect } from "@/components/ui/labeled-select"
import {
  defaultFilters,
  eixosTematicos,
  mesorregioes,
  municipiosAtingidos,
  statusProjetoOptions,
  type FilterState,
} from "@/lib/data/rio-doce"

type FiltersPanelProps = {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onApply: () => void
  onClear: () => void
}

export function FiltersPanel({
  filters,
  onChange,
  onApply,
  onClear,
}: FiltersPanelProps) {
  const municipioOptions =
    filters.mesorregiao === "todas"
      ? municipiosAtingidos
      : municipiosAtingidos.filter(
          (m) => m.mesorregiao === filters.mesorregiao || m.value === "todos"
        )

  function updateField<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    const next = { ...filters, [key]: value }

    if (key === "mesorregiao") {
      next.municipio = "todos"
    }

    onChange(next)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
        <CardDescription>
          Refine a visualização pelos municípios atingidos pelo desastre de
          Mariana no Espírito Santo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LabeledSelect
            id="mesorregiao"
            label="Mesorregião"
            value={filters.mesorregiao}
            options={mesorregioes}
            onValueChange={(value) => updateField("mesorregiao", value)}
          />
          <LabeledSelect
            id="municipio"
            label="Município"
            value={filters.municipio}
            options={municipioOptions}
            onValueChange={(value) => updateField("municipio", value)}
          />
          <LabeledSelect
            id="eixo-tematico"
            label="Eixo temático"
            value={filters.eixoTematico}
            options={eixosTematicos}
            onValueChange={(value) => updateField("eixoTematico", value)}
          />
          <LabeledSelect
            id="status-projeto"
            label="Status do projeto"
            value={filters.statusProjeto}
            options={statusProjetoOptions}
            onValueChange={(value) =>
              updateField("statusProjeto", value as FilterState["statusProjeto"])
            }
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClear}>
            Limpar
          </Button>
          <Button onClick={onApply}>Aplicar</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { defaultFilters }
