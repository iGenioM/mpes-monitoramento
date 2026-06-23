export type ProjectStatus =
  | "em_andamento"
  | "investimento_aprovado"
  | "investimento_planejado"
  | "em_estudo"
  | "nao_atingido"

export type FilterState = {
  mesorregiao: string
  municipio: string
  eixoTematico: string
  statusProjeto: ProjectStatus | "todos"
}

export const defaultFilters: FilterState = {
  mesorregiao: "todas",
  municipio: "todos",
  eixoTematico: "todos",
  statusProjeto: "todos",
}

export const mesorregioes = [
  { value: "todas", label: "Todas as mesorregiões" },
  { value: "litoral_norte", label: "Litoral Norte Espírito-Santense" },
  { value: "noroeste", label: "Noroeste Espírito-Santense" },
  { value: "central", label: "Central Espírito-Santense" },
]

export const municipiosAtingidos = [
  { value: "todos", label: "Todos os municípios atingidos", mesorregiao: "todas" },
  { value: "3200409", label: "Anchieta", mesorregiao: "central" },
  { value: "3200607", label: "Aracruz", mesorregiao: "litoral_norte" },
  { value: "3200805", label: "Baixo Guandu", mesorregiao: "noroeste" },
  { value: "3201506", label: "Colatina", mesorregiao: "litoral_norte" },
  { value: "3201605", label: "Conceição da Barra", mesorregiao: "litoral_norte" },
  { value: "3202207", label: "Fundão", mesorregiao: "litoral_norte" },
  { value: "3203205", label: "Linhares", mesorregiao: "litoral_norte" },
  { value: "3203353", label: "Marilândia", mesorregiao: "noroeste" },
  { value: "3204909", label: "São Mateus", mesorregiao: "litoral_norte" },
  { value: "3205006", label: "Serra", mesorregiao: "central" },
  { value: "3205014", label: "Sooretama", mesorregiao: "litoral_norte" },
]

export const eixosTematicos = [
  { value: "todos", label: "Todos os eixos" },
  { value: "pesca", label: "Pesca e Aquicultura (Anexo 10)" },
  { value: "saude", label: "Saúde (Anexo 9)" },
  { value: "saneamento", label: "Saneamento de Águas (Anexo 11)" },
  { value: "fomento", label: "Fomento Econômico (Anexo 12)" },
  { value: "infraestrutura", label: "Infraestrutura e Mobilidade" },
  { value: "ambiental", label: "Recuperação Ambiental" },
  { value: "assistencia", label: "Assistência Social e Comunidades" },
  { value: "povos_tradicionais", label: "Povos Tradicionais e Quilombolas" },
]

export const statusProjetoOptions = [
  { value: "todos", label: "Todos os status" },
  { value: "em_andamento", label: "Projetos em andamento" },
  { value: "investimento_aprovado", label: "Investimento aprovado" },
  { value: "investimento_planejado", label: "Investimento planejado" },
  { value: "em_estudo", label: "Em estudo" },
]

export const projectStatusLabels: Record<ProjectStatus, string> = {
  em_andamento: "Projetos em andamento",
  investimento_aprovado: "Investimento aprovado",
  investimento_planejado: "Investimento planejado",
  em_estudo: "Em estudo",
  nao_atingido: "Fora da área de impacto direto",
}

export const projectStatusColors: Record<ProjectStatus, string> = {
  em_andamento: "#1d4ed8",
  investimento_aprovado: "#3b82f6",
  investimento_planejado: "#93c5fd",
  em_estudo: "#94a3b8",
  nao_atingido: "#e2e8f0",
}

const EIXO_FILTER_KEYWORDS: Record<string, string[]> = {
  pesca: ["Pesca"],
  saude: ["Saúde"],
  saneamento: ["Saneamento"],
  fomento: ["Fomento", "Produtivo"],
  infraestrutura: ["Infraestrutura"],
  ambiental: ["Ambiental"],
  assistencia: ["Assistência"],
  povos_tradicionais: ["Povos Tradicionais", "Quilombolas"],
}

export type MunicipalityData = {
  id: string
  name: string
  mesorregiao: string
  status: ProjectStatus
  investimentoTotal: number
  investimentoPlanejado: number
  familiasAtendidas: number
  projetos: number
  eixos: string[]
  acoes: string[]
  ucs: number
  terrasIndigenas: number
  areaRecuperarHa: number
}

