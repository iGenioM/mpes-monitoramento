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
import { globalKpis } from "@/lib/data/rio-doce"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format"

const metricCards = [
  {
    label: "Imóveis que incidem nos projetos",
    value: formatNumber(globalKpis.imoveis),
  },
  {
    label: "Área total dos imóveis (ha)",
    value: formatNumber(globalKpis.areaImoveisHa),
  },
  {
    label: "Projetos apoiados",
    value: formatNumber(globalKpis.projetosApoiados),
  },
  {
    label: "Espécies utilizadas",
    value: formatNumber(globalKpis.especiesUtilizadas),
  },
]

export function KpiSection() {
  return (
    <section id="indicadores" className="space-y-6">
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
              Meta de investimento realizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={
                (globalKpis.investimentoRealizado / globalKpis.metaInvestimento) * 100
              }
            >
              <div className="flex w-full items-center justify-between gap-2">
                <ProgressLabel>
                  {formatCurrency(globalKpis.investimentoRealizado)}
                </ProgressLabel>
                <span className="ml-auto text-sm text-muted-foreground tabular-nums">
                  {formatPercent(
                    globalKpis.investimentoRealizado,
                    globalKpis.metaInvestimento
                  )}{" "}
                  de {formatCurrency(globalKpis.metaInvestimento)}
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
