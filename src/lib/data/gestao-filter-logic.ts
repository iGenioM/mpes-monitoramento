import {
  defaultGestaoFilters,
  distribuicaoAnexo,
  distribuicaoTipologia,
  evolucaoAnual,
  evolucaoMensal,
  execucaoPorEixo,
  gestaoKpis,
  gestaoProjetos,
  investimentoPorMunicipio,
  investimentoPorTipo,
  MUNICIPIO_ID_TO_NAME,
  projetosPorAnexo,
  type GestaoFilterState,
  type GestaoProjeto,
  unidadesGestoras,
} from "@/lib/data/gestao"

export function isDefaultGestaoFilters(filters: GestaoFilterState): boolean {
  return (
    filters.municipio === defaultGestaoFilters.municipio &&
    filters.eixoTematico === defaultGestaoFilters.eixoTematico &&
    filters.unidadeGestora === defaultGestaoFilters.unidadeGestora &&
    filters.anexo === defaultGestaoFilters.anexo &&
    filters.periodo === defaultGestaoFilters.periodo
  )
}

export function filterGestaoProjetos(
  filters: GestaoFilterState,
  projetos: GestaoProjeto[] = gestaoProjetos
): GestaoProjeto[] {
  return projetos.filter((projeto) => {
    if (filters.municipio !== "todos" && projeto.municipioId !== filters.municipio) {
      return false
    }
    if (filters.eixoTematico !== "todos" && projeto.eixo !== filters.eixoTematico) {
      return false
    }
    if (
      filters.unidadeGestora !== "todos" &&
      projeto.instituicao !== filters.unidadeGestora
    ) {
      return false
    }
    if (filters.anexo !== "todos" && projeto.anexo !== filters.anexo) {
      return false
    }
    if (filters.periodo !== "todos" && projeto.periodo !== filters.periodo) {
      return false
    }
    return true
  })
}

function investRatio(filtered: GestaoProjeto[]): number {
  const total = gestaoProjetos.reduce((sum, p) => sum + p.investimento, 0)
  if (total === 0) return 0
  const partial = filtered.reduce((sum, p) => sum + p.investimento, 0)
  return partial / total
}

function scaleValue(value: number, ratio: number): number {
  return Math.round(value * ratio)
}

export type GestaoFilteredView = {
  kpis: typeof gestaoKpis
  investimentoPorMunicipio: typeof investimentoPorMunicipio
  execucaoPorEixo: typeof execucaoPorEixo
  evolucaoAnual: typeof evolucaoAnual
  evolucaoMensal: typeof evolucaoMensal
  projetosPorAnexo: typeof projetosPorAnexo
  investimentoPorTipo: typeof investimentoPorTipo
  unidadesGestoras: typeof unidadesGestoras
  distribuicaoAnexo: typeof distribuicaoAnexo
  distribuicaoTipologia: typeof distribuicaoTipologia
  projetos: GestaoProjeto[]
}

const ANEXO_LABELS: Record<string, string> = {
  anexo9: "Anexo 9",
  anexo10: "Anexo 10",
  anexo11: "Anexo 11",
  anexo12: "Anexo 12",
  outros: "Outros",
}

const EIXO_TO_TIPO: Record<string, string> = {
  Pesca: "Pesca",
  Saúde: "Saúde",
  Saneamento: "Saneamento",
  "Fomento Econômico": "Assistência",
  Infraestrutura: "Infraestrutura",
  Ambiental: "Ambiental",
  "Assistência Social": "Assistência",
  "Povos Tradicionais": "Assistência",
}

