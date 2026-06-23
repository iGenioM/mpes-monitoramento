"use client"

import { Button } from "@/components/ui/button"
import { LabeledSelect } from "@/components/ui/labeled-select"
import {
  anexosDisponiveis,
  defaultGestaoFilters,
  gestaoEixosOpcoes,
  gestaoMunicipiosOpcoes,
  gestaoUnidadesOpcoes,
  periodosDisponiveis,
  type GestaoFilterState,
} from "@/lib/data/gestao"

type GestaoFiltersProps = {
  filters: GestaoFilterState
  onChange: (filters: GestaoFilterState) => void
}

export function GestaoFilters({ filters, onChange }: GestaoFiltersProps) {
  function updateField<K extends keyof GestaoFilterState>(
    key: K,
    value: GestaoFilterState[K]
  ) {
    onChange({ ...filters, [key]: value })
  }

  const selectProps = {
    containerClassName: "min-w-[140px] flex-1 space-y-1.5",
    labelClassName: "text-xs text-muted-foreground",
    triggerClassName: "h-9 w-full",
  } as const

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-card p-4">
      <LabeledSelect
        id="filtro-municipio"
        label="Município"
        value={filters.municipio}
        options={gestaoMunicipiosOpcoes}
        onValueChange={(value) => updateField("municipio", value)}
        {...selectProps}
      />
      <LabeledSelect
        id="filtro-eixo"
        label="Eixo temático"
        value={filters.eixoTematico}
        options={gestaoEixosOpcoes}
        onValueChange={(value) => updateField("eixoTematico", value)}
        {...selectProps}
      />
      <LabeledSelect
        id="filtro-unidade"
        label="Unidade gestora"
        value={filters.unidadeGestora}
        options={gestaoUnidadesOpcoes}
        onValueChange={(value) => updateField("unidadeGestora", value)}
        {...selectProps}
      />
      <LabeledSelect
        id="filtro-anexo"
        label="Anexo"
        value={filters.anexo}
        options={anexosDisponiveis}
        onValueChange={(value) => updateField("anexo", value)}
        {...selectProps}
      />
      <LabeledSelect
        id="filtro-periodo"
        label="Período"
        value={filters.periodo}
        options={periodosDisponiveis}
        onValueChange={(value) => updateField("periodo", value)}
        {...selectProps}
      />
      <Button
        variant="outline"
        size="sm"
        className="h-9 shrink-0"
        onClick={() => onChange(defaultGestaoFilters)}
      >
        Limpar filtros
      </Button>
    </div>
  )
}

export { defaultGestaoFilters }
