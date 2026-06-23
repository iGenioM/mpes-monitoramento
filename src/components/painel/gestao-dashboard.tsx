"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconFileTypePdf,
  IconFilter,
  IconSearch,
  IconTableExport,
} from "@tabler/icons-react"

import { FundBalanceBar } from "@/components/shared/fund-balance-bar"
import { defaultGestaoFilters, GestaoFilters } from "@/components/painel/gestao-filters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LabeledSelect } from "@/components/ui/labeled-select"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  gestaoStatusFiltro,
  type GestaoFilterState,
} from "@/lib/data/gestao"
import { buildGestaoFilteredView } from "@/lib/data/gestao-filter-logic"
import { statusColors, statusLabels } from "@/lib/data/painel"
import {
  formatChartCurrency,
  formatCurrency,
  formatCurrencyBillions,
  formatNumber,
} from "@/lib/format"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10

const GestaoTematicoMap = dynamic(
  () =>
    import("@/components/painel/gestao-tematico-map").then(
      (mod) => mod.GestaoTematicoMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[280px] items-center justify-center rounded-lg border bg-muted/30 text-sm text-muted-foreground">
        Carregando mapa...
      </div>
    ),
  }
)

const GestaoMap = dynamic(
  () => import("@/components/painel/gestao-map").then((mod) => mod.GestaoMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center rounded-lg border bg-muted/30 text-sm text-muted-foreground">
        Carregando mapa...
      </div>
    ),
  }
)

const municipioChartConfig = {
  valor: { label: "Valor (R$ mi)", color: "var(--chart-1)" },
  quantidade: { label: "Projetos", color: "var(--chart-2)" },
} satisfies ChartConfig

const evolucaoChartConfig = {
  previsto: { label: "Previsto", color: "var(--chart-1)" },
  executado: { label: "Executado", color: "var(--chart-4)" },
} satisfies ChartConfig

const anexoBarConfig = {
  quantidade: { label: "Projetos", color: "var(--chart-2)" },
} satisfies ChartConfig

const tipoBarConfig = {
  valor: { label: "Investimento (R$ mi)", color: "var(--chart-3)" },
} satisfies ChartConfig

const eixoChartConfig = {
  contratado: { label: "Contratado (R$ mi)", color: "#94a3b8" },
  executado: { label: "Executado (R$ mi)", color: "var(--chart-1)" },
} satisfies ChartConfig

