export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return "0%"
  return `${Math.round((value / total) * 100)}%`
}

export function formatCurrencyMillions(value: number): string {
  const millions = value >= 1_000_000 ? value / 1_000_000 : value
  return `R$ ${formatNumber(Math.round(millions * 10) / 10)} mi`
}

export function formatCurrencyBillions(value: number): string {
  const billions = value / 1_000_000_000
  return `R$ ${billions.toFixed(2).replace(".", ",")} bi`
}

export function formatChartCurrency(value: number, unit: "mi" | "bi" = "mi"): string {
  if (unit === "bi") {
    return `R$ ${value.toFixed(2).replace(".", ",")} bi`
  }
  return `R$ ${formatNumber(value)} mi`
}
