import { AppThemeProvider } from "@/components/AppThemeProvider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppThemeProvider>{children}</AppThemeProvider>
}
