import { AppHeader } from "@/components/painel/app-header"

type PainelShellProps = {
  title: string
  subtitle: string
  notificationsCount?: number
  children: React.ReactNode
}

export function PainelShell({
  title,
  subtitle,
  notificationsCount,
  children,
}: PainelShellProps) {
  return (
    <>
      <AppHeader
        title={title}
        subtitle={subtitle}
        notificationsCount={notificationsCount}
      />
      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </>
  )
}
