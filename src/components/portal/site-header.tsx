import Link from "next/link"
import { IconScale } from "@tabler/icons-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Início" },
  { href: "/#mapas", label: "Mapas" },
  { href: "/#indicadores", label: "Indicadores" },
  { href: "#", label: "Documentos" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconScale className="size-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-none">MPES</p>
            <p className="text-xs text-muted-foreground">
              Monitoramento Rio Doce
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/login" className={cn(buttonVariants({ size: "sm" }))}>
          Entrar
        </Link>
      </div>
    </header>
  )
}
