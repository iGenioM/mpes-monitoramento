"use client"

import Link from "next/link"
import {
  IconBell,
  IconChevronDown,
  IconLogout,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AppHeaderProps = {
  title?: string
  subtitle?: string
  notificationsCount?: number
}

export function AppHeader({
  title = "Central do Ministério Público do ES",
  subtitle = "Monitoramento de contratos e projetos — Bacia do Rio Doce",
  notificationsCount = 0,
}: AppHeaderProps) {
  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
      <div>
        <h1 className="text-base font-semibold sm:text-lg">{title}</h1>
        <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Notificações"
          className="relative"
        >
          <IconBell className="size-4" />
          <Badge className="absolute -top-1.5 -right-1.5 size-5 justify-center rounded-full px-0 text-[10px]">
            {notificationsCount}
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="gap-2 pl-2">
                <Avatar size="sm">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">Matheus Coutinho</span>
                <IconChevronDown className="size-4 text-muted-foreground" />
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Matheus Coutinho</DropdownMenuLabel>
              <DropdownMenuItem
                variant="destructive"
                render={
                  <Link href="/">
                    <IconLogout className="size-4" />
                    Sair
                  </Link>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
