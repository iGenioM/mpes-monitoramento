import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto flex  flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Ministério Público do Estado do Espírito Santo</p>
            <p className="text-sm text-muted-foreground">
              Portal de monitoramento da recuperação da Bacia do Rio Doce
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>contato@mpes.mp.br</p>
            <p>Vitória – ES</p>
          </div>
        </div>
        <Separator />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} MPES. Dados referentes aos 11 municípios
          capixabas reconhecidos no Acordo de Reparação do desastre de Mariana.
        </p>
      </div>
    </footer>
  )
}
