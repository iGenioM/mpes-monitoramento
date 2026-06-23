import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  formatCurrency,
  formatCurrencyBillions,
  formatPercent,
} from "@/lib/format"

type FundBalanceBarProps = {
  envelopeTotal: number
  totalContratado: number
  investimentoExecutado: number
  title?: string
  description?: string
}

export function FundBalanceBar({
  envelopeTotal,
  totalContratado,
  investimentoExecutado,
  title = "Saldo disponível do fundo",
  description = "Distribuição do envelope total do TTAC — Espírito Santo",
}: FundBalanceBarProps) {
  const saldoDisponivel = envelopeTotal - totalContratado
  const contratadoNaoExecutado = totalContratado - investimentoExecutado

  const pctExecutado = (investimentoExecutado / envelopeTotal) * 100
  const pctContratado = (contratadoNaoExecutado / envelopeTotal) * 100
  const pctSaldo = (saldoDisponivel / envelopeTotal) * 100

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="bg-blue-600 transition-all"
            style={{ width: `${pctExecutado}%` }}
            title={`Executado: ${formatCurrency(investimentoExecutado)}`}
          />
          <div
            className="bg-emerald-500 transition-all"
            style={{ width: `${pctContratado}%` }}
            title={`Contratado (não executado): ${formatCurrency(contratadoNaoExecutado)}`}
          />
          <div
            className="bg-slate-300 transition-all"
            style={{ width: `${pctSaldo}%` }}
            title={`Saldo disponível: ${formatCurrency(saldoDisponivel)}`}
          />
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-3">
          <div className="flex items-start gap-2">
            <span className="mt-1 size-3 shrink-0 rounded-full bg-blue-600" />
            <div>
              <p className="font-medium">Executado</p>
              <p className="text-muted-foreground tabular-nums">
                {formatCurrencyBillions(investimentoExecutado)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatPercent(investimentoExecutado, envelopeTotal)} do envelope
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1 size-3 shrink-0 rounded-full bg-emerald-500" />
            <div>
              <p className="font-medium">Contratado</p>
              <p className="text-muted-foreground tabular-nums">
                {formatCurrencyBillions(totalContratado)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatPercent(totalContratado, envelopeTotal)} do envelope
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1 size-3 shrink-0 rounded-full bg-slate-300" />
            <div>
              <p className="font-medium">Saldo disponível</p>
              <p className="text-muted-foreground tabular-nums">
                {formatCurrencyBillions(saldoDisponivel)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatPercent(saldoDisponivel, envelopeTotal)} do envelope
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
