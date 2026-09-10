import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { readMigrationFiles } from 'drizzle-orm/migrator'
import { config } from 'dotenv'
import postgres from 'postgres'

config({ path: '.env.local', quiet: true })
config({ quiet: true })

const databaseUrl = process.env.POSTGRES_URL_NON_POOLING ?? process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('POSTGRES_URL_NON_POOLING or DATABASE_URL is required')
}

const client = postgres(databaseUrl, { max: 1 })
const migrationsFolder = 'drizzle'

async function baselineLegacyDatabase() {
  await client`CREATE SCHEMA IF NOT EXISTS drizzle`
  await client`CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at bigint
  )`

  const [{ count }] = await client`SELECT count(*)::int AS count FROM drizzle.__drizzle_migrations`
  if (count > 0) return

  const tables = await client`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('account', 'allowed_emails', 'posts', 'session', 'user', 'verification')
  `
  if (tables.length === 0) return
  if (tables.length !== 6) throw new Error('Cannot baseline a partially initialized database')

  const rows = await client`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'posts'
  `
  const columns = new Set(rows.map(({ column_name }) => column_name))
  const hasPositionX = columns.has('hero_image_position_x')
  const hasPositionY = columns.has('hero_image_position_y')
  const applied = [
    true,
    columns.has('social_image'),
    columns.has('attachments'),
    hasPositionX && hasPositionY
  ]

  if (
    hasPositionX !== hasPositionY ||
    applied.some((value, index) => value && applied[index - 1] === false)
  ) {
    throw new Error('Cannot baseline an inconsistent posts schema')
  }

  const migrationFiles = readMigrationFiles({ migrationsFolder })
  const appliedCount = applied.indexOf(false) === -1 ? applied.length : applied.indexOf(false)

  await client.begin(async sql => {
    for (const migration of migrationFiles.slice(0, appliedCount)) {
      await sql`INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
        VALUES (${migration.hash}, ${migration.folderMillis})`
    }
  })

  console.log(`Baselined ${appliedCount} existing database migration(s)`)
}

try {
  await baselineLegacyDatabase()
  await migrate(drizzle(client), { migrationsFolder })
  console.log('Database migrations applied')
} finally {
  await client.end()
}
