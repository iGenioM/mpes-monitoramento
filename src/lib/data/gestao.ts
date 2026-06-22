export const gestaoKpis = {
  totalProjetos: 320,
  projetosEmExecucao: 285,
  beneficiarios: 7_132,
  areaCadastradaHa: 2_521.34,
  investimentoExecutado: 55_000_000,
  investimentoPrevisto: 65_000_000,
}

export const temasMapaGestao = [
  { value: "quantidade", label: "Quantidade de projetos" },
  { value: "investimento", label: "Valor investido" },
  { value: "beneficiarios", label: "Número de beneficiários" },
]

export const investimentoPorMunicipio = [
  { municipio: "Linhares", valor: 12.4, quantidade: 48 },
  { municipio: "Colatina", valor: 10.8, quantidade: 42 },
  { municipio: "São Mateus", valor: 9.6, quantidade: 38 },
  { municipio: "Serra", valor: 8.2, quantidade: 35 },
  { municipio: "Aracruz", valor: 6.5, quantidade: 28 },
  { municipio: "Baixo Guandu", valor: 5.1, quantidade: 22 },
  { municipio: "Sooretama", valor: 3.8, quantidade: 18 },
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
  { mes: "Jan", previsto: 4.2, executado: 3.8 },
  { mes: "Fev", previsto: 4.8, executado: 4.1 },
  { mes: "Mar", previsto: 5.1, executado: 4.6 },
  { mes: "Abr", previsto: 5.4, executado: 4.9 },
  { mes: "Mai", previsto: 5.8, executado: 5.2 },
  { mes: "Jun", previsto: 6.2, executado: 5.6 },
  { mes: "Jul", previsto: 6.5, executado: 5.9 },
  { mes: "Ago", previsto: 6.8, executado: 6.1 },
  { mes: "Set", previsto: 7.1, executado: 6.4 },
  { mes: "Out", previsto: 7.4, executado: 6.8 },
  { mes: "Nov", previsto: 7.8, executado: 7.1 },
  { mes: "Dez", previsto: 8.2, executado: 7.5 },
]

export const evolucaoAnual = [
  { ano: "2021", previsto: 42, executado: 38 },
  { ano: "2022", previsto: 48, executado: 44 },
  { ano: "2023", previsto: 55, executado: 49 },
  { ano: "2024", previsto: 62, executado: 54 },
  { ano: "2025", previsto: 65, executado: 55 },
]

export const projetosPorAnexo = [
  { anexo: "Anexo 9", quantidade: 85 },
  { anexo: "Anexo 11", quantidade: 72 },
  { anexo: "Anexo 12", quantidade: 58 },
  { anexo: "Anexo 14", quantidade: 45 },
  { anexo: "Anexo 15", quantidade: 38 },
  { anexo: "Outros", quantidade: 22 },
]

export const investimentoPorTipo = [
  { tipo: "Saneamento", valor: 14.2 },
  { tipo: "Infraestrutura", valor: 12.8 },
  { tipo: "Saúde", valor: 10.5 },
  { tipo: "Pesca", valor: 8.4 },
  { tipo: "Ambiental", valor: 7.6 },
  { tipo: "Assistência", valor: 5.9 },
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
    id: "anexo11",
    nome: "Anexo 11: Saneamento de Águas",
    valor: 17.44,
    percentual: "17,44",
    fill: "#ec4899",
  },
  {
    id: "anexo10",
    nome: "Anexo 10: Pesca",
    valor: 44.13,
    percentual: "44,13",
    fill: "#f97316",
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

export const gestaoProjetos = [
  {
    id: "g1",
    nome: "Projeto Nascentes do Rio Doce",
    instituicao: "FEST",
    tipologia: "Engenharia",
    contrato: "2024/00000002365",
    municipio: "Sooretama",
    investimento: 150_000,
    status: "em_execucao" as const,
  },
  {
    id: "g2",
    nome: "SAF Comunidade Quilombola",
    instituicao: "FEST",
    tipologia: "Assistência",
    contrato: "2025/00000001428",
    municipio: "Colatina",
    investimento: 80_000,
    status: "concluido" as const,
  },
  {
    id: "g3",
    nome: "Recuperação de Manguezais",
    instituicao: "IEMA",
    tipologia: "Infraestrutura",
    contrato: "2024/00000001892",
    municipio: "Linhares",
    investimento: 420_000,
    status: "em_execucao" as const,
  },
  {
    id: "g4",
    nome: "Programa Especial de Saúde",
    instituicao: "SES-ES",
    tipologia: "Análise",
    contrato: "2024/00000003107",
    municipio: "Serra",
    investimento: 1_200_000,
    status: "aprovado" as const,
  },
  {
    id: "g5",
    nome: "Apoio a Pescadores Artesanais",
    instituicao: "MPES",
    tipologia: "Assistência",
    contrato: "2025/00000000941",
    municipio: "São Mateus",
    investimento: 95_000,
    status: "em_execucao" as const,
  },
]

export const gestaoProjectPins: Array<{
  id: string
  name: string
  coords: [number, number]
  municipio: string
}> = [
  { id: "p1", name: "Projeto Nascentes do Rio Doce", coords: [-19.54, -40.67], municipio: "Sooretama" },
  { id: "p2", name: "SAF Comunidade Quilombola", coords: [-19.54, -40.67], municipio: "Colatina" },
  { id: "p3", name: "Recuperação de Manguezais", coords: [-19.38, -39.95], municipio: "Linhares" },
  { id: "p4", name: "Programa Especial de Saúde", coords: [-20.12, -40.31], municipio: "Serra" },
  { id: "p5", name: "Apoio a Pescadores", coords: [-18.72, -39.88], municipio: "São Mateus" },
  { id: "p6", name: "Renovação de Margens", coords: [-19.16, -40.88], municipio: "Baixo Guandu" },
  { id: "p7", name: "Agrofloresta Rio Doce", coords: [-19.82, -40.27], municipio: "Aracruz" },
]

export const mapaLegendaFaixas = [
  { faixa: "1-10", cor: "#dbeafe" },
  { faixa: "10-20", cor: "#93c5fd" },
  { faixa: "20-30", cor: "#60a5fa" },
  { faixa: "30-40", cor: "#2563eb" },
  { faixa: "40+", cor: "#1e3a8a" },
]
