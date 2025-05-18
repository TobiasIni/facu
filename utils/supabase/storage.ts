import { createServerClient } from "./server"

export async function setupStorage() {
  const supabase = createServerClient()

  // Verificar si el bucket 'public' existe, si no, crearlo
  const { data: buckets } = await supabase.storage.listBuckets()

  if (!buckets?.find((bucket) => bucket.name === "public")) {
    const { error } = await supabase.storage.createBucket("public", {
      public: true,
      fileSizeLimit: 10485760, // 10MB
    })

    if (error) {
      console.error("Error al crear bucket:", error)
    } else {
      console.log('Bucket "public" creado correctamente')
    }
  }

  // Configurar políticas de acceso público para el bucket
  const { error: policyError } = await supabase.storage.from("public").getPublicUrl("test.txt")

  if (policyError) {
    // Crear política para permitir acceso público de lectura
    await supabase.storage.from("public").createSignedUrl("test.txt", 60)
  }
}
