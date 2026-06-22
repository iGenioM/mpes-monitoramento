import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PainelShell } from "@/components/painel/painel-shell"
import { ProjetoDetalheView } from "@/components/painel/projeto-detalhe-view"
import { getProjetoDetalhe } from "@/lib/data/projeto-detalhe"

type ProjetoPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: ProjetoPageProps): Promise<Metadata> {
  const { id } = await params
  const projeto = getProjetoDetalhe(id)

  return {
    title: projeto
      ? `${projeto.nome} | Detalhes do Contrato`
      : "Projeto não encontrado | MPES",
    description: "Visualização detalhada do contrato e execução do projeto.",
  }
}

export default async function ProjetoDetalhePage({ params }: ProjetoPageProps) {
  const { id } = await params
  const projeto = getProjetoDetalhe(id)

  if (!projeto) {
    notFound()
  }

  return (
    <PainelShell
      title="Central do Ministério Público do ES"
      subtitle="Monitoramento de contratos e projetos — Bacia do Rio Doce"
    >
      <ProjetoDetalheView projeto={projeto} />
    </PainelShell>
  )
}
