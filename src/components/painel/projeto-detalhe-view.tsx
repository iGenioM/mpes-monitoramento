"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"
import {
  IconArrowLeft,
  IconBell,
  IconDownload,
  IconPaperclip,
  IconRefresh,
} from "@tabler/icons-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
} from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import type { ProjetoDetalhe } from "@/lib/data/projeto-detalhe"
import { formatCurrency, formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"

const NovoProjetoLocationMap = dynamic(
  () =>
    import("@/components/painel/novo-projeto-location-map").then(
      (mod) => mod.NovoProjetoLocationMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center rounded-lg border bg-muted/30 text-sm text-muted-foreground">
        Carregando mapa...
      </div>
    ),
  }
)

function ReadOnlyField({
  label,
  value,
  id,
}: {
  label: string
  value: string
  id?: string
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} value={value} readOnly className="bg-muted/40" />
    </Field>
  )
}

type ProjetoDetalheViewProps = {
  projeto: ProjetoDetalhe
}

export function ProjetoDetalheView({ projeto }: ProjetoDetalheViewProps) {
  const [notificacaoEnviada, setNotificacaoEnviada] = useState(false)
  const [retificacaoSolicitada, setRetificacaoSolicitada] = useState(false)

  function formatCoord(value: number) {
    return value.toFixed(4).replace(".", ",")
  }

  return (
    <div className="space-y-6 bg-muted/30 p-4 sm:p-6">
      <div className="space-y-3">
        <Link
          href="/painel"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "h-8 gap-1.5 px-2"
          )}
        >
          <IconArrowLeft className="size-4" />
          Detalhes do Contrato
        </Link>
      </div>

      {notificacaoEnviada ? (
        <div className="rounded-lg border bg-background px-4 py-3 text-sm">
          Notificação enviada ao responsável técnico (simulação).
        </div>
      ) : null}

      {retificacaoSolicitada ? (
        <div className="rounded-lg border bg-background px-4 py-3 text-sm">
          Solicitação de retificação registrada (simulação).
        </div>
      ) : null}

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Contrato</CardTitle>
            <CardDescription>
              Número do Processo: {projeto.numeroProcesso}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <ReadOnlyField label="Nome do Projeto" value={projeto.nome} id="nome" />
                <ReadOnlyField
                  label="Responsável Técnico"
                  value={projeto.responsavelTecnico}
                  id="responsavel"
                />
                <ReadOnlyField
                  label="Órgão Gestor"
                  value={projeto.orgaoGestor}
                  id="orgao"
                />
                <ReadOnlyField
                  label="Número do Contrato"
                  value={projeto.contrato}
                  id="contrato"
                />
                <ReadOnlyField
                  label="Data de Início"
                  value={projeto.dataInicio}
                  id="data-inicio"
                />
                <ReadOnlyField
                  label="Data de término (Prevista)"
                  value={projeto.dataTerminoPrevista}
                  id="data-termino"
                />
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Projeto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <ReadOnlyField
                label="Pilar ou Eixo do Edital"
                value={projeto.pilarEdital}
                id="pilar"
              />
              <ReadOnlyField
                label="Temática do Projeto"
                value={projeto.tematica}
                id="tematica"
              />
            </div>

            <Field>
              <FieldLabel>Atividades Previstas</FieldLabel>
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Atividades adicionadas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projeto.atividades.map((atividade) => (
                      <TableRow key={atividade}>
                        <TableCell>{atividade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="descricao">Descrição de projeto</FieldLabel>
              <Textarea
                id="descricao"
                value={projeto.descricao}
                readOnly
                rows={4}
                className="bg-muted/40"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Público-Alvo</FieldLabel>
                <ul className="space-y-1.5 rounded-lg border bg-muted/20 px-3 py-2.5 text-sm">
                  {projeto.publicoAlvo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Field>
              <ReadOnlyField
                label="Número de Pessoas contempladas (Estimado)"
                value={formatNumber(projeto.pessoasContempladas)}
                id="pessoas"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Financeiras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <ReadOnlyField
                label="Fonte de Recurso"
                value={projeto.fonteRecurso}
                id="fonte"
              />
              <ReadOnlyField
                label="Valor do Investimento (Total)"
                value={formatCurrency(projeto.valorInvestimento)}
                id="valor"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Progresso Físico</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={projeto.progressoFisico}>
                <ProgressLabel>Execução física</ProgressLabel>
                <ProgressValue>
                  {(value) => `${value ?? projeto.progressoFisico}%`}
                </ProgressValue>
                <ProgressTrack className="h-2.5">
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Progresso Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={projeto.progressoFinanceiro}>
                <ProgressLabel>Execução financeira</ProgressLabel>
                <ProgressValue>
                  {(value) => `${value ?? projeto.progressoFinanceiro}%`}
                </ProgressValue>
                <ProgressTrack className="h-2.5">
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Localização do Projeto</CardTitle>
            <CardDescription>
              Localidade cadastrada do projeto na bacia do Rio Doce.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <ReadOnlyField
                label="Latitude"
                value={formatCoord(projeto.latitude)}
                id="latitude"
              />
              <ReadOnlyField
                label="Longitude"
                value={formatCoord(projeto.longitude)}
                id="longitude"
              />
            </div>

            <NovoProjetoLocationMap
              latitude={projeto.latitude}
              longitude={projeto.longitude}
              readOnly
            />

            <div className="grid gap-4 md:grid-cols-3">
              <ReadOnlyField label="Estado" value={projeto.estado} id="estado" />
              <ReadOnlyField
                label="Município"
                value={projeto.municipio}
                id="municipio"
              />
              <ReadOnlyField
                label="Comunidade/Distrito"
                value={projeto.comunidade}
                id="comunidade"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Anexos</CardTitle>
            <Button type="button" size="sm">
              <IconPaperclip className="size-4" />
              Anexos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projeto.anexos.map((anexo) => (
                <div
                  key={anexo.id}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-muted/20 px-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{anexo.nome}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {anexo.tipo}
                    </p>
                  </div>
                  <Button type="button" variant="ghost" size="icon-xs" aria-label="Baixar">
                    <IconDownload className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
          <Link
            href="/painel"
            className={buttonVariants({ variant: "outline" })}
          >
            Voltar
          </Link>
          <Button
            type="button"
            variant="outline"
            onClick={() => setNotificacaoEnviada(true)}
          >
            <IconBell className="size-4" />
            Enviar Notificação
          </Button>
          <Button type="button" onClick={() => setRetificacaoSolicitada(true)}>
            <IconRefresh className="size-4" />
            Solicitar Retificação
          </Button>
        </div>
      </div>
    </div>
  )
}
