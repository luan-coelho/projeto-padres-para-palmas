export const prerender = false

import type { APIRoute } from 'astro'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { isPostSocialImageAvailable } from '@/lib/post-images'
import { parsePostAttachments } from '@/lib/post-attachments'
import { verifyPostAttachmentBlobs } from '@/lib/post-attachments-server'

export const PUT: APIRoute = async ({ params, request, locals }) => {
  if (!locals.user) {
    return new Response('Não autorizado', { status: 401 })
  }

  const id = Number(params.id)
  if (isNaN(id)) {
    return new Response('ID inválido', { status: 400 })
  }

  const body = await request.json()
  const heroImage = typeof body.heroImage === 'string' ? body.heroImage.trim() || null : null
  const socialImage = typeof body.socialImage === 'string' ? body.socialImage.trim() || null : null
  const parsedAttachments = parsePostAttachments(body.attachments)

  if (!isPostSocialImageAvailable({ socialImage, heroImage, content: body.content || '' })) {
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

  const [updated] = await db
    .update(posts)
    .set({
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      authorName: body.authorName || undefined,
      heroImage,
      socialImage,
      attachments: verifiedAttachments.attachments,
      published: body.published ?? false,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning()

  if (!updated) {
    return new Response('Post não encontrado', { status: 404 })
  }

  return new Response(JSON.stringify(updated), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const DELETE: APIRoute = async ({ params, locals }) => {
  if (!locals.user) {
    return new Response('Não autorizado', { status: 401 })
  }

  const id = Number(params.id)
  if (isNaN(id)) {
    return new Response('ID inválido', { status: 400 })
  }

  const [deleted] = await db.delete(posts).where(eq(posts.id, id)).returning()

  if (!deleted) {
    return new Response('Post não encontrado', { status: 404 })
  }

  return new Response(null, { status: 204 })
}
