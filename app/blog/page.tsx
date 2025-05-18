import { createServerClient } from "@/utils/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  title: string
  excerpt: string
  featured_image: string
  created_at: string
  slug: string
}

export default async function BlogPage() {
  let posts = [];
  let error = null;
  
  try {
    const supabase = createServerClient();
    
    if (supabase) {
      // Obtener los posts del blog desde Supabase
      const response = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      posts = response.data || [];
      error = response.error;
    }
  } catch (err) {
    console.error("Error al inicializar Supabase:", err);
    error = err;
  }

  if (error) {
    console.error("Error al cargar los posts:", error);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>

      {!posts || posts.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/50 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">No hay posts disponibles</h2>
          <p className="text-muted-foreground mb-6">Pronto publicaremos contenido interesante. ¡Vuelve a visitarnos!</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={post.featured_image || "/placeholder.svg?height=400&width=600"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                    locale: es,
                  })}
                </span>
                <Button asChild>
                  <Link href={`/blog/${post.slug}`}>Leer más</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
