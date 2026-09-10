export const prerender = false

import type { APIRoute } from 'astro'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import {
  DEFAULT_POST_IMAGE_POSITION,
  isPostImagePosition,
  isPostSocialImageAvailable,
} from '@/lib/post-images'
import { parsePostAttachments } from '@/lib/post-attachments'
import { verifyPostAttachmentBlobs } from '@/lib/post-attachments-server'

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
  const heroImage = typeof body.heroImage === 'string' ? body.heroImage.trim() || null : null
  const heroImagePositionX = body.heroImagePositionX ?? DEFAULT_POST_IMAGE_POSITION
  const heroImagePositionY = body.heroImagePositionY ?? DEFAULT_POST_IMAGE_POSITION
  const socialImage = typeof body.socialImage === 'string' ? body.socialImage.trim() || null : null
  const parsedAttachments = parsePostAttachments(body.attachments)

  if (!isPostImagePosition(heroImagePositionX) || !isPostImagePosition(heroImagePositionY)) {
    return new Response('A posição da imagem de capa deve estar entre 0 e 100', { status: 400 })
  }

  if (!isPostSocialImageAvailable({ socialImage, heroImage, content: body.content })) {
    return new Response('A imagem de compartilhamento deve pertencer ao post', { status: 400 })
  }

  if (!parsedAttachments.ok) {
    return new Response(parsedAttachments.error, { status: 400 })
  }

  const verifiedAttachments = await verifyPostAttachmentBlobs(
    parsedAttachments.attachments,
    import.meta.env.BLOB_READ_WRITE_TOKEN,
  )
  if (!verifiedAttachments.ok) {
    return new Response(verifiedAttachments.error, { status: 400 })
  }

  const [newPost] = await db
    .insert(posts)
    .values({
      title: body.title,
      slug,
      description: body.description,
      content: body.content,
      authorId: locals.user.id,
      authorName: body.authorName || locals.user.name || 'Projeto Padres para a Igreja de Palmas',
      heroImage,
      heroImagePositionX,
      heroImagePositionY,
      socialImage,
      attachments: verifiedAttachments.attachments,
      published: body.published ?? false,
    })
    .returning()

  return new Response(JSON.stringify(newPost), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
