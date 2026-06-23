import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Progress,
  ProgressLabel,
} from "@/components/ui/progress"
import { FundBalanceBar } from "@/components/shared/fund-balance-bar"
import {
  getMunicipiosContempladosCount,
  getTotalFamiliasAtendidas,
  globalKpis,
} from "@/lib/data/rio-doce"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format"

const metricCards = [
  {
    label: "Famílias/pessoas beneficiadas",
    value: formatNumber(getTotalFamiliasAtendidas()),
  },
  {
    label: "Municípios contemplados",
    value: formatNumber(getMunicipiosContempladosCount()),
  },
  {
    label: "Projetos ativos",
    value: formatNumber(globalKpis.projetosAtivos),
  },
  {
    label: "Projetos concluídos",
    value: formatNumber(globalKpis.projetosConcluidos),
  },
]

export function KpiSection() {
  return (
    <section id="indicadores" className="space-y-6">
      <FundBalanceBar
        envelopeTotal={globalKpis.envelopeTotalES}
        totalContratado={globalKpis.totalContratado}
        investimentoExecutado={globalKpis.investimentoRealizado}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Meta de área (ha) a recuperar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(globalKpis.areaRecuperadaHa / globalKpis.metaAreaHa) * 100}>
              <div className="flex w-full items-center justify-between gap-2">
                <ProgressLabel>
                  {formatNumber(globalKpis.areaRecuperadaHa)} ha recuperados
                </ProgressLabel>
                <span className="ml-auto text-sm text-muted-foreground tabular-nums">
                  {formatPercent(globalKpis.areaRecuperadaHa, globalKpis.metaAreaHa)} de{" "}
                  {formatNumber(globalKpis.metaAreaHa)} ha
                </span>
              </div>
            </Progress>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Execução financeira contratada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={
                (globalKpis.investimentoRealizado / globalKpis.totalContratado) * 100
              }
            >
              <div className="flex w-full items-center justify-between gap-2">
                <ProgressLabel>
                  {formatCurrency(globalKpis.investimentoRealizado)}
                </ProgressLabel>
                <span className="ml-auto text-sm text-muted-foreground tabular-nums">
                  {formatPercent(
                    globalKpis.investimentoRealizado,
                    globalKpis.totalContratado
                  )}{" "}
                  de {formatCurrency(globalKpis.totalContratado)}
                </span>
              </div>
            </Progress>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => (
          <Card key={card.label} size="sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
