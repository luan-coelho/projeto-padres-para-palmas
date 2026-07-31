interface PostImages {
  socialImage?: string | null
  heroImage?: string | null
  content: string
}

const IMAGE_SRC_PATTERN =
  /<img\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi

function decodeHtmlAttribute(value: string) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

export function getContentImages(content: string): string[] {
  const images: string[] = []

  for (const match of content.matchAll(IMAGE_SRC_PATTERN)) {
    const source = match[1] ?? match[2] ?? match[3]
    if (!source) continue

    const decodedSource = decodeHtmlAttribute(source)
    if (!images.includes(decodedSource)) images.push(decodedSource)
  }

  return images
}

export function getFirstContentImage(content: string): string | undefined {
  return getContentImages(content)[0]
}

export function isPostSocialImageAvailable(post: PostImages): boolean {
  if (!post.socialImage) return true
  if (post.socialImage === post.heroImage) return true
  return getContentImages(post.content).includes(post.socialImage)
}

export function resolvePostSocialImage(post: PostImages): string | undefined {
  return post.socialImage || post.heroImage || getFirstContentImage(post.content)
}
