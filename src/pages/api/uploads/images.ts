export const prerender = false

import type { APIRoute } from 'astro'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { db } from '@/db'
import { allowedEmails } from '@/db/schema'
import { eq } from 'drizzle-orm'

const MAX_IMAGE_SIZE_IN_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const BLOG_IMAGE_PATHNAME = /^blog\/(?:content|covers)\/[a-z0-9][a-z0-9._-]{0,199}$/

class UploadRequestError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
  }
}

export const POST: APIRoute = async ({ request, locals }) => {
  const token = import.meta.env.BLOB_READ_WRITE_TOKEN

  if (!token) {
    return Response.json(
      { error: 'Vercel Blob não configurado. Conecte um Blob público ao projeto.' },
      { status: 503 }
    )
  }

  let body: HandleUploadBody

  try {
    body = (await request.json()) as HandleUploadBody
  } catch {
    return Response.json({ error: 'Requisição de upload inválida.' }, { status: 400 })
  }

  try {
    const response = await handleUpload({
      body,
      request,
      token,
      onBeforeGenerateToken: async pathname => {
        if (!locals.user) {
          throw new UploadRequestError('Não autorizado.', 401)
        }

        const [allowedUser] = await db
          .select({ id: allowedEmails.id })
          .from(allowedEmails)
          .where(eq(allowedEmails.email, locals.user.email))
          .limit(1)

        if (!allowedUser) {
          throw new UploadRequestError('Usuário sem permissão para enviar imagens.', 403)
        }

        if (!BLOG_IMAGE_PATHNAME.test(pathname)) {
          throw new UploadRequestError('Caminho da imagem inválido.', 400)
        }

        return {
          allowedContentTypes: ALLOWED_IMAGE_CONTENT_TYPES,
          maximumSizeInBytes: MAX_IMAGE_SIZE_IN_BYTES,
          addRandomSuffix: true,
          cacheControlMaxAge: 31_536_000
        }
      }
    })

    return Response.json(response)
  } catch (error) {
    if (error instanceof UploadRequestError) {
      return Response.json({ error: error.message }, { status: error.status })
    }

    console.error('Falha ao gerar autorização de upload do Vercel Blob:', error)
    return Response.json(
      { error: 'Não foi possível autorizar o envio da imagem.' },
      { status: 500 }
    )
  }
}
