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
  IconDots,
  IconFileTypePdf,
  IconFilter,
  IconSearch,
  IconTableExport,
} from "@tabler/icons-react"

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
  distribuicaoAnexo,
  distribuicaoTipologia,
  evolucaoAnual as evolucaoAnualData,
  evolucaoMensal,
  gestaoKpis,
  gestaoProjetos,
  investimentoPorMunicipio,
  investimentoPorTipo,
  projetosPorAnexo,
} from "@/lib/data/gestao"
import { statusColors, statusLabels } from "@/lib/data/painel"
import { formatCurrency, formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"

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
  valor: { label: "Valor (mi)", color: "var(--chart-1)" },
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
  valor: { label: "Investimento (mi)", color: "var(--chart-3)" },
} satisfies ChartConfig

export function GestaoDashboard() {
  const [municipioModoValor, setMunicipioModoValor] = useState(true)
  const [isEvolucaoAnual, setIsEvolucaoAnual] = useState(false)
  const [search, setSearch] = useState("")

  const municipioData = useMemo(
    () =>
      investimentoPorMunicipio.map((item) => ({
        municipio: item.municipio,
        valor: item.valor,
        quantidade: item.quantidade,
      })),
    []
  )

  const evolucaoData = useMemo(
    () =>
      isEvolucaoAnual
        ? evolucaoAnualData.map(({ ano, previsto, executado }) => ({
            periodo: ano,
            previsto,
            executado,
          }))
        : evolucaoMensal.map(({ mes, previsto, executado }) => ({
            periodo: mes,
            previsto,
            executado,
          })),
    [isEvolucaoAnual]
  )

  const filteredProjetos = gestaoProjetos.filter((projeto) => {
    const query = search.trim().toLowerCase()
    if (!query) return true
    return [projeto.nome, projeto.contrato, projeto.municipio, projeto.instituicao]
      .join(" ")
      .toLowerCase()
      .includes(query)
  })

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard label="Total de projetos" value={formatNumber(gestaoKpis.totalProjetos)} />
        <KpiCard
          label="Projetos em execução"
          value={formatNumber(gestaoKpis.projetosEmExecucao)}
        />
        <KpiCard
          label="Número de beneficiários"
          value={formatNumber(gestaoKpis.beneficiarios)}
        />
        <KpiCard
          label="Área total cadastrada"
          value={`${formatNumber(gestaoKpis.areaCadastradaHa)} ha`}
        />
        <KpiCard
          label="Investimento executado"
          value={formatCurrency(gestaoKpis.investimentoExecutado)}
        />
        <KpiCard
          label="Investimento previsto"
          value={formatCurrency(gestaoKpis.investimentoPrevisto)}
        />
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base">
                Valor investido por município (milhões R$)
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
                <YAxis tickLine={false} axisLine={false} fontSize={11} />
                <ChartTooltip content={<ChartTooltipContent />} />
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
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">
              Evolução temporal dos valores investidos
            </CardTitle>
            <CardDescription>Previsto vs. executado (milhões R$)</CardDescription>
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
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
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
              <BarChart data={projetosPorAnexo} margin={{ left: 8, right: 8 }}>
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
              Investimento por tipo de projeto (milhões R$)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={tipoBarConfig} className="aspect-[16/10] w-full">
              <BarChart data={investimentoPorTipo} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="tipo" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
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
            <DonutChartWithLegend data={distribuicaoAnexo} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribuição por tipologia de projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChartWithLegend data={distribuicaoTipologia} legendScrollable />
          </CardContent>
        </Card>
      </div>

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
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <IconFilter className="size-4" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                Exportar
              </Button>
            </div>
          </div>
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
              {filteredProjetos.map((projeto) => (
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
          <p className="text-sm text-muted-foreground">
            1 – {filteredProjetos.length} de {gestaoProjetos.length} itens
          </p>
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
