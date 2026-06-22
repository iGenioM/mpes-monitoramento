import type { Metadata } from "next"

import { LoginForm } from "@/components/auth/login-form"
import { SiteHeader } from "@/components/portal/site-header"

export const metadata: Metadata = {
  title: "Login | MPES Monitoramento Rio Doce",
  description: "Acesso ao sistema de monitoramento da recuperação do Rio Doce.",
}

export default function LoginPage() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <LoginForm />
      </main>
    </>
  )
}
