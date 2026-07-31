export const prerender = false

import type { APIRoute } from 'astro'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { db } from '@/db'
import { allowedEmails } from '@/db/schema'
import { eq } from 'drizzle-orm'
import {
  ALLOWED_ATTACHMENT_CONTENT_TYPES,
  MAX_ATTACHMENT_SIZE_IN_BYTES,
} from '@/lib/post-attachments'

const BLOG_ATTACHMENT_PATHNAME = /^blog\/attachments\/[a-z0-9][a-z0-9._-]{0,199}$/

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
          throw new UploadRequestError('Usuário sem permissão para enviar arquivos.', 403)
        }

        if (!BLOG_ATTACHMENT_PATHNAME.test(pathname)) {
          throw new UploadRequestError('Caminho do arquivo inválido.', 400)
        }

        return {
          allowedContentTypes: [...ALLOWED_ATTACHMENT_CONTENT_TYPES],
          maximumSizeInBytes: MAX_ATTACHMENT_SIZE_IN_BYTES,
          addRandomSuffix: true,
          cacheControlMaxAge: 31_536_000,
        }
      },
    })

    return Response.json(response)
  } catch (error) {
    if (error instanceof UploadRequestError) {
      return Response.json({ error: error.message }, { status: error.status })
    }

    console.error('Falha ao gerar autorização de upload de material complementar:', error)
    return Response.json(
      { error: 'Não foi possível autorizar o envio do arquivo.' },
      { status: 500 }
    )
  }
}
