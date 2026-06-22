"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  IconArrowLeft,
  IconCalendar,
  IconCheck,
  IconPlus,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
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
import { Textarea } from "@/components/ui/textarea"
import {
  arquivosExemplo,
  coordenadasPadrao,
  fontesRecurso,
  municipiosCadastro,
  orgaosGestores,
  pilaresEdital,
  processoExemplo,
  publicoAlvoOpcoes,
  tematicasProjeto,
  tiposDocumento,
} from "@/lib/data/novo-projeto"
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

const MAX_DESCRICAO = 500

type ArquivoAnexo = {
  id: string
  nome: string
  tipo: string
}

function formatCoord(value: number, decimals = 4) {
  return value.toFixed(decimals).replace(".", ",")
}

export function NovoProjetoForm() {
  const [submitted, setSubmitted] = useState(false)
  const [draftSaved, setDraftSaved] = useState(false)
  const [descricao, setDescricao] = useState("")
  const [atividadeInput, setAtividadeInput] = useState("")
  const [atividades, setAtividades] = useState<string[]>([
    "Topografia e georreferenciamento",
  ])
  const [publicoAlvo, setPublicoAlvo] = useState<Record<string, boolean>>({
    "Agricultores Familiares": false,
    Quilombolas: false,
    Pescadores: false,
    Garimpeiros: false,
    "Pescadores Artesanais": false,
  })
  const [latitude, setLatitude] = useState(coordenadasPadrao.lat)
  const [longitude, setLongitude] = useState(coordenadasPadrao.lng)
  const [arquivos, setArquivos] = useState<ArquivoAnexo[]>(arquivosExemplo)
  const [tipoDocumento, setTipoDocumento] = useState(tiposDocumento[0])

  const descricaoCount = useMemo(() => descricao.length, [descricao])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setDraftSaved(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSaveDraft() {
    setDraftSaved(true)
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleAddAtividade() {
    const value = atividadeInput.trim()
    if (!value) return
    setAtividades((prev) => [...prev, value])
    setAtividadeInput("")
  }

  function handleRemoveAtividade(index: number) {
    setAtividades((prev) => prev.filter((_, i) => i !== index))
  }

  function handlePositionChange(lat: number, lng: number) {
    setLatitude(lat)
    setLongitude(lng)
  }

  function handleLatitudeChange(value: string) {
    const normalized = value.replace(",", ".")
    const parsed = Number.parseFloat(normalized)
    if (!Number.isNaN(parsed)) setLatitude(parsed)
  }

  function handleLongitudeChange(value: string) {
    const normalized = value.replace(",", ".")
    const parsed = Number.parseFloat(normalized)
    if (!Number.isNaN(parsed)) setLongitude(parsed)
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setArquivos((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        nome: file.name,
        tipo: tipoDocumento,
      },
    ])
    event.target.value = ""
  }

  function handleRemoveArquivo(id: string) {
    setArquivos((prev) => prev.filter((arquivo) => arquivo.id !== id))
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
          Análise de Projetos
        </Link>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Cadastrar um projeto
          </h2>
          <p className="text-sm text-muted-foreground">
            Preencha as informações para registrar um novo projeto no sistema.
          </p>
        </div>
      </div>

      {submitted ? (
        <Alert>
          <IconCheck className="size-4" />
          <AlertTitle>Projeto cadastrado com sucesso</AlertTitle>
          <AlertDescription>
            O cadastro foi validado localmente. A persistência em banco de dados
            será integrada em uma próxima etapa.
          </AlertDescription>
        </Alert>
      ) : null}

      {draftSaved ? (
        <Alert>
          <IconCheck className="size-4" />
          <AlertTitle>Rascunho salvo</AlertTitle>
          <AlertDescription>
            As informações preenchidas foram salvas como rascunho neste
            navegador.
          </AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Contrato</CardTitle>
            <CardDescription>
              Número do Processo: {processoExemplo}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="nome-projeto">Nome do Projeto</FieldLabel>
                  <Input
                    id="nome-projeto"
                    name="nomeProjeto"
                    placeholder="Digite o nome do projeto"
                    required
                  />
                  <FieldDescription>
                    Ex: Recuperação de Nascentes no Rio Doce
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="responsavel-tecnico">
                    Responsável Técnico
                  </FieldLabel>
                  <Input
                    id="responsavel-tecnico"
                    name="responsavelTecnico"
                    placeholder="Digite o nome do Técnico"
                    required
                  />
                  <FieldDescription>Ex: Matheus Felipe</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel>Órgão Gestor</FieldLabel>
                  <Select name="orgaoGestor" defaultValue={orgaosGestores[0]}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione as opções" />
                    </SelectTrigger>
                    <SelectContent>
                      {orgaosGestores.map((orgao) => (
                        <SelectItem key={orgao} value={orgao}>
                          {orgao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="data-inicio">Data de Início</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="data-inicio"
                        name="dataInicio"
                        type="date"
                        required
                      />
                      <InputGroupAddon align="inline-end">
                        <IconCalendar className="size-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="data-termino">
                      Data de término (Prevista)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        id="data-termino"
                        name="dataTermino"
                        type="date"
                        required
                      />
                      <InputGroupAddon align="inline-end">
                        <IconCalendar className="size-4" />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </div>
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
              <Field>
                <FieldLabel>Pilar ou Eixo do Edital</FieldLabel>
                <Select name="pilar" defaultValue={pilaresEdital[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {pilaresEdital.map((pilar) => (
                      <SelectItem key={pilar} value={pilar}>
                        {pilar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Temática do Projeto</FieldLabel>
                <Select name="tematica" defaultValue={tematicasProjeto[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {tematicasProjeto.map((tematica) => (
                      <SelectItem key={tematica} value={tematica}>
                        {tematica}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="atividade">Atividades Previstas</FieldLabel>
              <div className="flex gap-2">
                <Input
                  id="atividade"
                  value={atividadeInput}
                  onChange={(event) => setAtividadeInput(event.target.value)}
                  placeholder="Atividade"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      handleAddAtividade()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddAtividade}>
                  Incluir atividade
                  <IconPlus className="size-4" />
                </Button>
              </div>
              <div className="mt-3 overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Atividades adicionadas</TableHead>
                      <TableHead className="w-16 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atividades.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="text-center text-muted-foreground"
                        >
                          Nenhuma atividade adicionada
                        </TableCell>
                      </TableRow>
                    ) : (
                      atividades.map((atividade, index) => (
                        <TableRow key={`${atividade}-${index}`}>
                          <TableCell>{atividade}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              aria-label="Remover atividade"
                              onClick={() => handleRemoveAtividade(index)}
                            >
                              <IconTrash className="size-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="descricao">Descrição de projeto</FieldLabel>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {String(descricaoCount).padStart(3, "0")}/{MAX_DESCRICAO}
                </span>
              </div>
              <Textarea
                id="descricao"
                name="descricao"
                rows={4}
                maxLength={MAX_DESCRICAO}
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                placeholder="Descreva o escopo e objetivos do projeto."
              />
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel>Público-Alvo</FieldLabel>
                <div data-slot="checkbox-group" className="space-y-2.5">
                  {publicoAlvoOpcoes.map((opcao) => (
                    <label
                      key={opcao}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <Checkbox
                        checked={publicoAlvo[opcao]}
                        onCheckedChange={(checked) =>
                          setPublicoAlvo((prev) => ({
                            ...prev,
                            [opcao]: checked === true,
                          }))
                        }
                      />
                      {opcao}
                    </label>
                  ))}
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="pessoas-contempladas">
                  Número de Pessoas contempladas (Estimado)
                </FieldLabel>
                <Input
                  id="pessoas-contempladas"
                  name="pessoasContempladas"
                  inputMode="numeric"
                  placeholder="Digite o número estimado"
                />
                <FieldDescription>Digite apenas números.</FieldDescription>
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Financeiras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Fonte de Recurso</FieldLabel>
                <Select name="fonteRecurso" defaultValue={fontesRecurso[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontesRecurso.map((fonte) => (
                      <SelectItem key={fonte} value={fonte}>
                        {fonte}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="valor-investimento">
                  Valor do Investimento (Total)
                </FieldLabel>
                <Input
                  id="valor-investimento"
                  name="valorInvestimento"
                  placeholder="0,00"
                  required
                />
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Localização do Projeto</CardTitle>
            <CardDescription>
              Use o mapa para inserir a localidade do projeto cadastrado, ou
              insira a latitude e longitude nos campos abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="latitude">Latitude</FieldLabel>
                <Input
                  id="latitude"
                  name="latitude"
                  value={formatCoord(latitude)}
                  onChange={(event) => handleLatitudeChange(event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="longitude">Longitude</FieldLabel>
                <Input
                  id="longitude"
                  name="longitude"
                  value={formatCoord(longitude)}
                  onChange={(event) => handleLongitudeChange(event.target.value)}
                />
              </Field>
            </div>

            <NovoProjetoLocationMap
              latitude={latitude}
              longitude={longitude}
              onPositionChange={handlePositionChange}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="estado">Estado</FieldLabel>
                <Input
                  id="estado"
                  name="estado"
                  defaultValue="Espírito Santo"
                  readOnly
                />
              </Field>
              <Field>
                <FieldLabel>Município</FieldLabel>
                <Select name="municipio" defaultValue="Colatina">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipiosCadastro.map((municipio) => (
                      <SelectItem key={municipio} value={municipio}>
                        {municipio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="comunidade">Comunidade/Distrito</FieldLabel>
                <Input
                  id="comunidade"
                  name="comunidade"
                  placeholder="Digite o nome da comunidade/distrito"
                />
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload de Documentos</CardTitle>
            <CardDescription>
              O tamanho máx. suportado do arquivo é 300 MB. Os tipos suportados
              são .pdf, .zip, .jpg e .png.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <Field className="flex-1">
                <FieldLabel>Tipos de documentos</FieldLabel>
                <Select
                  value={tipoDocumento}
                  onValueChange={(value) => value && setTipoDocumento(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <label
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "cursor-pointer"
                )}
              >
                <IconUpload className="size-4" />
                Upload
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.zip,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
              </label>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/20 px-4 py-10 text-center transition-colors hover:bg-muted/40">
              <IconUpload className="size-8 text-muted-foreground" />
              <p className="text-sm font-medium">Clique ou arraste um arquivo</p>
              <p className="text-xs text-muted-foreground">
                Arquivo carregado: Arquivo-exemplo.pdf
              </p>
              <input
                type="file"
                className="sr-only"
                accept=".pdf,.zip,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
            </label>

            {arquivos.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {arquivos.map((arquivo) => (
                  <Badge
                    key={arquivo.id}
                    variant="secondary"
                    className="gap-1.5 py-1.5 pr-1"
                  >
                    Arquivo carregado: {arquivo.nome}
                    <button
                      type="button"
                      className="rounded-sm p-0.5 hover:bg-background/60"
                      aria-label={`Remover ${arquivo.nome}`}
                      onClick={() => handleRemoveArquivo(arquivo.id)}
                    >
                      <IconX className="size-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse justify-end gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Salvar Rascunho
          </Button>
          <Button type="submit">Cadastrar Projeto</Button>
        </div>
      </form>
    </div>
  )
}