export function GestaoDashboard() {
  const [gestaoFilters, setGestaoFilters] =
    useState<GestaoFilterState>(defaultGestaoFilters)
  const [municipioModoValor, setMunicipioModoValor] = useState(true)
  const [isEvolucaoAnual, setIsEvolucaoAnual] = useState(false)
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("todos")
  const [page, setPage] = useState(1)

  const viewData = useMemo(
    () => buildGestaoFilteredView(gestaoFilters),
    [gestaoFilters]
  )

  const saldoDisponivel =
    viewData.kpis.envelopeTotal - viewData.kpis.investimentoExecutado
  const indiceExecucao =
    (viewData.kpis.investimentoExecutado / viewData.kpis.investimentoPrevisto) * 100

  const municipioData = useMemo(
    () =>
      viewData.investimentoPorMunicipio.map((item) => ({
        municipio: item.municipio,
        valor: item.valor,
        quantidade: item.quantidade,
      })),
    [viewData.investimentoPorMunicipio]
  )

  const evolucaoData = useMemo(
    () =>
      isEvolucaoAnual
        ? viewData.evolucaoAnual.map(({ ano, previsto, executado }) => ({
            periodo: ano,
            previsto,
            executado,
          }))
        : viewData.evolucaoMensal.map(({ mes, previsto, executado }) => ({
            periodo: mes,
            previsto,
            executado,
          })),
    [isEvolucaoAnual, viewData.evolucaoAnual, viewData.evolucaoMensal]
  )

  const filteredProjetos = useMemo(() => {
    const query = search.trim().toLowerCase()
    return viewData.projetos.filter((projeto) => {
      if (statusFilter !== "todos" && projeto.status !== statusFilter) return false
      if (!query) return true
      return [projeto.nome, projeto.contrato, projeto.municipio, projeto.instituicao]
        .join(" ")
        .toLowerCase()
        .includes(query)
    })
  }, [search, statusFilter, viewData.projetos])

  function handleGestaoFiltersChange(next: GestaoFilterState) {
    setGestaoFilters(next)
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(filteredProjetos.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedProjetos = filteredProjetos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )
  const rangeStart =
    filteredProjetos.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredProjetos.length)

  function resetPage() {
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <GestaoFilters filters={gestaoFilters} onChange={handleGestaoFiltersChange} />

      <FundBalanceBar
        envelopeTotal={viewData.kpis.envelopeTotal}
        totalContratado={viewData.kpis.investimentoPrevisto}
        investimentoExecutado={viewData.kpis.investimentoExecutado}
        title="Saldo disponível do fundo — Gestão"
        description="Envelope TTAC destinado ao Espírito Santo"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total de projetos"
          value={formatNumber(viewData.kpis.totalProjetos)}
        />
        <KpiCard
          label="Projetos em execução"
          value={formatNumber(viewData.kpis.projetosEmExecucao)}
        />
        <KpiCard
          label="Número de beneficiários"
          value={formatNumber(viewData.kpis.beneficiarios)}
        />
        <KpiCard
          label="Área total cadastrada"
          value={`${formatNumber(viewData.kpis.areaCadastradaHa)} ha`}
        />
        <KpiCard
          label="Investimento executado"
          value={formatCurrencyBillions(viewData.kpis.investimentoExecutado)}
        />
        <KpiCard
          label="Investimento previsto"
          value={formatCurrencyBillions(viewData.kpis.investimentoPrevisto)}
        />
        <KpiCard
          label="Saldo disponível"
          value={formatCurrencyBillions(saldoDisponivel)}
        />
        <KpiCard
          label="Índice de execução"
          value={`${indiceExecucao.toFixed(1)}%`}
        />
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base">
                Valor investido por município (R$ mi)
              </CardTitle>
              <CardDescription>Região do Rio Doce — Espírito Santo</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Label htmlFor="modo-municipio" className="text-muted-foreground">
                Qtd. projetos
              </Label>
              <Switch
                id="modo-municipio"
                checked={municipioModoValor}
                onCheckedChange={setMunicipioModoValor}
              />
              <Label htmlFor="modo-municipio" className="text-muted-foreground">
                Valor
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={municipioChartConfig} className="aspect-[16/10] w-full">
              <BarChart data={municipioData} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="municipio" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  tickFormatter={(v) => `${v} mi`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        municipioModoValor
                          ? formatChartCurrency(Number(value), "mi")
                          : `${value} projetos`
                      }
                    />
                  }
                />
                <Bar
                  dataKey={municipioModoValor ? "valor" : "quantidade"}
                  fill={`var(--color-${municipioModoValor ? "valor" : "quantidade"})`}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Mapa temático — Espírito Santo</CardTitle>
            <CardDescription>
              Municípios coloridos por faixa do tema selecionado
            </CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[420px] flex-1 flex-col">
            <GestaoTematicoMap className="flex-1" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Execução por eixo temático (R$ mi)</CardTitle>
          <CardDescription>
            Valor contratado vs. executado por eixo do TTAC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={eixoChartConfig} className="aspect-[16/9] w-full">
            <BarChart
              data={viewData.execucaoPorEixo}
              layout="vertical"
              margin={{ left: 8, right: 48 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v} mi`}
              />
              <YAxis
                type="category"
                dataKey="eixo"
                tickLine={false}
                axisLine={false}
                width={130}
                fontSize={11}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      formatChartCurrency(Number(value), "mi"),
                      name === "contratado" ? "Contratado" : "Executado",
                    ]}
                  />
                }
              />
              <Bar
                dataKey="contratado"
                fill="var(--color-contratado)"
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
              <Bar
                dataKey="executado"
                fill="var(--color-executado)"
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
            </BarChart>
          </ChartContainer>
          <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
            {viewData.execucaoPorEixo.map((item) => (
              <li key={item.eixo} className="flex justify-between gap-4">
                <span>{item.eixo}</span>
                <span className="tabular-nums font-medium text-foreground">
                  {item.percentual}% executado
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">
              Evolução temporal dos valores investidos
            </CardTitle>
            <CardDescription>
              Previsto vs. executado ({isEvolucaoAnual ? "R$ bi" : "R$ mi"})
            </CardDescription>
          </div>
          <ToggleGroup
            value={[isEvolucaoAnual ? "anual" : "mensal"]}
            onValueChange={(values) => {
              const next = values[0]
              if (next) setIsEvolucaoAnual(next === "anual")
            }}
            variant="outline"
            size="sm"
          >
            <ToggleGroupItem value="mensal">Mensal</ToggleGroupItem>
            <ToggleGroupItem value="anual">Anual</ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent>
          <ChartContainer config={evolucaoChartConfig} className="aspect-[21/9] w-full">
            <LineChart data={evolucaoData} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="periodo" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (isEvolucaoAnual ? `${v} bi` : `${v} mi`)}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      formatChartCurrency(
                        Number(value),
                        isEvolucaoAnual ? "bi" : "mi"
                      )
                    }
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="previsto"
                stroke="var(--color-previsto)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="executado"
                stroke="var(--color-executado)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quantidade de projetos por anexo</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={anexoBarConfig} className="aspect-[16/10] w-full">
              <BarChart data={viewData.projetosPorAnexo} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="anexo" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quantidade" fill="var(--color-quantidade)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Investimento por tipo de projeto (R$ mi)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={tipoBarConfig} className="aspect-[16/10] w-full">
              <BarChart data={viewData.investimentoPorTipo} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="tipo" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v} mi`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatChartCurrency(Number(value), "mi")}
                    />
                  }
                />
                <Bar dataKey="valor" fill="var(--color-valor)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribuição de projetos por anexo</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChartWithLegend data={viewData.distribuicaoAnexo} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribuição por tipologia de projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChartWithLegend data={viewData.distribuicaoTipologia} legendScrollable />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Unidades gestoras</CardTitle>
          <CardDescription>
            Execução financeira por instituição responsável
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Projetos</TableHead>
                <TableHead className="text-right">Previsto (R$ mi)</TableHead>
                <TableHead className="text-right">Executado (R$ mi)</TableHead>
                <TableHead>% Execução</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {viewData.unidadesGestoras.map((ug) => (
                <TableRow key={ug.nome}>
                  <TableCell className="font-medium">{ug.nome}</TableCell>
                  <TableCell className="text-right tabular-nums">{ug.projetos}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatNumber(ug.investimentoPrevisto)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatNumber(ug.investimentoExecutado)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${ug.percentualExecucao}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm tabular-nums">
                        {ug.percentualExecucao}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mapa interativo de projetos</CardTitle>
          <CardDescription>
            Localização dos projetos na bacia do Rio Doce — Espírito Santo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GestaoMap />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-4 border-b">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-base">Tabela de projetos</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px] flex-1 lg:max-w-sm">
                <IconSearch className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-8 pl-8"
                  placeholder="Busque por contrato, projeto ou município"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value)
                    resetPage()
                  }}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <IconFilter className="size-4" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              <LabeledSelect
                label="Status"
                value={statusFilter}
                options={gestaoStatusFiltro}
                onValueChange={(v) => {
                  setStatusFilter(v)
                  resetPage()
                }}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do projeto</TableHead>
                <TableHead>Instituição</TableHead>
                <TableHead>Tipologia</TableHead>
                <TableHead>Contrato</TableHead>
                <TableHead>Município</TableHead>
                <TableHead>Investimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProjetos.map((projeto) => (
                <TableRow key={projeto.id}>
                  <TableCell className="max-w-[180px] truncate font-medium">
                    {projeto.nome}
                  </TableCell>
                  <TableCell>{projeto.instituicao}</TableCell>
                  <TableCell>{projeto.tipologia}</TableCell>
                  <TableCell>{projeto.contrato}</TableCell>
                  <TableCell>{projeto.municipio}</TableCell>
                  <TableCell>{formatCurrency(projeto.investimento)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1.5 font-normal">
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          statusColors[projeto.status]
                        )}
                      />
                      {statusLabels[projeto.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-xs" aria-label="Ações">
                            <IconDots className="size-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          render={
                            <Link href={`/painel/projetos/${projeto.id}`}>
                              Ver detalhes
                            </Link>
                          }
                        />
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {rangeStart} – {rangeEnd} de {filteredProjetos.length} itens
            </p>
            <div className="flex gap-1">
              <Button
                size="icon-sm"
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Página anterior"
              >
                <IconChevronLeft className="size-4" />
              </Button>
              <Button
                size="icon-sm"
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Próxima página"
              >
                <IconChevronRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm">
              <IconTableExport className="size-4" />
              Exportar para CSV
            </Button>
            <Button size="sm" variant="outline">
              <IconFileTypePdf className="size-4" />
              Exportar para PDF
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function DonutChartWithLegend({
  data,
  legendScrollable = false,
}: {
  data: Array<{
    id: string
    nome: string
    valor: number
    percentual: string
    fill: string
  }>
  legendScrollable?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <ul
        className={cn(
          "w-full space-y-2.5 text-sm sm:max-w-[52%]",
          legendScrollable && "max-h-56 overflow-y-auto pr-2"
        )}
      >
        {data.map((item) => (
          <li key={item.id} className="flex items-start gap-2.5">
            <span
              className="mt-1 size-3 shrink-0 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="leading-snug">
              <span className="font-medium">{item.nome}</span>{" "}
              <span className="text-muted-foreground">({item.percentual}%)</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mx-auto aspect-square w-full max-w-[220px] shrink-0">
        <PieChart width={220} height={220}>
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const item = payload[0]?.payload as (typeof data)[number]
              return (
                <div className="rounded-md border bg-background px-3 py-2 text-xs shadow-sm">
                  <p className="font-medium">{item.nome}</p>
                  <p className="text-muted-foreground">{item.percentual}%</p>
                </div>
              )
            }}
          />
          <Pie
            data={data}
            dataKey="valor"
            nameKey="nome"
            innerRadius={58}
            outerRadius={88}
            strokeWidth={2}
            stroke="#ffffff"
          >
            {data.map((entry) => (
              <Cell key={entry.id} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  )
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm">
      <CardHeader className="pb-1">
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  )
}