export const municipalitiesData: MunicipalityData[] = [
  {
    id: "3201506",
    name: "Colatina",
    mesorregiao: "litoral_norte",
    status: "em_andamento",
    investimentoTotal: 285_000_000,
    investimentoPlanejado: 490_000_000,
    familiasAtendidas: 4_200,
    projetos: 28,
    eixos: ["Saúde", "Pesca", "Fomento Econômico"],
    acoes: ["Renova Rio Doce – Colatina", "Recuperação de margens"],
    ucs: 1,
    terrasIndigenas: 0,
    areaRecuperarHa: 1_240,
  },
  {
    id: "3203205",
    name: "Linhares",
    mesorregiao: "litoral_norte",
    status: "investimento_aprovado",
    investimentoTotal: 320_000_000,
    investimentoPlanejado: 580_000_000,
    familiasAtendidas: 6_800,
    projetos: 35,
    eixos: ["Saúde", "Ambiental", "Pesca"],
    acoes: ["Monitoramento da foz", "Restauração de manguezais"],
    ucs: 2,
    terrasIndigenas: 1,
    areaRecuperarHa: 2_180,
  },
  {
    id: "3204909",
    name: "São Mateus",
    mesorregiao: "litoral_norte",
    status: "em_andamento",
    investimentoTotal: 260_000_000,
    investimentoPlanejado: 440_000_000,
    familiasAtendidas: 5_100,
    projetos: 24,
    eixos: ["Saúde", "Pesca", "Assistência Social"],
    acoes: ["Apoio a pescadores artesanais", "Recuperação costeira"],
    ucs: 1,
    terrasIndigenas: 0,
    areaRecuperarHa: 1_890,
  },
  {
    id: "3201605",
    name: "Conceição da Barra",
    mesorregiao: "litoral_norte",
    status: "investimento_planejado",
    investimentoTotal: 88_000_000,
    investimentoPlanejado: 155_000_000,
    familiasAtendidas: 2_900,
    projetos: 9,
    eixos: ["Pesca", "Ambiental"],
    acoes: ["Plano de uso sustentável da restinga"],
    ucs: 0,
    terrasIndigenas: 0,
    areaRecuperarHa: 980,
  },
  {
    id: "3200607",
    name: "Aracruz",
    mesorregiao: "litoral_norte",
    status: "investimento_aprovado",
    investimentoTotal: 180_000_000,
    investimentoPlanejado: 310_000_000,
    familiasAtendidas: 3_600,
    projetos: 16,
    eixos: ["Ambiental", "Fomento Econômico"],
    acoes: ["Recuperação de APP", "Agrofloresta"],
    ucs: 1,
    terrasIndigenas: 0,
    areaRecuperarHa: 1_450,
  },
  {
    id: "3202207",
    name: "Fundão",
    mesorregiao: "litoral_norte",
    status: "em_estudo",
    investimentoTotal: 48_000_000,
    investimentoPlanejado: 85_000_000,
    familiasAtendidas: 1_200,
    projetos: 5,
    eixos: ["Assistência Social", "Ambiental"],
    acoes: ["Diagnóstico socioambiental"],
    ucs: 0,
    terrasIndigenas: 0,
    areaRecuperarHa: 540,
  },
  {
    id: "3205014",
    name: "Sooretama",
    mesorregiao: "litoral_norte",
    status: "investimento_planejado",
    investimentoTotal: 98_000_000,
    investimentoPlanejado: 170_000_000,
    familiasAtendidas: 1_950,
    projetos: 10,
    eixos: ["Ambiental", "Povos Tradicionais"],
    acoes: ["Corredor ecológico Sooretama"],
    ucs: 2,
    terrasIndigenas: 0,
    areaRecuperarHa: 760,
  },
  {
    id: "3200805",
    name: "Baixo Guandu",
    mesorregiao: "noroeste",
    status: "em_andamento",
    investimentoTotal: 145_000_000,
    investimentoPlanejado: 250_000_000,
    familiasAtendidas: 2_800,
    projetos: 13,
    eixos: ["Fomento Econômico", "Saúde"],
    acoes: ["Recuperação de nascentes", "Assistência rural"],
    ucs: 0,
    terrasIndigenas: 0,
    areaRecuperarHa: 1_120,
  },
  {
    id: "3203353",
    name: "Marilândia",
    mesorregiao: "noroeste",
    status: "em_estudo",
    investimentoTotal: 52_000_000,
    investimentoPlanejado: 90_000_000,
    familiasAtendidas: 850,
    projetos: 4,
    eixos: ["Ambiental"],
    acoes: ["Mapeamento de áreas degradadas"],
    ucs: 0,
    terrasIndigenas: 0,
    areaRecuperarHa: 430,
  },
  {
    id: "3205006",
    name: "Serra",
    mesorregiao: "central",
    status: "investimento_aprovado",
    investimentoTotal: 220_000_000,
    investimentoPlanejado: 380_000_000,
    familiasAtendidas: 4_100,
    projetos: 20,
    eixos: ["Saúde", "Saneamento", "Ambiental"],
    acoes: ["Programa Especial de Saúde – Rio Doce"],
    ucs: 0,
    terrasIndigenas: 0,
    areaRecuperarHa: 870,
  },
  {
    id: "3200409",
    name: "Anchieta",
    mesorregiao: "central",
    status: "investimento_planejado",
    investimentoTotal: 64_000_000,
    investimentoPlanejado: 110_000_000,
    familiasAtendidas: 1_400,
    projetos: 7,
    eixos: ["Ambiental", "Infraestrutura"],
    acoes: ["Recuperação de praias e restingas"],
    ucs: 1,
    terrasIndigenas: 0,
    areaRecuperarHa: 620,
  },
]

