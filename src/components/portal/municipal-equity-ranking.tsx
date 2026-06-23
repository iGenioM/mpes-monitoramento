import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { municipalitiesData } from "@/lib/data/rio-doce"
import { formatCurrencyMillions, formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"

type RankingItem = {
  name: string
  investimentoTotal: number
  familiasAtendidas: number
  perCapita: number
  badge: "above" | "average" | "below"
}

function computeRanking(): RankingItem[] {
  const items = municipalitiesData
    .filter((m) => m.familiasAtendidas > 0)
    .map((m) => ({
      name: m.name,
      investimentoTotal: m.investimentoTotal,
      familiasAtendidas: m.familiasAtendidas,
      perCapita: m.investimentoTotal / m.familiasAtendidas,
      badge: "average" as const,
    }))
    .sort((a, b) => b.perCapita - a.perCapita)

  const media =
    items.reduce((sum, item) => sum + item.perCapita, 0) / items.length

  return items.map((item) => ({
    ...item,
    badge:
      item.perCapita > media * 1.1
        ? "above"
        : item.perCapita < media * 0.9
          ? "below"
          : "average",
  }))
}

const badgeConfig = {
  above: { label: "Acima da média", className: "bg-emerald-100 text-emerald-800" },
  average: { label: "Na média", className: "bg-amber-100 text-amber-800" },
  below: { label: "Abaixo da média", className: "bg-red-100 text-red-800" },
}

export function MunicipalEquityRanking() {
  const ranking = computeRanking()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Equidade municipal</CardTitle>
        <CardDescription>
          Ranking por investimento per capita (investimento total ÷ famílias
          atendidas)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {ranking.map((item, index) => (
            <li
              key={item.name}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrencyMillions(item.investimentoTotal)} ·{" "}
                    {formatNumber(item.familiasAtendidas)} famílias
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium tabular-nums">
                  {formatCurrency(item.perCapita)}
                </span>
                <Badge
                  variant="outline"
                  className={cn("border-0 font-normal", badgeConfig[item.badge].className)}
                >
                  {badgeConfig[item.badge].label}
                </Badge>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
}
