export type ProjectStatus =
  | "em_andamento"
  | "investimento_aprovado"
  | "investimento_planejado"
  | "em_estudo"
  | "nao_atingido"

export type FilterState = {
  mesorregiao: string
  estado: string
  municipio: string
  bioma: string
  degradacaoPastagem: string
  territorioEspecial: string
  vegetacaoNativa: string
  areaAtendida: string
}

export const defaultFilters: FilterState = {
  mesorregiao: "todas",
  estado: "es",
  municipio: "todos",
  bioma: "todos",
  degradacaoPastagem: "todos",
  territorioEspecial: "todos",
  vegetacaoNativa: "todos",
  areaAtendida: "todos",
}

export const mesorregioes = [
  { value: "todas", label: "Todas as mesorregiões" },
  { value: "litoral_norte", label: "Litoral Norte Espírito-Santense" },
  { value: "noroeste", label: "Noroeste Espírito-Santense" },
  { value: "central", label: "Central Espírito-Santense" },
]

export const estados = [{ value: "es", label: "Espírito Santo" }]

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

export const biomas = [
  { value: "todos", label: "Todos os biomas" },
  { value: "mata_atlantica", label: "Mata Atlântica" },
  { value: "restinga", label: "Restinga" },
  { value: "manguezal", label: "Manguezal" },
  { value: "transicao", label: "Transição Mata Atlântica / Restinga" },
]

export const degradacaoPastagem = [
  { value: "todos", label: "Todos os graus" },
  { value: "baixo", label: "Baixo (0–25%)" },
  { value: "medio", label: "Médio (26–50%)" },
  { value: "alto", label: "Alto (51–75%)" },
  { value: "muito_alto", label: "Muito alto (>75%)" },
]

export const territoriosEspeciais = [
  { value: "todos", label: "Todos os territórios" },
  { value: "uc", label: "Unidades de Conservação" },
  { value: "ti", label: "Terras Indígenas" },
  { value: "quilombola", label: "Territórios Quilombolas" },
  { value: "apa", label: "Área de Proteção Ambiental" },
]

export const vegetacaoNativa = [
  { value: "todos", label: "Todos os remanescentes" },
  { value: "alto", label: "Alto remanescente (>60%)" },
  { value: "medio", label: "Médio remanescente (30–60%)" },
  { value: "baixo", label: "Baixo remanescente (<30%)" },
  { value: "critico", label: "Crítico (<10%)" },
]

export const areasAtendidas = [
  { value: "todos", label: "Todas as áreas" },
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
    investimentoTotal: 15_000_000,
    investimentoPlanejado: 28_000_000,
    familiasAtendidas: 420,
    projetos: 6,
    eixos: ["Saúde", "Pesca", "Produtivo"],
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
    investimentoTotal: 22_500_000,
    investimentoPlanejado: 35_000_000,
    familiasAtendidas: 680,
    projetos: 8,
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
    investimentoTotal: 18_700_000,
    investimentoPlanejado: 42_000_000,
    familiasAtendidas: 510,
    projetos: 7,
    eixos: ["Saúde", "Pesca", "Assistência"],
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
    investimentoTotal: 8_200_000,
    investimentoPlanejado: 19_500_000,
    familiasAtendidas: 290,
    projetos: 4,
    eixos: ["Pesca", "Turismo", "Ambiental"],
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
    investimentoTotal: 12_400_000,
    investimentoPlanejado: 24_000_000,
    familiasAtendidas: 360,
    projetos: 5,
    eixos: ["Ambiental", "Produtivo"],
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
    investimentoTotal: 3_100_000,
    investimentoPlanejado: 11_000_000,
    familiasAtendidas: 120,
    projetos: 2,
    eixos: ["Assistência", "Ambiental"],
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
    investimentoTotal: 6_800_000,
    investimentoPlanejado: 14_200_000,
    familiasAtendidas: 95,
    projetos: 3,
    eixos: ["Ambiental", "Turismo"],
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
    investimentoTotal: 9_600_000,
    investimentoPlanejado: 21_000_000,
    familiasAtendidas: 280,
    projetos: 4,
    eixos: ["Produtivo", "Saúde"],
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
    investimentoTotal: 2_400_000,
    investimentoPlanejado: 8_500_000,
    familiasAtendidas: 85,
    projetos: 2,
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
    investimentoTotal: 14_900_000,
    investimentoPlanejado: 31_000_000,
    familiasAtendidas: 410,
    projetos: 6,
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
    investimentoTotal: 5_500_000,
    investimentoPlanejado: 12_800_000,
    familiasAtendidas: 140,
    projetos: 3,
    eixos: ["Ambiental", "Turismo"],
    acoes: ["Recuperação de praias e restingas"],
    ucs: 1,
    terrasIndigenas: 0,
    areaRecuperarHa: 620,
  },
]

export const globalKpis = {
  metaAreaHa: 500_000,
  areaRecuperadaHa: 210_987,
  metaInvestimento: 180_000_000,
  investimentoRealizado: 12_345_587,
  imoveis: 4_128,
  areaImoveisHa: 32_469,
  projetosApoiados: 125,
  especiesUtilizadas: 49,
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
    if (filters.areaAtendida !== "todos" && m.status !== filters.areaAtendida) {
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
