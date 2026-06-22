export type ProjectStatus =
  | "em_execucao"
  | "aprovado"
  | "concluido"
  | "em_analise"

export type AlertStatus = "ativo" | "resolvido"
export type AlertSeverity = "critica" | "alta" | "media"

export const painelKpis = {
  totalContratos: 25,
  municipiosContemplados: 7,
  projetosEmAndamento: 13,
  projetosPrazoVencido: 12,
  investimentoTotal: 13_234_875.45,
  indiceCustos: 0.89,
  indicePrazos: 1.12,
}

export const painelAlerts = [
  {
    id: "a1",
    titulo: "Atraso em Marco Físico",
    categoria: "Prazo",
    status: "ativo" as AlertStatus,
    severidade: "alta" as AlertSeverity,
    descricao: "Marco de 50% de execução atrasado em 30 dias",
    contrato: "Infraestrutura de Pesca — Colatina",
    criadoEm: "21/10/2025",
  },
  {
    id: "a2",
    titulo: "Documentação Incompleta",
    categoria: "Conformidade",
    status: "ativo" as AlertStatus,
    severidade: "critica" as AlertSeverity,
    descricao: "Faltam ART/RRT e fotos georreferenciadas",
    contrato: "Recuperação de APP — Linhares",
    criadoEm: "21/10/2025",
  },
]

export type Projeto = {
  id: string
  nome: string
  instituicao: string
  tematica: string
  contrato: string
  municipio: string
  investimento: number
  status: ProjectStatus
  responsavel: string
}

export const projetos: Projeto[] = [
  {
    id: "1",
    nome: "Projeto Nascentes do Rio Doce",
    instituicao: "FEST",
    tematica: "Pesca",
    contrato: "2024/00000002365",
    municipio: "Sooretama",
    investimento: 150_000,
    status: "em_execucao",
    responsavel: "Ana Paula Ribeiro",
  },
  {
    id: "2",
    nome: "SAF Comunidade Quilombola",
    instituicao: "FEST",
    tematica: "Saúde",
    contrato: "2025/00000001428",
    municipio: "Colatina",
    investimento: 80_000,
    status: "concluido",
    responsavel: "Carlos Mendes",
  },
  {
    id: "3",
    nome: "Recuperação de Manguezais",
    instituicao: "IEMA",
    tematica: "Ambiental",
    contrato: "2024/00000001892",
    municipio: "Linhares",
    investimento: 420_000,
    status: "em_execucao",
    responsavel: "Juliana Freitas",
  },
  {
    id: "4",
    nome: "Apoio a Pescadores Artesanais",
    instituicao: "MPES",
    tematica: "Pesca",
    contrato: "2025/00000000941",
    municipio: "São Mateus",
    investimento: 95_000,
    status: "aprovado",
    responsavel: "Roberto Alves",
  },
  {
    id: "5",
    nome: "Programa Especial de Saúde Rio Doce",
    instituicao: "SES-ES",
    tematica: "Saúde",
    contrato: "2024/00000003107",
    municipio: "Serra",
    investimento: 1_200_000,
    status: "em_analise",
    responsavel: "Fernanda Lopes",
  },
  {
    id: "6",
    nome: "Renovação de Margens — Baixo Guandu",
    instituicao: "FEST",
    tematica: "Produtivo",
    contrato: "2024/00000002754",
    municipio: "Baixo Guandu",
    investimento: 310_000,
    status: "em_execucao",
    responsavel: "Marcos Vieira",
  },
  {
    id: "7",
    nome: "Restauração de Restingas",
    instituicao: "IEMA",
    tematica: "Ambiental",
    contrato: "2025/00000001163",
    municipio: "Conceição da Barra",
    investimento: 275_000,
    status: "em_analise",
    responsavel: "Patrícia Nunes",
  },
  {
    id: "8",
    nome: "Agrofloresta Rio Doce",
    instituicao: "INCAPER",
    tematica: "Produtivo",
    contrato: "2024/00000002201",
    municipio: "Aracruz",
    investimento: 180_000,
    status: "aprovado",
    responsavel: "Eduardo Campos",
  },
  {
    id: "9",
    nome: "Monitoramento da Foz",
    instituicao: "UFES",
    tematica: "Ambiental",
    contrato: "2025/00000000678",
    municipio: "Linhares",
    investimento: 540_000,
    status: "concluido",
    responsavel: "Luciana Prado",
  },
  {
    id: "10",
    nome: "Assistência a Famílias Atingidas",
    instituicao: "SETADES",
    tematica: "Assistência",
    contrato: "2024/00000002990",
    municipio: "Fundão",
    investimento: 125_000,
    status: "em_execucao",
    responsavel: "Helena Duarte",
  },
]

export const statusLabels: Record<ProjectStatus, string> = {
  em_execucao: "Em execução",
  aprovado: "Aprovado",
  concluido: "Concluído",
  em_analise: "Em análise",
}

export const statusColors: Record<ProjectStatus, string> = {
  em_execucao: "bg-emerald-500",
  aprovado: "bg-emerald-500",
  concluido: "bg-blue-500",
  em_analise: "bg-amber-500",
}

export const municipiosFiltro = [
  "Todos",
  "Colatina",
  "Linhares",
  "São Mateus",
  "Sooretama",
  "Serra",
  "Baixo Guandu",
  "Aracruz",
]

export const tematicasFiltro = [
  "Todas",
  "Pesca",
  "Saúde",
  "Ambiental",
  "Produtivo",
  "Assistência",
]
