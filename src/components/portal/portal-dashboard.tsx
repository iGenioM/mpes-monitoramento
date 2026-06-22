"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

import { defaultFilters, FiltersPanel } from "@/components/portal/filters-panel"
import { KpiSection } from "@/components/portal/kpi-section"
import { RegionalStats } from "@/components/portal/regional-stats"
import { type FilterState } from "@/lib/data/rio-doce"

const RegionalMap = dynamic(
  () =>
    import("@/components/portal/regional-map").then((mod) => mod.RegionalMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] items-center justify-center rounded-xl border text-sm text-muted-foreground">
        Carregando mapa regional...
      </div>
    ),
  }
)

const ThematicMap = dynamic(
  () =>
    import("@/components/portal/thematic-map").then((mod) => mod.ThematicMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[560px] items-center justify-center rounded-xl border text-sm text-muted-foreground">
        Carregando mapa temático...
      </div>
    ),
  }
)

export function PortalDashboard() {
  const [draftFilters, setDraftFilters] = useState<FilterState>(defaultFilters)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(defaultFilters)
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<string | null>(
    null
  )

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Portal da Transparência — Recuperação do Rio Doce
        </h1>
        <p className="max-w-3xl text-muted-foreground">
          Acompanhe indicadores, investimentos e ações de recuperação ambiental e
          socioeconômica nos municípios do Espírito Santo atingidos pelo desastre
          de Mariana. Utilize os filtros e explore os mapas interativos para
          detalhar a situação por região.
        </p>
      </section>

      <FiltersPanel
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={() => setAppliedFilters(draftFilters)}
        onClear={() => {
          setDraftFilters(defaultFilters)
          setAppliedFilters(defaultFilters)
          setSelectedMunicipalityId(null)
        }}
      />

      <KpiSection />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <RegionalMap
          filters={appliedFilters}
          selectedMunicipalityId={selectedMunicipalityId}
          onSelectMunicipality={setSelectedMunicipalityId}
        />
        <RegionalStats
          filters={appliedFilters}
          selectedMunicipalityId={selectedMunicipalityId}
        />
      </section>

      <ThematicMap />
    </div>
  )
}
