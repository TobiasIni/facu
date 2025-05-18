import { createClient } from "@supabase/supabase-js"

export function createServerClient() {
  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.")
    
    // Return a mock client for development so the app doesn't crash
    if (process.env.NODE_ENV === 'development') {
      console.warn("Returning a mock Supabase client for development")
      return {
        from: () => ({
          select: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
            eq: () => Promise.resolve({ data: null, error: null }),
            single: () => Promise.resolve({ data: null, error: null })
          }),
          insert: () => Promise.resolve({ error: null })
        })
      }
    }
    
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseKey)
}
