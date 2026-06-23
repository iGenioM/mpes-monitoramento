"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  IconChevronDown,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  municipiosFiltro,
  painelAlerts,
  painelKpis,
  projetos,
  statusColors,
  statusLabels,
  tematicasFiltro,
  type Projeto,
  type ProjectStatus,
} from "@/lib/data/painel"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant="outline" className="gap-1.5 font-normal">
      <span className={cn("size-2 rounded-full", statusColors[status])} />
      {statusLabels[status]}
    </Badge>
  )
}

export function PainelDashboard() {
  const [alertStatus, setAlertStatus] = useState<"ativos" | "resolvidos" | "todos">(
    "ativos"
  )
  const [alertSeverity, setAlertSeverity] = useState<"critica" | "alta" | "todas">(
    "todas"
  )
  const [search, setSearch] = useState("")
  const [tableSearch, setTableSearch] = useState("")
  const [municipio, setMunicipio] = useState("Todos")
  const [tematica, setTematica] = useState("Todas")
  const [statusFiltro, setStatusFiltro] = useState("Todos")
  const [page, setPage] = useState(1)
  const [alertsOpen, setAlertsOpen] = useState(false)

  const filteredAlerts = useMemo(() => {
    return painelAlerts.filter((alert) => {
      if (alertStatus === "ativos" && alert.status !== "ativo") return false
      if (alertStatus === "resolvidos" && alert.status !== "resolvido") return false
      if (alertSeverity !== "todas" && alert.severidade !== alertSeverity) {
        return false
      }
      return true
    })
  }, [alertStatus, alertSeverity])

  const filteredProjetos = useMemo(() => {
    const query = (search || tableSearch).trim().toLowerCase()

    return projetos.filter((projeto) => {
      if (municipio !== "Todos" && projeto.municipio !== municipio) return false
      if (tematica !== "Todas" && projeto.tematica !== tematica) return false
      if (statusFiltro !== "Todos" && statusLabels[projeto.status] !== statusFiltro) {
        return false
      }

      if (!query) return true

      return [
        projeto.nome,
        projeto.instituicao,
        projeto.contrato,
        projeto.municipio,
        projeto.responsavel,
        projeto.tematica,
      ].some((field) => field.toLowerCase().includes(query))
    })
  }, [search, tableSearch, municipio, tematica, statusFiltro])

  const totalPages = Math.max(1, Math.ceil(filteredProjetos.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedProjetos = filteredProjetos.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const startItem = filteredProjetos.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const endItem = Math.min(currentPage * PAGE_SIZE, filteredProjetos.length)

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      <Collapsible open={alertsOpen} onOpenChange={setAlertsOpen}>
        <section className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50/80 dark:border-amber-900/60 dark:bg-amber-950/20">
          <CollapsibleTrigger
            render={
              <button
                type="button"
                className="w-full px-4 py-3 text-left outline-none transition-colors hover:bg-amber-100/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset dark:hover:bg-amber-950/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
                      AVISO! Você possui 3 novos alertas de risco ou inconformidade.
                    </p>
                    <p className="text-sm text-amber-900/75 dark:text-amber-200/75">
                      {alertsOpen
                        ? "Ocultar alertas pendentes de resolução na região do Rio Doce."
                        : "Clique para visualizar os alertas pendentes de resolução na região do Rio Doce."}
                    </p>
                  </div>
                  <IconChevronDown
                    className={cn(
                      "mt-0.5 size-4 shrink-0 text-amber-800 transition-transform dark:text-amber-200",
                      alertsOpen && "rotate-180"
                    )}
                  />
                </div>
              </button>
            }
          />

          <CollapsibleContent className="border-t border-amber-200/80 bg-amber-50/40 px-4 py-4 dark:border-amber-900/50 dark:bg-amber-950/10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-amber-200/70 bg-background/70 p-3 dark:border-amber-900/40 dark:bg-background/40">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Status</p>
                  <ToggleGroup
                    value={[alertStatus]}
                    onValueChange={(values) => {
                      const next = values[0]
                      if (next) setAlertStatus(next as typeof alertStatus)
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <ToggleGroupItem value="ativos">Ativos</ToggleGroupItem>
                    <ToggleGroupItem value="resolvidos">Resolvidos</ToggleGroupItem>
                    <ToggleGroupItem value="todos">Todos</ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Severidade</p>
                  <ToggleGroup
                    value={[alertSeverity]}
                    onValueChange={(values) => {
                      const next = values[0]
                      if (next) setAlertSeverity(next as typeof alertSeverity)
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <ToggleGroupItem value="critica">Crítica</ToggleGroupItem>
                    <ToggleGroupItem value="alta">Alta</ToggleGroupItem>
                    <ToggleGroupItem value="todas">Todas</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {filteredAlerts.length === 0 ? (
                  <div className="col-span-full rounded-lg border border-dashed bg-background/60 px-4 py-8 text-center text-sm text-muted-foreground">
                    Nenhum alerta encontrado para os filtros selecionados.
                  </div>
                ) : (
                  filteredAlerts.map((alert) => (
                    <Card key={alert.id} size="sm" className="bg-background">
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-sm">{alert.titulo}</CardTitle>
                          <Badge variant="secondary">{alert.categoria}</Badge>
                          <Badge
                            variant="outline"
                            className={cn(
                              alert.severidade === "critica" &&
                                "border-red-200 bg-red-50 text-red-700",
                              alert.severidade === "alta" &&
                                "border-amber-200 bg-amber-50 text-amber-800"
                            )}
                          >
                            {alert.severidade === "critica" ? "Crítica" : "Alta"}
                          </Badge>
                        </div>
                        <CardDescription>{alert.descricao}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between gap-2 border-t bg-muted/20 pt-3">
                        <div className="text-xs text-muted-foreground">
                          <p>Contrato: {alert.contrato}</p>
                          <p>Criado em {alert.criadoEm}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Resolver
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </CollapsibleContent>
        </section>
      </Collapsible>

      <section className="flex flex-col gap-6 border-t pt-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard label="Total de contratos" value={String(painelKpis.totalContratos)} />
        <MetricCard
          label="Municípios contemplados"
          value={String(painelKpis.municipiosContemplados)}
        />
        <MetricCard
          label="Projetos em andamento"
          value={String(painelKpis.projetosEmAndamento)}
        />
        <MetricCard
          label="Projetos com prazo vencido"
          value={String(painelKpis.projetosPrazoVencido)}
        />
        <MetricCard
          label="Investimento total"
          value={formatCurrency(painelKpis.investimentoTotal)}
        />
        <MetricCard
          label="Índices de performance"
          value={`CPI ${painelKpis.indiceCustos.toFixed(2).replace(".", ",")} · SPI ${painelKpis.indicePrazos.toFixed(2).replace(".", ",")}`}
        />
      </div>

      <div className="relative">
        <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Digite o nº do contrato, nome do projeto, município, responsável técnico ou instituição"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            setPage(1)
          }}
        />
      </div>

      <Card size="sm">
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <FilterSelect
            id="municipio"
            label="Município"
            value={municipio}
            options={municipiosFiltro}
            onChange={(value) => {
              setMunicipio(value)
              setPage(1)
            }}
          />
          <FilterSelect
            id="tematica"
            label="Temática"
            value={tematica}
            options={tematicasFiltro}
            onChange={(value) => {
              setTematica(value)
              setPage(1)
            }}
          />
          <FilterSelect
            id="status"
            label="Status"
            value={statusFiltro}
            options={["Todos", ...Object.values(statusLabels)]}
            onChange={(value) => {
              setStatusFiltro(value)
              setPage(1)
            }}
          />
          
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          Notificar Responsável Técnico
        </Button>
        <Button variant="outline" size="sm">
          <IconFileTypePdf className="size-4" />
          Gerar Relatório (PDF)
        </Button>
        <Button variant="outline" size="sm">
          <IconTableExport className="size-4" />
          Exportar Tabela
        </Button>
      </div>

      <Card>
        <CardHeader className="gap-4 border-b">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-base">Tabela de projetos</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px] flex-1 lg:max-w-xs">
                <IconSearch className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-8 pl-8"
                  placeholder="Buscar na tabela"
                  value={tableSearch}
                  onChange={(event) => {
                    setTableSearch(event.target.value)
                    setPage(1)
                  }}
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
          <ProjectsTable projetos={paginatedProjetos} />
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {startItem} – {endItem} de {filteredProjetos.length} itens
          </p>

          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text="Anterior"
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((prev) => Math.max(1, prev - 1))
                  }}
                />
              </PaginationItem>
              {[1, 2, 3].map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === pageNumber}
                    onClick={(event) => {
                      event.preventDefault()
                      setPage(pageNumber)
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text="Próximo"
                  onClick={(event) => {
                    event.preventDefault()
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
      </section>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
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

function FilterSelect({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(next) => next && onChange(next)}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ProjectsTable({ projetos: rows }: { projetos: Projeto[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do projeto</TableHead>
          <TableHead>Instituição responsável</TableHead>
          <TableHead>Temática</TableHead>
          <TableHead>Contrato</TableHead>
          <TableHead>Município</TableHead>
          <TableHead>Investimento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
              Nenhum projeto encontrado para os filtros selecionados.
            </TableCell>
          </TableRow>
        ) : (
          rows.map((projeto) => (
            <TableRow key={projeto.id}>
              <TableCell className="max-w-[200px] truncate font-medium">
                {projeto.nome}
              </TableCell>
              <TableCell>{projeto.instituicao}</TableCell>
              <TableCell>{projeto.tematica}</TableCell>
              <TableCell>{projeto.contrato}</TableCell>
              <TableCell>{projeto.municipio}</TableCell>
              <TableCell>{formatCurrency(projeto.investimento)}</TableCell>
              <TableCell>
                <StatusBadge status={projeto.status} />
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
                    <DropdownMenuItem>Editar projeto</DropdownMenuItem>
                    <DropdownMenuItem>Notificar responsável</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
