import { PortalDashboard } from "@/components/portal/portal-dashboard"
import { SiteFooter } from "@/components/portal/site-footer"
import { SiteHeader } from "@/components/portal/site-header"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full  flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <PortalDashboard />
      </main>
      <SiteFooter />
    </>
  )
}
