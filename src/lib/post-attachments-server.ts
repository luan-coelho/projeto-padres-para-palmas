import { head } from '@vercel/blob'
import type { PostAttachment } from './post-attachments'

type VerifyAttachmentsResult =
  | { ok: true; attachments: PostAttachment[] }
  | { ok: false; error: string }

export async function verifyPostAttachmentBlobs(
  attachments: PostAttachment[],
  token: string | undefined,
): Promise<VerifyAttachmentsResult> {
  if (attachments.length === 0) return { ok: true, attachments: [] }
  if (!token) {
    return { ok: false, error: 'Vercel Blob não configurado para validar os materiais' }
  }

  try {
    const blobs = await Promise.all(
      attachments.map(attachment => head(attachment.url, { token })),
    )

    const verifiedAttachments = attachments.map((attachment, index) => {
      const blob = blobs[index]

      if (
        !blob.pathname.startsWith('blog/attachments/') ||
        blob.contentType !== attachment.contentType ||
        blob.size !== attachment.size
      ) {
        throw new Error('Metadados do arquivo não correspondem ao Blob')
      }

      return {
        ...attachment,
        downloadUrl: blob.downloadUrl,
      }
    })

    return { ok: true, attachments: verifiedAttachments }
  } catch {
    return {
      ok: false,
      error: 'Não foi possível validar um ou mais materiais complementares',
    }
  }
}
