import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getRegionalSummary, type FilterState } from "@/lib/data/rio-doce"
import { formatCurrency, formatNumber } from "@/lib/format"

type RegionalStatsProps = {
  filters: FilterState
  selectedMunicipalityId: string | null
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm" className="h-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-normal text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium leading-snug">{value}</p>
      </CardContent>
    </Card>
  )
}

export function RegionalStats({ filters, selectedMunicipalityId }: RegionalStatsProps) {
  const summary = getRegionalSummary(filters, selectedMunicipalityId)

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <StatItem label="Região selecionada" value={summary.regiao} />
      <StatItem label="Status" value={summary.status} />
      <StatItem
        label="Total investido"
        value={formatCurrency(summary.investimentoTotal)}
      />
      <StatItem
        label="Investimentos planejados"
        value={formatCurrency(summary.investimentoPlanejado)}
      />
      <StatItem
        label="Famílias atendidas"
        value={formatNumber(summary.familiasAtendidas)}
      />
      <StatItem label="Nº de projetos" value={formatNumber(summary.projetos)} />
      <StatItem
        label="Nº de municípios"
        value={formatNumber(summary.municipios)}
      />
      <StatItem
        label="Unidades de Conservação"
        value={formatNumber(summary.ucs)}
      />
      <StatItem
        label="Terras Indígenas"
        value={
          summary.terrasIndigenas > 0
            ? formatNumber(summary.terrasIndigenas)
            : "—"
        }
      />
      <StatItem
        label="Ações em andamento"
        value={summary.acoes.join(" · ") || "—"}
      />
      <StatItem label="Eixos" value={summary.eixos.join(", ") || "—"} />
    </div>
  )
}
