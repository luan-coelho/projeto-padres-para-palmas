import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { config } from 'dotenv'
import postgres from 'postgres'

config({ path: '.env.local', quiet: true })
config({ quiet: true })

const databaseUrl = process.env.POSTGRES_URL_NON_POOLING ?? process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('POSTGRES_URL_NON_POOLING or DATABASE_URL is required')
}

const client = postgres(databaseUrl, { max: 1 })

try {
  await migrate(drizzle(client), { migrationsFolder: 'drizzle' })
  console.log('Database migrations applied')
} finally {
  await client.end()
}