export const globalKpis = {
  envelopeTotalES: 4_200_000_000,
  totalContratado: 2_850_000_000,
  investimentoRealizado: 1_340_000_000,
  metaAreaHa: 280_000,
  areaRecuperadaHa: 94_500,
  familiasBeneficiadas: 38_400,
  projetosAtivos: 312,
  projetosConcluidos: 87,
}

function matchesEixoTematico(municipalityEixos: string[], filter: string): boolean {
  if (filter === "todos") return true
  const keywords = EIXO_FILTER_KEYWORDS[filter] ?? []
  return municipalityEixos.some((eixo) =>
    keywords.some((kw) => eixo.toLowerCase().includes(kw.toLowerCase()))
  )
}

export function getMunicipalityById(id: string) {
  return municipalitiesData.find((m) => m.id === id)
}

export function getFilteredMunicipalities(filters: FilterState) {
  return municipalitiesData.filter((m) => {
    if (filters.mesorregiao !== "todas" && m.mesorregiao !== filters.mesorregiao) {
      return false
    }
    if (filters.municipio !== "todos" && m.id !== filters.municipio) {
      return false
    }
    if (!matchesEixoTematico(m.eixos, filters.eixoTematico)) {
      return false
    }
    if (filters.statusProjeto !== "todos" && m.status !== filters.statusProjeto) {
      return false
    }
    return true
  })
}

export function getRegionalSummary(
  filters: FilterState,
  selectedMunicipalityId?: string | null
) {
  if (selectedMunicipalityId) {
    const m = getMunicipalityById(selectedMunicipalityId)
    if (m) {
      return {
        regiao: m.name,
        status: projectStatusLabels[m.status],
        investimentoTotal: m.investimentoTotal,
        investimentoPlanejado: m.investimentoPlanejado,
        familiasAtendidas: m.familiasAtendidas,
        projetos: m.projetos,
        municipios: 1,
        ucs: m.ucs,
        terrasIndigenas: m.terrasIndigenas,
        acoes: m.acoes,
        eixos: m.eixos,
      }
    }
  }

  const filtered = getFilteredMunicipalities(filters)
  const regiaoLabel =
    filters.municipio !== "todos"
      ? municipiosAtingidos.find((m) => m.value === filters.municipio)?.label
      : filters.mesorregiao !== "todas"
        ? mesorregioes.find((m) => m.value === filters.mesorregiao)?.label
        : "Bacia do Rio Doce – Espírito Santo"

  return {
    regiao: regiaoLabel ?? "Espírito Santo",
    status:
      filtered.length > 0
        ? projectStatusLabels[filtered[0].status]
        : "Sem dados para os filtros",
    investimentoTotal: filtered.reduce((sum, m) => sum + m.investimentoTotal, 0),
    investimentoPlanejado: filtered.reduce(
      (sum, m) => sum + m.investimentoPlanejado,
      0
    ),
    familiasAtendidas: filtered.reduce((sum, m) => sum + m.familiasAtendidas, 0),
    projetos: filtered.reduce((sum, m) => sum + m.projetos, 0),
    municipios: filtered.length,
    ucs: filtered.reduce((sum, m) => sum + m.ucs, 0),
    terrasIndigenas: filtered.reduce((sum, m) => sum + m.terrasIndigenas, 0),
    acoes: Array.from(new Set(filtered.flatMap((m) => m.acoes))).slice(0, 3),
    eixos: Array.from(new Set(filtered.flatMap((m) => m.eixos))),
  }
}

export function getMunicipalityStatus(id: string): ProjectStatus {
  return getMunicipalityById(id)?.status ?? "nao_atingido"
}

export function getMunicipiosContempladosCount() {
  return municipalitiesData.filter((m) => m.status !== "nao_atingido").length
}

export function getTotalFamiliasAtendidas() {
  return municipalitiesData.reduce((sum, m) => sum + m.familiasAtendidas, 0)
}
