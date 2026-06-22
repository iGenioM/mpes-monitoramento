"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type SidebarContextValue = {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

const STORAGE_KEY = "mpes-painel-sidebar-expanded"

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpandedState] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      setExpandedState(stored === "true")
    }
    setHydrated(true)
  }, [])

  const setExpanded = (value: boolean) => {
    setExpandedState(value)
    localStorage.setItem(STORAGE_KEY, String(value))
  }

  const toggle = () => setExpanded(!expanded)

  return (
    <SidebarContext.Provider
      value={{
        expanded: hydrated ? expanded : false,
        setExpanded,
        toggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar deve ser usado dentro de SidebarProvider")
  }
  return context
}
