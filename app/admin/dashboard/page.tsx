"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Calendar, FileText, Users, LogOut, Settings, Video } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Post {
  id: number
  title: string
  created_at: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    posts: 0,
    events: 0,
    messages: 0,
  })
  const [posts, setPosts] = useState<Post[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        router.push("/admin")
        return
      }

      setUser(session.user)
      setLoading(false)

      // Cargar estadísticas y posts
      await loadStats()
      await loadPosts()
    }

    checkUser()
  }, [])

  const loadStats = async () => {
    try {
      // Contar posts
      const { count: postsCount } = await supabase.from("blog_posts").select("*", { count: "exact", head: true })

      // Contar eventos
      const { count: eventsCount } = await supabase.from("eventos").select("*", { count: "exact", head: true })

      // Contar mensajes
      const { count: messagesCount } = await supabase.from("contactos").select("*", { count: "exact", head: true })

      setStats({
        posts: postsCount || 0,
        events: eventsCount || 0,
        messages: messagesCount || 0,
      })
    } catch (error) {
      console.error("Error al cargar estadísticas:", error)
    }
  }

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      const typedData = data?.map((post: any) => ({
        id: post.id as number,
        title: post.title as string,
        created_at: post.created_at as string
      })) || []
      setPosts(typedData)
    } catch (error) {
      console.error("Error al cargar posts:", error)
    }
  }

  const handleDeletePost = async () => {
    if (!postToDelete) return

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postToDelete)

      if (error) throw error

      // Actualizar la lista de posts y estadísticas
      await loadPosts()
      await loadStats()
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    } catch (error) {
      console.error("Error al eliminar el post:", error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/setup" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuración
            </Link>
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.posts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eventos Programados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.events}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mensajes Recibidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.messages}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="blog">
        <TabsList className="mb-6">
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Eventos
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Mensajes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestión del Blog</CardTitle>
                  <CardDescription>Administra los posts de tu blog</CardDescription>
                </div>
                <Button asChild className="flex items-center gap-2">
                  <Link href="/admin/dashboard/nuevo-post">
                    <PlusCircle className="h-4 w-4" />
                    Nuevo Post
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <div className="text-center p-12 border rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium mb-2">No hay posts disponibles</h3>
                  <p className="text-muted-foreground mb-4">Comienza a crear contenido para tu blog</p>
                  <Button asChild>
                    <Link href="/admin/dashboard/nuevo-post">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Crear primer post
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg divide-y">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Publicado el {new Date(post.created_at).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/editar-post/${post.id}`}>
                            Editar
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                          onClick={() => {
                            setPostToDelete(post.id)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestión de Videos TikTok</CardTitle>
                  <CardDescription>Administra los videos que aparecen en tu galería (máximo 3)</CardDescription>
                </div>
                <Button asChild className="flex items-center gap-2">
                  <Link href="/admin/dashboard/videos">
                    <Video className="h-4 w-4" />
                    Gestionar Videos
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 border rounded-lg bg-muted/50">
                <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Gestiona tus videos de TikTok</h3>
                <p className="text-muted-foreground mb-4">
                  Agrega, edita o elimina los videos que aparecen en la galería de tu sitio web
                </p>
                <Button asChild>
                  <Link href="/admin/dashboard/videos">
                    <Video className="h-4 w-4 mr-2" />
                    Ir a gestión de videos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestión de Eventos</CardTitle>
                  <CardDescription>Administra tus próximos shows y eventos</CardDescription>
                </div>
                <Button asChild className="flex items-center gap-2">
                  <Link href="/admin/dashboard/nuevo-evento">
                    <PlusCircle className="h-4 w-4" />
                    Nuevo Evento
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {stats.events === 0 ? (
                <div className="text-center p-12 border rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium mb-2">No hay eventos programados</h3>
                  <p className="text-muted-foreground mb-4">Añade tus próximos shows y eventos</p>
                  <Button asChild>
                    <Link href="/admin/dashboard/nuevo-evento">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Crear primer evento
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Show en Teatro Nacional</h3>
                      <p className="text-sm text-muted-foreground">20 de mayo de 2025, 20:00</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        Eliminar
                      </Button>
                    </div>
                  </div>
                  {/* Más eventos aquí */}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes de Contacto</CardTitle>
              <CardDescription>Revisa los mensajes recibidos a través del formulario de contacto</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.messages === 0 ? (
                <div className="text-center p-12 border rounded-lg bg-muted/50">
                  <h3 className="text-lg font-medium mb-2">No hay mensajes recibidos</h3>
                  <p className="text-muted-foreground">
                    Los mensajes enviados a través del formulario de contacto aparecerán aquí
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg divide-y">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Juan Pérez</h3>
                      <span className="text-xs text-muted-foreground">Hace 2 días</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">juan.perez@example.com</p>
                    <p className="text-sm font-medium mb-2">Consulta sobre shows privados</p>
                    <p className="text-sm">Hola, me gustaría contratar tus servicios para un evento corporativo...</p>
                  </div>
                  {/* Más mensajes aquí */}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
