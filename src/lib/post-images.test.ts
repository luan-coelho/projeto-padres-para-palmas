import assert from 'node:assert/strict'
import test from 'node:test'
import { getContentImages, isPostSocialImageAvailable } from './post-images.ts'

test('finds legacy and captioned post images in order', () => {
  const content = `
    <img src="https://example.com/legacy.jpg" alt="Antiga">
    <figure data-post-image data-align="center">
      <img src="https://example.com/captioned.jpg" alt="Legenda">
      <figcaption>Legenda</figcaption>
    </figure>
  `

  assert.deepEqual(getContentImages(content), [
    'https://example.com/legacy.jpg',
    'https://example.com/captioned.jpg'
  ])
  assert.equal(
    isPostSocialImageAvailable({
      content,
      socialImage: 'https://example.com/captioned.jpg'
    }),
    true
  )
})
