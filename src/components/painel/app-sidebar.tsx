"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconChartBar,
  IconChevronsLeft,
  IconChevronsRight,
  IconHome,
  IconPlus,
  IconScale,
} from "@tabler/icons-react"

import { useSidebar } from "@/components/painel/sidebar-provider"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/painel", label: "Início", icon: IconHome, exact: true },
  {
    href: "/painel/gestao",
    label: "Gestão e Monitoramento",
    icon: IconChartBar,
    exact: false,
  },
  {
    href: "/painel/novo-projeto",
    label: "Cadastrar Novo Projeto",
    icon: IconPlus,
    exact: false,
  },
]

function SidebarNavItem({
  href,
  label,
  icon: Icon,
  isActive,
  expanded,
}: {
  href: string
  label: string
  icon: typeof IconHome
  isActive: boolean
  expanded: boolean
}) {
  const link = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10",
        expanded ? "w-full" : "size-10 justify-center px-0",
        isActive && "bg-primary-foreground/20"
      )}
    >
      <Icon className="size-5 shrink-0" />
      {expanded ? (
        <span className="truncate">{label}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </Link>
  )

  if (expanded) return link

  return (
    <Tooltip>
      <TooltipTrigger
        render={link}
      />
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { expanded, toggle } = useSidebar()

  return (
    <aside
      className={cn(
        "hidden h-full shrink-0 flex-col border-r border-primary-foreground/15 bg-primary text-primary-foreground transition-[width] duration-200 ease-in-out lg:flex",
        expanded ? "w-56" : "w-16"
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-primary-foreground/15",
          expanded ? "justify-between px-3" : "justify-center"
        )}
      >
        <Link
          href="/painel"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15 text-primary-foreground"
        >
          <IconScale className="size-5" />
        </Link>
        {expanded ? (
          <div className="min-w-0 flex-1 pl-2">
            <p className="truncate text-sm font-semibold leading-tight">MPES</p>
            <p className="truncate text-[11px] text-primary-foreground/75">
              Rio Doce
            </p>
          </div>
        ) : null}
      </div>

      <nav
        className={cn(
          "flex flex-1 flex-col gap-1 p-2",
          expanded ? "items-stretch" : "items-center"
        )}
      >
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <SidebarNavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={isActive}
              expanded={expanded}
            />
          )
        })}
      </nav>

      <div className="border-t border-primary-foreground/15 p-2">
        {expanded ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="w-full justify-start gap-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <IconChevronsLeft className="size-4" />
            Recolher menu
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggle}
                  className="size-10 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  aria-label="Expandir menu"
                >
                  <IconChevronsRight className="size-5" />
                </Button>
              }
            />
            <TooltipContent side="right" sideOffset={8}>
              Expandir menu
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </aside>
  )
}
