export const prerender = false

import type { APIRoute } from 'astro'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { desc } from 'drizzle-orm'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const GET: APIRoute = async ({ locals }) => {
  if (!locals.user) {
    return new Response('Não autorizado', { status: 401 })
  }

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt))

  return new Response(JSON.stringify(allPosts), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!locals.user) {
    return new Response('Não autorizado', { status: 401 })
  }

  const body = await request.json()

  if (!body.title || !body.description || !body.content) {
    return new Response('Campos obrigatórios: title, description, content', { status: 400 })
  }

  const slug = generateSlug(body.title)

  const [newPost] = await db
    .insert(posts)
    .values({
      title: body.title,
      slug,
      description: body.description,
      content: body.content,
      authorId: locals.user.id,
      authorName: body.authorName || locals.user.name || 'Projeto Padres para a Igreja de Palmas',
      heroImage: body.heroImage || null,
      published: body.published ?? false,
    })
    .returning()

  return new Response(JSON.stringify(newPost), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
