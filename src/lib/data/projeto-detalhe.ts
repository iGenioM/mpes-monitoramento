import { gestaoProjetos } from "@/lib/data/gestao"
import {
  projetos,
  type ProjectStatus,
  type Projeto,
} from "@/lib/data/painel"

export type ProjetoAnexo = {
  id: string
  nome: string
  tipo: string
}

export type ProjetoDetalhe = {
  id: string
  numeroProcesso: string
  nome: string
  responsavelTecnico: string
  orgaoGestor: string
  dataInicio: string
  dataTerminoPrevista: string
  pilarEdital: string
  tematica: string
  atividades: string[]
  descricao: string
  publicoAlvo: string[]
  pessoasContempladas: number
  fonteRecurso: string
  valorInvestimento: number
  progressoFisico: number
  progressoFinanceiro: number
  latitude: number
  longitude: number
  estado: string
  municipio: string
  comunidade: string
  status: ProjectStatus
  instituicao: string
  contrato: string
  anexos: ProjetoAnexo[]
}

const detalhesExtras: Record<
  string,
  Omit<ProjetoDetalhe, keyof Projeto | "id" | "status" | "instituicao" | "contrato" | "nome" | "tematica" | "municipio" | "investimento"> & {
    nome?: string
    tematica?: string
    municipio?: string
    valorInvestimento?: number
  }
> = {
  "2": {
    numeroProcesso: "2025/00000001428",
    responsavelTecnico: "Carlos Mendes",
    orgaoGestor: "FEST — Fundação de Amparo à Ciência e Tecnologia",
    dataInicio: "10/01/2024",
    dataTerminoPrevista: "30/06/2025",
    pilarEdital: "Povos Tradicionais e Quilombolas",
    tematica: "Povos Tradicionais",
    atividades: [
      "Implantação de Sistema Agroflorestal (SAF)",
      "Capacitação de agricultores familiares quilombolas",
      "Acompanhamento técnico e monitoramento de produção",
    ],
    descricao:
      "Projeto de implantação de Sistema Agroflorestal na comunidade quilombola de Colatina, promovendo geração de renda sustentável e recuperação ambiental em áreas degradadas pela lama do Rio Doce.",
    publicoAlvo: ["Comunidade Quilombola", "Agricultores Familiares"],
    pessoasContempladas: 180,
    fonteRecurso: "TTAC SAMARCO — Anexo 12",
    valorInvestimento: 2_800_000,
    progressoFisico: 100,
    progressoFinanceiro: 100,
    latitude: -19.54,
    longitude: -40.63,
    estado: "Espírito Santo",
    municipio: "Colatina",
    comunidade: "Quilombo São José",
    anexos: [
      {
        id: "a1",
        nome: "PlanoDeTrabalho_ProjetoX.pdf",
        tipo: "Plano detalhado do projeto",
      },
      {
        id: "a2",
        nome: "RelatorioExecucao_Q1.pdf",
        tipo: "Relatório de execução",
      },
      {
        id: "a3",
        nome: "DocumentacaoTecnica.zip",
        tipo: "Documentação complementar",
      },
    ],
  },
  g2: {
    numeroProcesso: "2025/00000001428",
    responsavelTecnico: "Carlos Mendes",
    orgaoGestor: "FEST — Fundação de Amparo à Ciência e Tecnologia",
    dataInicio: "10/01/2024",
    dataTerminoPrevista: "30/06/2025",
    pilarEdital: "Povos Tradicionais e Quilombolas",
    tematica: "Povos Tradicionais",
    atividades: [
      "Implantação de Sistema Agroflorestal (SAF)",
      "Capacitação de agricultores familiares quilombolas",
      "Monitoramento de produção e renda gerada",
    ],
    descricao:
      "Implantação de SAF na comunidade quilombola de Colatina, com foco em renda sustentável e recuperação de áreas degradadas pelo desastre de Mariana.",
    publicoAlvo: ["Comunidade Quilombola", "Agricultores Familiares"],
    pessoasContempladas: 180,
    fonteRecurso: "TTAC SAMARCO — Anexo 12",
    valorInvestimento: 2_800_000,
    progressoFisico: 100,
    progressoFinanceiro: 100,
    latitude: -19.54,
    longitude: -40.63,
    estado: "Espírito Santo",
    municipio: "Colatina",
    comunidade: "Quilombo São José",
    anexos: [
      {
        id: "a1",
        nome: "PlanoDeTrabalho_ProjetoX.pdf",
        tipo: "Plano detalhado do projeto",
      },
      {
        id: "a2",
        nome: "RelatorioExecucao_Q1.pdf",
        tipo: "Relatório de execução",
      },
      {
        id: "a3",
        nome: "DocumentacaoTecnica.zip",
        tipo: "Documentação complementar",
      },
    ],
  },
}

