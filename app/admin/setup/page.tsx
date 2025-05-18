import { setupStorage } from "@/utils/supabase/storage"
import { redirect } from "next/navigation"

export default async function SetupPage() {
  // Configurar el almacenamiento
  await setupStorage()

  // Redirigir al dashboard
  redirect("/admin/dashboard")

  // Esto nunca se renderiza debido al redirect
  return null
}
