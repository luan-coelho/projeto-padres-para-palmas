import { defineMiddleware } from 'astro:middleware'
import { auth } from '@/lib/auth'
import { db } from '@/db'
import { allowedEmails } from '@/db/schema'
import { eq } from 'drizzle-orm'

const PRERENDERED_ROUTES = ['/linktree', '/404']

export const onRequest = defineMiddleware(async (context, next) => {
  // Skip auth for prerendered static pages
  if (PRERENDERED_ROUTES.some(route => context.url.pathname.startsWith(route))) {
    context.locals.user = null
    context.locals.session = null
    return next()
  }

  const session = await auth.api.getSession({
    headers: context.request.headers,
  })

  if (session) {
    context.locals.user = session.user
    context.locals.session = session.session
  } else {
    context.locals.user = null
    context.locals.session = null
  }

  if (context.url.pathname.startsWith('/admin')) {
    if (!session) {
      return context.redirect('/login')
    }

    const allowed = await db
      .select()
      .from(allowedEmails)
      .where(eq(allowedEmails.email, session.user.email))

    if (allowed.length === 0) {
      return context.redirect('/login?error=nao-autorizado')
    }
  }

  return next()
})
