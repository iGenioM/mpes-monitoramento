import type { Metadata } from "next"

import { NovoProjetoForm } from "@/components/painel/novo-projeto-form"
import { PainelShell } from "@/components/painel/painel-shell"

export const metadata: Metadata = {
  title: "Cadastrar Projeto | MPES",
  description:
    "Formulário de cadastro e análise de projetos na Bacia do Rio Doce.",
}

export default function NovoProjetoPage() {
  return (
    <PainelShell
      title="Análise de Projetos"
      subtitle="Cadastro e análise de projetos — Bacia do Rio Doce"
    >
      <NovoProjetoForm />
    </PainelShell>
  )
}
