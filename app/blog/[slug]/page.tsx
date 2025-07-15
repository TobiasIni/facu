import { createServerClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  title: string
  content: string
  featured_image: string
  created_at: string
  author: string
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient()

  // Obtener el post específico por slug
  const { data: post, error } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single()

  if (error || !post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.created_at}>
            {format(new Date(post.created_at), "d 'de' MMMM 'de' yyyy", { locale: es })}
          </time>
        </div>

        {post.featured_image && (
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image src={post.featured_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  )
}
