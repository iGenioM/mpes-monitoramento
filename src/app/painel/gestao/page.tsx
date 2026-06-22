import type { Metadata } from "next"

import { GestaoDashboard } from "@/components/painel/gestao-dashboard"
import { PainelShell } from "@/components/painel/painel-shell"

export const metadata: Metadata = {
  title: "Gestão e Monitoramento de Contratos | MPES",
  description:
    "Painel de gestão e monitoramento de contratos da Bacia do Rio Doce.",
}

export default function GestaoPage() {
  return (
    <PainelShell
      title="Gestão e Monitoramento de Contratos"
      subtitle="Indicadores, gráficos e mapa de projetos — Bacia do Rio Doce"
      notificationsCount={0}
    >
      <GestaoDashboard />
    </PainelShell>
  )
}
