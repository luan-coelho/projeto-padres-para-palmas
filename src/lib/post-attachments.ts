export const MAX_ATTACHMENT_SIZE_IN_BYTES = 20 * 1024 * 1024
export const MAX_ATTACHMENTS_PER_POST = 12

export const ALLOWED_ATTACHMENT_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
] as const

export type AttachmentContentType = (typeof ALLOWED_ATTACHMENT_CONTENT_TYPES)[number]

export interface PostAttachment {
  name: string
  url: string
  downloadUrl: string
  contentType: AttachmentContentType
  size: number
}

type ParseAttachmentsResult =
  | { ok: true; attachments: PostAttachment[] }
  | { ok: false; error: string }

const BLOB_HOSTNAME_PATTERN = /^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/i
const ALLOWED_CONTENT_TYPES = new Set<string>(ALLOWED_ATTACHMENT_CONTENT_TYPES)

function isValidBlobUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && BLOB_HOSTNAME_PATTERN.test(url.hostname)
  } catch {
    return false
  }
}

export function parsePostAttachments(value: unknown): ParseAttachmentsResult {
  if (value === undefined || value === null) return { ok: true, attachments: [] }
  if (!Array.isArray(value)) return { ok: false, error: 'Lista de materiais inválida' }
  if (value.length > MAX_ATTACHMENTS_PER_POST) {
    return {
      ok: false,
      error: `Cada post pode ter no máximo ${MAX_ATTACHMENTS_PER_POST} materiais`,
    }
  }

  const attachments: PostAttachment[] = []

  for (const item of value) {
    if (!item || typeof item !== 'object') {
      return { ok: false, error: 'Material complementar inválido' }
    }

    const attachment = item as Record<string, unknown>
    const name = typeof attachment.name === 'string' ? attachment.name.trim() : ''
    const url = typeof attachment.url === 'string' ? attachment.url.trim() : ''
    const downloadUrl =
      typeof attachment.downloadUrl === 'string' ? attachment.downloadUrl.trim() : ''
    const contentType =
      typeof attachment.contentType === 'string' ? attachment.contentType.trim() : ''
    const size = typeof attachment.size === 'number' ? attachment.size : Number.NaN

    if (!name || name.length > 160 || /[\u0000-\u001f\u007f]/.test(name)) {
      return { ok: false, error: 'O nome de cada material deve ter entre 1 e 160 caracteres' }
    }

    if (!isValidBlobUrl(url) || !isValidBlobUrl(downloadUrl)) {
      return { ok: false, error: 'URL de material complementar inválida' }
    }

    const sourceUrl = new URL(url)
    const sourceDownloadUrl = new URL(downloadUrl)
    if (
      sourceUrl.origin !== sourceDownloadUrl.origin ||
      sourceUrl.pathname !== sourceDownloadUrl.pathname
    ) {
      return { ok: false, error: 'URL de download do material não corresponde ao arquivo' }
    }

    if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
      return { ok: false, error: 'Formato de material complementar não permitido' }
    }

    if (!Number.isInteger(size) || size <= 0 || size > MAX_ATTACHMENT_SIZE_IN_BYTES) {
      return { ok: false, error: 'Tamanho de material complementar inválido' }
    }

    attachments.push({
      name,
      url,
      downloadUrl,
      contentType: contentType as AttachmentContentType,
      size,
    })
  }

  return { ok: true, attachments }
}

export function getAttachmentTypeLabel(contentType: AttachmentContentType) {
  if (contentType === 'application/pdf') return 'PDF'
  if (
    contentType === 'application/msword' ||
    contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return 'Documento Word'
  }
  return 'Imagem'
}

export function formatAttachmentSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`
  return `${(size / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
}
