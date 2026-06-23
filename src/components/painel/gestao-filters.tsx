"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

function FilterSelect({
  id,
  label,
  value,
  options,
  onValueChange,
}: {
  id: string
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onValueChange: (value: string) => void
}) {
  return (
    <div className="min-w-[140px] flex-1 space-y-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={(next) => next && onValueChange(next)}>
        <SelectTrigger id={id} className="h-9 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function GestaoFilters({ filters, onChange }: GestaoFiltersProps) {
  function updateField<K extends keyof GestaoFilterState>(
    key: K,
    value: GestaoFilterState[K]
  ) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border bg-card p-4">
      <FilterSelect
        id="filtro-municipio"
        label="Município"
        value={filters.municipio}
        options={gestaoMunicipiosOpcoes}
        onValueChange={(value) => updateField("municipio", value)}
      />
      <FilterSelect
        id="filtro-eixo"
        label="Eixo temático"
        value={filters.eixoTematico}
        options={gestaoEixosOpcoes}
        onValueChange={(value) => updateField("eixoTematico", value)}
      />
      <FilterSelect
        id="filtro-unidade"
        label="Unidade gestora"
        value={filters.unidadeGestora}
        options={gestaoUnidadesOpcoes}
        onValueChange={(value) => updateField("unidadeGestora", value)}
      />
      <FilterSelect
        id="filtro-anexo"
        label="Anexo"
        value={filters.anexo}
        options={anexosDisponiveis}
        onValueChange={(value) => updateField("anexo", value)}
      />
      <FilterSelect
        id="filtro-periodo"
        label="Período"
        value={filters.periodo}
        options={periodosDisponiveis}
        onValueChange={(value) => updateField("periodo", value)}
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
