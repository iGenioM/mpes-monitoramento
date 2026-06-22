import { AppSidebar } from "@/components/painel/app-sidebar"
import { SidebarProvider } from "@/components/painel/sidebar-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <TooltipProvider delay={200}>
        <div className="flex h-svh overflow-hidden">
          <AppSidebar />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}