const coordenadasPorMunicipio: Record<string, { lat: number; lng: number }> = {
  Sooretama: { lat: -19.19, lng: -40.08 },
  Colatina: { lat: -19.3792, lng: -40.0644 },
  Linhares: { lat: -19.38, lng: -39.95 },
  "São Mateus": { lat: -18.72, lng: -39.88 },
  Serra: { lat: -20.12, lng: -40.31 },
  "Baixo Guandu": { lat: -19.16, lng: -40.88 },
  Aracruz: { lat: -19.82, lng: -40.27 },
  "Conceição da Barra": { lat: -18.59, lng: -39.73 },
  Fundão: { lat: -19.93, lng: -40.4 },
}

function buildDefaults(
  base: Pick<
    Projeto,
    "id" | "nome" | "instituicao" | "tematica" | "contrato" | "municipio" | "investimento" | "status" | "responsavel"
  >
): ProjetoDetalhe {
  const coords =
    coordenadasPorMunicipio[base.municipio] ?? { lat: -19.5, lng: -40.3 }
  const hash = base.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  return {
    id: base.id,
    numeroProcesso: base.contrato,
    nome: base.nome,
    responsavelTecnico: base.responsavel,
    orgaoGestor: base.instituicao,
    dataInicio: "01/06/2024",
    dataTerminoPrevista: "31/12/2026",
    pilarEdital: "Recuperação ambiental",
    tematica: base.tematica,
    atividades: [
      "Diagnóstico e planejamento",
      "Execução das ações previstas",
      "Monitoramento e relatórios",
    ],
    descricao: `Projeto ${base.nome} voltado à recuperação socioambiental na bacia do Rio Doce, município de ${base.municipio}.`,
    publicoAlvo: ["Agricultores Familiares", "Pescadores Artesanais"],
    pessoasContempladas: 800 + (hash % 12) * 100,
    fonteRecurso: "Acordo de Reparação — Fundo Rio Doce",
    valorInvestimento: base.investimento,
    progressoFisico: 20 + (hash % 60),
    progressoFinanceiro: 15 + (hash % 50),
    latitude: coords.lat,
    longitude: coords.lng,
    estado: "Espírito Santo",
    municipio: base.municipio,
    comunidade: "Centro",
    status: base.status,
    instituicao: base.instituicao,
    contrato: base.contrato,
    anexos: [
      {
        id: `${base.id}-1`,
        nome: `Plano_${base.id}.pdf`,
        tipo: "Plano detalhado do projeto",
      },
      {
        id: `${base.id}-2`,
        nome: `FotosArea_${base.id}.jpg`,
        tipo: "Fotos da área",
      },
    ],
  }
}

function mergeDetalhe(base: ProjetoDetalhe, extra?: Partial<ProjetoDetalhe>) {
  if (!extra) return base
  return { ...base, ...extra }
}

export function getProjetoDetalhe(id: string): ProjetoDetalhe | null {
  const painel = projetos.find((projeto) => projeto.id === id)
  if (painel) {
    return mergeDetalhe(buildDefaults(painel), detalhesExtras[id])
  }

  const gestao = gestaoProjetos.find((projeto) => projeto.id === id)
  if (gestao) {
    const base = buildDefaults({
      id: gestao.id,
      nome: gestao.nome,
      instituicao: gestao.instituicao,
      tematica: gestao.tipologia,
      contrato: gestao.contrato,
      municipio: gestao.municipio,
      investimento: gestao.investimento,
      status: gestao.status,
      responsavel: "Responsável Técnico",
    })
    return mergeDetalhe(base, detalhesExtras[id])
  }

  return null
}

export function listProjetoIds(): string[] {
  return [...projetos.map((p) => p.id), ...gestaoProjetos.map((p) => p.id)]
}