export function buildGestaoFilteredView(
  filters: GestaoFilterState
): GestaoFilteredView {
  const projetos = filterGestaoProjetos(filters)

  if (isDefaultGestaoFilters(filters)) {
    return {
      kpis: gestaoKpis,
      investimentoPorMunicipio,
      execucaoPorEixo,
      evolucaoAnual,
      evolucaoMensal,
      projetosPorAnexo,
      investimentoPorTipo,
      unidadesGestoras,
      distribuicaoAnexo,
      distribuicaoTipologia,
      projetos,
    }
  }

  const ratio = investRatio(projetos)
  const emExecucao = projetos.filter((p) => p.status === "em_execucao").length
  const concluidos = projetos.filter((p) => p.status === "concluido").length
  const emAnalise = projetos.filter((p) => p.status === "em_analise").length
  const totalInvestimento = projetos.reduce((sum, p) => sum + p.investimento, 0)

  const kpis = {
    totalProjetos: scaleValue(gestaoKpis.totalProjetos, ratio),
    projetosEmExecucao: scaleValue(gestaoKpis.projetosEmExecucao, emExecucao / Math.max(gestaoProjetos.filter((p) => p.status === "em_execucao").length, 1)),
    projetosConcluidos: scaleValue(gestaoKpis.projetosConcluidos, concluidos / Math.max(gestaoProjetos.filter((p) => p.status === "concluido").length, 1)),
    projetosEmAnalise: scaleValue(gestaoKpis.projetosEmAnalise, emAnalise / Math.max(gestaoProjetos.filter((p) => p.status === "em_analise").length, 1)),
    beneficiarios: scaleValue(gestaoKpis.beneficiarios, ratio),
    areaCadastradaHa: scaleValue(gestaoKpis.areaCadastradaHa, ratio),
    investimentoExecutado: scaleValue(gestaoKpis.investimentoExecutado, ratio),
    investimentoPrevisto: scaleValue(gestaoKpis.investimentoPrevisto, ratio),
    envelopeTotal: gestaoKpis.envelopeTotal,
  }

  const municipioAgg = new Map<string, { valor: number; quantidade: number }>()
  for (const projeto of projetos) {
    const current = municipioAgg.get(projeto.municipio) ?? { valor: 0, quantidade: 0 }
    municipioAgg.set(projeto.municipio, {
      valor: current.valor + projeto.investimento / 1_000_000,
      quantidade: current.quantidade + 1,
    })
  }

  let filteredInvestimentoPorMunicipio = investimentoPorMunicipio
    .map((item) => {
      const agg = municipioAgg.get(item.municipio)
      if (!agg) return null
      return { municipio: item.municipio, valor: Math.round(agg.valor), quantidade: agg.quantidade }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  if (filters.municipio !== "todos") {
    const nome = MUNICIPIO_ID_TO_NAME[filters.municipio]
    filteredInvestimentoPorMunicipio = filteredInvestimentoPorMunicipio.filter(
      (item) => item.municipio === nome
    )
  }

  let filteredExecucaoPorEixo = execucaoPorEixo
  if (filters.eixoTematico !== "todos") {
    filteredExecucaoPorEixo = execucaoPorEixo.filter(
      (item) => item.eixo === filters.eixoTematico
    )
  } else if (ratio < 1) {
    filteredExecucaoPorEixo = execucaoPorEixo.map((item) => ({
      ...item,
      contratado: Math.round(item.contratado * ratio),
      executado: Math.round(item.executado * ratio),
    }))
  }

  let filteredEvolucaoAnual = evolucaoAnual
  if (filters.periodo !== "todos") {
    filteredEvolucaoAnual = evolucaoAnual.filter(
      (item) => item.ano === filters.periodo
    )
  } else if (ratio < 1) {
    filteredEvolucaoAnual = evolucaoAnual.map((item) => ({
      ...item,
      previsto: Math.round(item.previsto * ratio * 100) / 100,
      executado: Math.round(item.executado * ratio * 100) / 100,
    }))
  }

  let filteredEvolucaoMensal = evolucaoMensal
  if (ratio < 1) {
    filteredEvolucaoMensal = evolucaoMensal.map((item) => ({
      ...item,
      previsto: Math.round(item.previsto * ratio),
      executado: Math.round(item.executado * ratio),
    }))
  }

  const anexoAgg = new Map<string, number>()
  for (const projeto of projetos) {
    anexoAgg.set(projeto.anexo, (anexoAgg.get(projeto.anexo) ?? 0) + 1)
  }

  let filteredProjetosPorAnexo = projetosPorAnexo
    .map((item) => {
      const key = item.anexo.toLowerCase().replace(" ", "")
      const match = [...anexoAgg.entries()].find(([anexoKey]) =>
        item.anexo.toLowerCase().includes(anexoKey.replace("anexo", "anexo "))
      )
      if (filters.anexo !== "todos") {
        const label = ANEXO_LABELS[filters.anexo]
        if (!item.anexo.startsWith(label?.split(" ")[0] ?? "")) {
          if (filters.anexo === "outros" && item.anexo !== "Outros") return null
          if (filters.anexo !== "outros" && !item.anexo.toLowerCase().includes(filters.anexo.replace("anexo", "anexo "))) {
            return null
          }
        }
      }
      const qty = match?.[1] ?? Math.round(item.quantidade * ratio)
      return { anexo: item.anexo, quantidade: qty }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  if (anexoAgg.size > 0) {
    filteredProjetosPorAnexo = [...anexoAgg.entries()].map(([anexo, quantidade]) => ({
      anexo: ANEXO_LABELS[anexo] ?? anexo,
      quantidade,
    }))
  }

  const tipoAgg = new Map<string, number>()
  for (const projeto of projetos) {
    const tipo = EIXO_TO_TIPO[projeto.eixo] ?? "Assistência"
    tipoAgg.set(tipo, (tipoAgg.get(tipo) ?? 0) + projeto.investimento / 1_000_000)
  }

  let filteredInvestimentoPorTipo = investimentoPorTipo
    .map((item) => {
      const valor = tipoAgg.get(item.tipo)
      if (valor === undefined && ratio < 1) {
        return { ...item, valor: Math.round(item.valor * ratio) }
      }
      if (valor === undefined) return null
      return { tipo: item.tipo, valor: Math.round(valor) }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  if (tipoAgg.size > 0) {
    filteredInvestimentoPorTipo = [...tipoAgg.entries()].map(([tipo, valor]) => ({
      tipo,
      valor: Math.round(valor),
    }))
  }

  let filteredUnidades = unidadesGestoras
  if (filters.unidadeGestora !== "todos") {
    filteredUnidades = unidadesGestoras.filter(
      (ug) => ug.nome === filters.unidadeGestora
    )
  } else if (ratio < 1) {
    filteredUnidades = unidadesGestoras.map((ug) => ({
      ...ug,
      projetos: Math.max(1, Math.round(ug.projetos * ratio)),
      investimentoPrevisto: Math.round(ug.investimentoPrevisto * ratio),
      investimentoExecutado: Math.round(ug.investimentoExecutado * ratio),
    }))
  }

  let filteredDistribuicaoAnexo = distribuicaoAnexo
  if (filters.anexo !== "todos") {
    filteredDistribuicaoAnexo = distribuicaoAnexo.filter((item) =>
      item.id.toLowerCase().includes(filters.anexo)
    )
  }

  const filteredDistribuicaoTipologia =
    ratio < 1
      ? distribuicaoTipologia.map((item) => ({
          ...item,
          valor: Math.round(item.valor * ratio * 100) / 100,
        }))
      : distribuicaoTipologia

  // Refine KPI counts from filtered sample when small set
  if (projetos.length > 0 && projetos.length < gestaoProjetos.length) {
    kpis.totalProjetos = Math.max(
      projetos.length,
      scaleValue(gestaoKpis.totalProjetos, ratio)
    )
    kpis.projetosEmExecucao = Math.max(emExecucao, kpis.projetosEmExecucao)
    kpis.projetosConcluidos = Math.max(concluidos, kpis.projetosConcluidos)
    kpis.projetosEmAnalise = Math.max(emAnalise, kpis.projetosEmAnalise)
    kpis.investimentoPrevisto = Math.max(
      totalInvestimento,
      kpis.investimentoPrevisto
    )
    kpis.investimentoExecutado = Math.round(
      totalInvestimento * (gestaoKpis.investimentoExecutado / gestaoKpis.investimentoPrevisto)
    )
  }

  return {
    kpis,
    investimentoPorMunicipio:
      filteredInvestimentoPorMunicipio.length > 0
        ? filteredInvestimentoPorMunicipio
        : investimentoPorMunicipio,
    execucaoPorEixo:
      filteredExecucaoPorEixo.length > 0 ? filteredExecucaoPorEixo : execucaoPorEixo,
    evolucaoAnual:
      filteredEvolucaoAnual.length > 0 ? filteredEvolucaoAnual : evolucaoAnual,
    evolucaoMensal: filteredEvolucaoMensal,
    projetosPorAnexo:
      filteredProjetosPorAnexo.length > 0
        ? filteredProjetosPorAnexo
        : projetosPorAnexo,
    investimentoPorTipo:
      filteredInvestimentoPorTipo.length > 0
        ? filteredInvestimentoPorTipo
        : investimentoPorTipo,
    unidadesGestoras: filteredUnidades,
    distribuicaoAnexo: filteredDistribuicaoAnexo,
    distribuicaoTipologia: filteredDistribuicaoTipologia,
    projetos,
  }
}
