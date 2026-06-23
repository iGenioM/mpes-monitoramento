import { type ProjectStatus } from "@/lib/data/painel"

export type GestaoFilterState = {
  municipio: string
  eixoTematico: string
  unidadeGestora: string
  anexo: string
  periodo: string
}

export const defaultGestaoFilters: GestaoFilterState = {
  municipio: "todos",
  eixoTematico: "todos",
  unidadeGestora: "todos",
  anexo: "todos",
  periodo: "todos",
}

export const periodosDisponiveis = [
  { value: "todos", label: "Todos os anos" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
]

export const anexosDisponiveis = [
  { value: "todos", label: "Todos os anexos" },
  { value: "anexo9", label: "Anexo 9 — Saúde" },
  { value: "anexo10", label: "Anexo 10 — Pesca" },
  { value: "anexo11", label: "Anexo 11 — Saneamento" },
  { value: "anexo12", label: "Anexo 12 — Fomento Econômico" },
  { value: "outros", label: "Outros anexos" },
]

export const gestaoMunicipiosOpcoes = [
  { value: "todos", label: "Todos os municípios" },
  { value: "3203205", label: "Linhares" },
  { value: "3201506", label: "Colatina" },
  { value: "3204909", label: "São Mateus" },
  { value: "3205006", label: "Serra" },
  { value: "3200607", label: "Aracruz" },
  { value: "3200805", label: "Baixo Guandu" },
  { value: "3205014", label: "Sooretama" },
  { value: "3201605", label: "Conceição da Barra" },
  { value: "3200409", label: "Anchieta" },
  { value: "3202207", label: "Fundão" },
  { value: "3203353", label: "Marilândia" },
]

export const gestaoEixosOpcoes = [
  { value: "todos", label: "Todos os eixos" },
  { value: "Pesca", label: "Pesca e Aquicultura" },
  { value: "Saúde", label: "Saúde" },
  { value: "Saneamento", label: "Saneamento de Águas" },
  { value: "Fomento Econômico", label: "Fomento Econômico" },
  { value: "Infraestrutura", label: "Infraestrutura e Mobilidade" },
  { value: "Ambiental", label: "Recuperação Ambiental" },
  { value: "Assistência Social", label: "Assistência Social e Comunidades" },
  { value: "Povos Tradicionais", label: "Povos Tradicionais e Quilombolas" },
]

export const gestaoUnidadesOpcoes = [
  { value: "todos", label: "Todas as unidades" },
  { value: "FEST", label: "FEST" },
  { value: "IEMA", label: "IEMA" },
  { value: "SES-ES", label: "SES-ES" },
  { value: "INCAPER", label: "INCAPER" },
  { value: "MPES", label: "MPES" },
  { value: "UFES", label: "UFES" },
  { value: "SETADES", label: "SETADES" },
]

export const MUNICIPIO_ID_TO_NAME: Record<string, string> = Object.fromEntries(
  gestaoMunicipiosOpcoes.filter((m) => m.value !== "todos").map((m) => [m.value, m.label])
)

const EIXO_TO_ANEXO: Record<string, string> = {
  Pesca: "anexo10",
  Saúde: "anexo9",
  Saneamento: "anexo11",
  "Fomento Econômico": "anexo12",
  Infraestrutura: "outros",
  Ambiental: "outros",
  "Assistência Social": "outros",
  "Povos Tradicionais": "outros",
}

const MUNICIPIO_NAME_TO_ID: Record<string, string> = Object.fromEntries(
  Object.entries(MUNICIPIO_ID_TO_NAME).map(([id, name]) => [name, id])
)

export const gestaoKpis = {
  totalProjetos: 312,
  projetosEmExecucao: 198,
  projetosConcluidos: 87,
  projetosEmAnalise: 27,
  beneficiarios: 38_400,
  areaCadastradaHa: 94_500,
  investimentoExecutado: 1_340_000_000,
  investimentoPrevisto: 2_850_000_000,
  envelopeTotal: 4_200_000_000,
}

export const temasMapaGestao = [
  { value: "quantidade", label: "Quantidade de projetos" },
  { value: "investimento", label: "Valor investido" },
  { value: "beneficiarios", label: "Número de beneficiários" },
]

export const investimentoPorMunicipio = [
  { municipio: "Linhares", valor: 320, quantidade: 35 },
  { municipio: "Colatina", valor: 285, quantidade: 28 },
  { municipio: "São Mateus", valor: 260, quantidade: 24 },
  { municipio: "Serra", valor: 220, quantidade: 20 },
  { municipio: "Aracruz", valor: 180, quantidade: 16 },
  { municipio: "Baixo Guandu", valor: 145, quantidade: 13 },
  { municipio: "Sooretama", valor: 98, quantidade: 10 },
  { municipio: "Conceição da Barra", valor: 88, quantidade: 9 },
  { municipio: "Anchieta", valor: 64, quantidade: 7 },
  { municipio: "Fundão", valor: 52, quantidade: 5 },
  { municipio: "Marilândia", valor: 48, quantidade: 4 },
]

export const execucaoPorEixo = [
  { eixo: "Pesca", contratado: 620, executado: 398, percentual: 64 },
  { eixo: "Saúde", contratado: 480, executado: 312, percentual: 65 },
  { eixo: "Saneamento", contratado: 540, executado: 290, percentual: 54 },
  { eixo: "Fomento Econômico", contratado: 380, executado: 198, percentual: 52 },
  { eixo: "Infraestrutura", contratado: 320, executado: 142, percentual: 44 },
  { eixo: "Ambiental", contratado: 280, executado: 118, percentual: 42 },
  { eixo: "Assistência Social", contratado: 145, executado: 62, percentual: 43 },
  { eixo: "Povos Tradicionais", contratado: 85, executado: 20, percentual: 24 },
]

export const unidadesGestoras = [
  {
    nome: "FEST",
    projetos: 98,
    investimentoPrevisto: 820,
    investimentoExecutado: 534,
    percentualExecucao: 65,
  },
  {
    nome: "IEMA",
    projetos: 54,
    investimentoPrevisto: 480,
    investimentoExecutado: 298,
    percentualExecucao: 62,
  },
  {
    nome: "SES-ES",
    projetos: 42,
    investimentoPrevisto: 380,
    investimentoExecutado: 218,
    percentualExecucao: 57,
  },
  {
    nome: "INCAPER",
    projetos: 38,
    investimentoPrevisto: 290,
    investimentoExecutado: 145,
    percentualExecucao: 50,
  },
  {
    nome: "MPES",
    projetos: 28,
    investimentoPrevisto: 210,
    investimentoExecutado: 98,
    percentualExecucao: 47,
  },
  {
    nome: "UFES",
    projetos: 22,
    investimentoPrevisto: 180,
    investimentoExecutado: 82,
    percentualExecucao: 46,
  },
  {
    nome: "SETADES",
    projetos: 18,
    investimentoPrevisto: 145,
    investimentoExecutado: 55,
    percentualExecucao: 38,
  },
  {
    nome: "Outros",
    projetos: 14,
    investimentoPrevisto: 345,
    investimentoExecutado: 110,
    percentualExecucao: 32,
  },
]

export const densidadeMunicipios = [
  { municipio: "Linhares", faixa: "40+", faixaBeneficiarios: "40+" },
  { municipio: "Colatina", faixa: "30-40", faixaBeneficiarios: "30-40" },
  { municipio: "São Mateus", faixa: "30-40", faixaBeneficiarios: "30-40" },
  { municipio: "Serra", faixa: "20-30", faixaBeneficiarios: "20-30" },
  { municipio: "Aracruz", faixa: "20-30", faixaBeneficiarios: "20-30" },
  { municipio: "Baixo Guandu", faixa: "10-20", faixaBeneficiarios: "10-20" },
  { municipio: "Sooretama", faixa: "1-10", faixaBeneficiarios: "1-10" },
  { municipio: "Conceição da Barra", faixa: "10-20", faixaBeneficiarios: "10-20" },
  { municipio: "Fundão", faixa: "10-20", faixaBeneficiarios: "1-10" },
  { municipio: "Marilândia", faixa: "1-10", faixaBeneficiarios: "1-10" },
  { municipio: "Anchieta", faixa: "1-10", faixaBeneficiarios: "1-10" },
]

export const evolucaoMensal = [
  { mes: "Jan", previsto: 210, executado: 95 },
  { mes: "Fev", previsto: 225, executado: 108 },
  { mes: "Mar", previsto: 238, executado: 118 },
  { mes: "Abr", previsto: 245, executado: 125 },
  { mes: "Mai", previsto: 252, executado: 132 },
  { mes: "Jun", previsto: 260, executado: 138 },
  { mes: "Jul", previsto: 268, executado: 145 },
  { mes: "Ago", previsto: 275, executado: 152 },
  { mes: "Set", previsto: 282, executado: 158 },
  { mes: "Out", previsto: 290, executado: 165 },
  { mes: "Nov", previsto: 298, executado: 172 },
  { mes: "Dez", previsto: 305, executado: 180 },
]

export const evolucaoAnual = [
  { ano: "2022", previsto: 0.28, executado: 0.12 },
  { ano: "2023", previsto: 0.65, executado: 0.41 },
  { ano: "2024", previsto: 1.2, executado: 0.88 },
  { ano: "2025", previsto: 2.85, executado: 1.34 },
]

export const projetosPorAnexo = [
  { anexo: "Anexo 9", quantidade: 85 },
  { anexo: "Anexo 10", quantidade: 72 },
  { anexo: "Anexo 11", quantidade: 58 },
  { anexo: "Anexo 12", quantidade: 45 },
  { anexo: "Anexo 14", quantidade: 38 },
  { anexo: "Anexo 15", quantidade: 14 },
]

export const investimentoPorTipo = [
  { tipo: "Saneamento", valor: 540 },
  { tipo: "Infraestrutura", valor: 320 },
  { tipo: "Saúde", valor: 480 },
  { tipo: "Pesca", valor: 620 },
  { tipo: "Ambiental", valor: 280 },
  { tipo: "Assistência", valor: 145 },
]

export const distribuicaoAnexo = [
  {
    id: "anexo9",
    nome: "Anexo 9: Saúde",
    valor: 20,
    percentual: "20,00",
    fill: "#3b82f6",
  },
  {
    id: "anexo10",
    nome: "Anexo 10: Pesca",
    valor: 44.13,
    percentual: "44,13",
    fill: "#f97316",
  },
  {
    id: "anexo11",
    nome: "Anexo 11: Saneamento de Águas",
    valor: 17.44,
    percentual: "17,44",
    fill: "#ec4899",
  },
  {
    id: "anexo12",
    nome: "Anexo 12: Fomento de Iniciativas Econômicas",
    valor: 18.43,
    percentual: "18,43",
    fill: "#a855f7",
  },
]

export const distribuicaoTipologia = [
  {
    id: "engenharia",
    nome: "Engenharia e Estrutura",
    valor: 14.2,
    percentual: "14,20",
    fill: "#eab308",
  },
  {
    id: "saudePesca",
    nome: "Saúde e Fomento de Pesca",
    valor: 12.8,
    percentual: "12,80",
    fill: "#ec4899",
  },
  {
    id: "analise",
    nome: "Análise, Monitoramento e Recuperação de Áreas e CTFF",
    valor: 18.5,
    percentual: "18,50",
    fill: "#14b8a6",
  },
  {
    id: "infra",
    nome: "Infraestrutura em Saneamento de Água",
    valor: 11.3,
    percentual: "11,30",
    fill: "#22c55e",
  },
  {
    id: "assistencia",
    nome: "Assistência Social e Comunidades",
    valor: 9.8,
    percentual: "9,80",
    fill: "#3b82f6",
  },
  {
    id: "pesca",
    nome: "Pesca e Aquicultura",
    valor: 8.6,
    percentual: "8,60",
    fill: "#f97316",
  },
  {
    id: "agricultura",
    nome: "Agricultura Familiar e SAF",
    valor: 7.4,
    percentual: "7,40",
    fill: "#84cc16",
  },
  {
    id: "educacao",
    nome: "Educação Ambiental",
    valor: 6.2,
    percentual: "6,20",
    fill: "#a855f7",
  },
  {
    id: "restauracao",
    nome: "Restauração de APP e Nascentes",
    valor: 6.0,
    percentual: "6,00",
    fill: "#06b6d4",
  },
  {
    id: "hidrico",
    nome: "Monitoramento Hídrico e Qualidade da Água",
    valor: 5.2,
    percentual: "5,20",
    fill: "#64748b",
  },
]

export type GestaoProjeto = {
  id: string
  nome: string
  instituicao: string
  tipologia: string
  eixo: string
  contrato: string
  municipio: string
  municipioId: string
  anexo: string
  periodo: string
  investimento: number
  status: ProjectStatus
}

const gestaoProjetosBase: Array<
  Omit<GestaoProjeto, "municipioId" | "anexo" | "periodo">
> = [
  {
    id: "g1",
    nome: "Projeto Nascentes do Rio Doce",
    instituicao: "FEST",
    tipologia: "Engenharia",
    eixo: "Pesca",
    contrato: "2024/00000002365",
    municipio: "Sooretama",
    investimento: 4_500_000,
    status: "em_execucao",
  },
  {
    id: "g2",
    nome: "SAF Comunidade Quilombola",
    instituicao: "FEST",
    tipologia: "Agricultura Familiar",
    eixo: "Povos Tradicionais",
    contrato: "2025/00000001428",
    municipio: "Colatina",
    investimento: 2_800_000,
    status: "concluido",
  },
  {
    id: "g3",
    nome: "Recuperação de Manguezais",
    instituicao: "IEMA",
    tipologia: "Restauração",
    eixo: "Ambiental",
    contrato: "2024/00000001892",
    municipio: "Linhares",
    investimento: 12_400_000,
    status: "em_execucao",
  },
  {
    id: "g4",
    nome: "Programa Especial de Saúde",
    instituicao: "SES-ES",
    tipologia: "Saúde",
    eixo: "Saúde",
    contrato: "2024/00000003107",
    municipio: "Serra",
    investimento: 28_500_000,
    status: "aprovado",
  },
  {
    id: "g5",
    nome: "Apoio a Pescadores Artesanais",
    instituicao: "MPES",
    tipologia: "Assistência",
    eixo: "Pesca",
    contrato: "2025/00000000941",
    municipio: "São Mateus",
    investimento: 3_200_000,
    status: "em_execucao",
  },
  {
    id: "g6",
    nome: "Renovação de Margens",
    instituicao: "FEST",
    tipologia: "Engenharia",
    eixo: "Fomento Econômico",
    contrato: "2024/00000002754",
    municipio: "Baixo Guandu",
    investimento: 8_600_000,
    status: "em_execucao",
  },
  {
    id: "g7",
    nome: "Restauração de Restingas",
    instituicao: "IEMA",
    tipologia: "Restauração",
    eixo: "Ambiental",
    contrato: "2025/00000001163",
    municipio: "Conceição da Barra",
    investimento: 6_750_000,
    status: "em_analise",
  },
  {
    id: "g8",
    nome: "Agrofloresta Rio Doce",
    instituicao: "INCAPER",
    tipologia: "Agricultura Familiar",
    eixo: "Fomento Econômico",
    contrato: "2024/00000002201",
    municipio: "Aracruz",
    investimento: 5_200_000,
    status: "aprovado",
  },
  {
    id: "g9",
    nome: "Monitoramento da Foz",
    instituicao: "UFES",
    tipologia: "Monitoramento",
    eixo: "Ambiental",
    contrato: "2025/00000000678",
    municipio: "Linhares",
    investimento: 9_800_000,
    status: "concluido",
  },
  {
    id: "g10",
    nome: "Assistência a Famílias Atingidas",
    instituicao: "SETADES",
    tipologia: "Assistência",
    eixo: "Assistência Social",
    contrato: "2024/00000002990",
    municipio: "Fundão",
    investimento: 3_100_000,
    status: "em_execucao",
  },
  {
    id: "g11",
    nome: "Esgotamento Sanitário — Serra",
    instituicao: "SES-ES",
    tipologia: "Infraestrutura",
    eixo: "Saneamento",
    contrato: "2024/00000003312",
    municipio: "Serra",
    investimento: 18_200_000,
    status: "em_execucao",
  },
  {
    id: "g12",
    nome: "Infraestrutura Pesqueira — Colatina",
    instituicao: "FEST",
    tipologia: "Engenharia",
    eixo: "Pesca",
    contrato: "2025/00000001567",
    municipio: "Colatina",
    investimento: 7_400_000,
    status: "em_execucao",
  },
  {
    id: "g13",
    nome: "Corredor Ecológico Sooretama",
    instituicao: "IEMA",
    tipologia: "Restauração",
    eixo: "Ambiental",
    contrato: "2024/00000002478",
    municipio: "Sooretama",
    investimento: 5_600_000,
    status: "aprovado",
  },
  {
    id: "g14",
    nome: "Capacitação de Agentes de Saúde",
    instituicao: "SES-ES",
    tipologia: "Saúde",
    eixo: "Saúde",
    contrato: "2025/00000000890",
    municipio: "Linhares",
    investimento: 4_100_000,
    status: "concluido",
  },
  {
    id: "g15",
    nome: "Microcrédito Produtivo Rural",
    instituicao: "SETADES",
    tipologia: "Assistência",
    eixo: "Fomento Econômico",
    contrato: "2024/00000002634",
    municipio: "Baixo Guandu",
    investimento: 2_900_000,
    status: "em_execucao",
  },
  {
    id: "g16",
    nome: "Recuperação de APP — Marilândia",
    instituicao: "IEMA",
    tipologia: "Restauração",
    eixo: "Ambiental",
    contrato: "2025/00000001245",
    municipio: "Marilândia",
    investimento: 1_800_000,
    status: "em_analise",
  },
  {
    id: "g17",
    nome: "Acesso à Água Potável — Anchieta",
    instituicao: "FEST",
    tipologia: "Infraestrutura",
    eixo: "Saneamento",
    contrato: "2024/00000002891",
    municipio: "Anchieta",
    investimento: 6_300_000,
    status: "aprovado",
  },
  {
    id: "g18",
    nome: "Fortalecimento de Cooperativas de Pesca",
    instituicao: "INCAPER",
    tipologia: "Pesca",
    eixo: "Pesca",
    contrato: "2025/00000001023",
    municipio: "São Mateus",
    investimento: 3_700_000,
    status: "em_execucao",
  },
  {
    id: "g19",
    nome: "Ponte e Acesso Rural — Aracruz",
    instituicao: "FEST",
    tipologia: "Engenharia",
    eixo: "Infraestrutura",
    contrato: "2024/00000003056",
    municipio: "Aracruz",
    investimento: 14_500_000,
    status: "em_execucao",
  },
  {
    id: "g20",
    nome: "Território Quilombola — Conceição da Barra",
    instituicao: "SETADES",
    tipologia: "Assistência",
    eixo: "Povos Tradicionais",
    contrato: "2025/00000001378",
    municipio: "Conceição da Barra",
    investimento: 2_200_000,
    status: "aprovado",
  },
  {
    id: "g21",
    nome: "Unidade Básica de Saúde Fluvial",
    instituicao: "SES-ES",
    tipologia: "Saúde",
    eixo: "Saúde",
    contrato: "2024/00000003201",
    municipio: "Colatina",
    investimento: 11_200_000,
    status: "em_execucao",
  },
  {
    id: "g22",
    nome: "Restauração de Nascentes — Fundão",
    instituicao: "IEMA",
    tipologia: "Restauração",
    eixo: "Ambiental",
    contrato: "2025/00000000789",
    municipio: "Fundão",
    investimento: 1_500_000,
    status: "concluido",
  },
]

function enrichGestaoProjeto(
  projeto: Omit<GestaoProjeto, "municipioId" | "anexo" | "periodo">
): GestaoProjeto {
  return {
    ...projeto,
    municipioId: MUNICIPIO_NAME_TO_ID[projeto.municipio] ?? "",
    anexo: EIXO_TO_ANEXO[projeto.eixo] ?? "outros",
    periodo: projeto.contrato.split("/")[0] ?? "2024",
  }
}

export const gestaoProjetos: GestaoProjeto[] =
  gestaoProjetosBase.map(enrichGestaoProjeto)

export const gestaoProjectPins: Array<{
  id: string
  name: string
  coords: [number, number]
  municipio: string
}> = [
  {
    id: "p1",
    name: "Projeto Nascentes do Rio Doce",
    coords: [-19.19, -40.08],
    municipio: "Sooretama",
  },
  {
    id: "p2",
    name: "SAF Comunidade Quilombola",
    coords: [-19.54, -40.63],
    municipio: "Colatina",
  },
  {
    id: "p3",
    name: "Recuperação de Manguezais",
    coords: [-19.38, -39.95],
    municipio: "Linhares",
  },
  {
    id: "p4",
    name: "Programa Especial de Saúde",
    coords: [-20.12, -40.31],
    municipio: "Serra",
  },
  {
    id: "p5",
    name: "Apoio a Pescadores",
    coords: [-18.72, -39.88],
    municipio: "São Mateus",
  },
  {
    id: "p6",
    name: "Renovação de Margens",
    coords: [-19.16, -40.88],
    municipio: "Baixo Guandu",
  },
  {
    id: "p7",
    name: "Agrofloresta Rio Doce",
    coords: [-19.82, -40.27],
    municipio: "Aracruz",
  },
]

export const mapaLegendaFaixas = [
  { faixa: "1-10", cor: "#dbeafe" },
  { faixa: "10-20", cor: "#93c5fd" },
  { faixa: "20-30", cor: "#60a5fa" },
  { faixa: "30-40", cor: "#2563eb" },
  { faixa: "40+", cor: "#1e3a8a" },
]

export const gestaoEixosFiltro = [
  "Todos",
  "Pesca",
  "Saúde",
  "Saneamento",
  "Infraestrutura",
  "Ambiental",
  "Assistência Social",
  "Povos Tradicionais",
  "Fomento Econômico",
]

export const gestaoStatusFiltro = [
  { value: "todos", label: "Todos" },
  { value: "em_execucao", label: "Em execução" },
  { value: "aprovado", label: "Aprovado" },
  { value: "concluido", label: "Concluído" },
  { value: "em_analise", label: "Em análise" },
]

export const gestaoMunicipiosFiltro = [
  "Todos",
  "Colatina",
  "Linhares",
  "São Mateus",
  "Sooretama",
  "Serra",
  "Baixo Guandu",
  "Aracruz",
  "Conceição da Barra",
  "Fundão",
  "Marilândia",
  "Anchieta",
]

export const gestaoInstituicoesFiltro = [
  "Todas",
  "FEST",
  "IEMA",
  "SES-ES",
  "INCAPER",
  "MPES",
  "UFES",
  "SETADES",
]
