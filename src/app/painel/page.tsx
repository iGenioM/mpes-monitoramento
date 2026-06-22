import type { Metadata } from "next"

import { PainelDashboard } from "@/components/painel/painel-dashboard"
import { PainelShell } from "@/components/painel/painel-shell"

export const metadata: Metadata = {
  title: "Central MPES | Monitoramento Rio Doce",
  description:
    "Central de monitoramento de contratos e projetos da Bacia do Rio Doce.",
}

export default function PainelPage() {
  return (
    <PainelShell
      title="Central do Ministério Público do ES"
      subtitle="Monitoramento de contratos e projetos — Bacia do Rio Doce"
    >
      <PainelDashboard />
    </PainelShell>
  )
}
