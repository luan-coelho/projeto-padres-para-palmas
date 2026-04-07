import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('DATABASE_URL is required')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

// Run migration
const migrationSQL = readFileSync('./drizzle/0000_bitter_vivisector.sql', 'utf-8')
const statements = migrationSQL.split('--> statement-breakpoint').map(s => s.trim()).filter(Boolean)

console.log(`Running ${statements.length} statements...\n`)

for (const stmt of statements) {
  try {
    await sql.query(stmt)
    console.log('✓', stmt.substring(0, 60).replace(/\n/g, ' ') + '...')
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log('⊘', stmt.substring(0, 60).replace(/\n/g, ' ') + '... (already exists)')
    } else {
      console.error('✗', stmt.substring(0, 60).replace(/\n/g, ' '))
      console.error('  Error:', err.message)
    }
  }
}

// Insert allowed emails
console.log('\nInserting allowed emails...')
await sql`INSERT INTO allowed_emails (email) VALUES ('luancoelho.dev@gmail.com') ON CONFLICT (email) DO NOTHING`
await sql`INSERT INTO allowed_emails (email) VALUES ('pvsavarquipalmas@gmail.com') ON CONFLICT (email) DO NOTHING`
await sql`INSERT INTO allowed_emails (email) VALUES ('pedrohenriquefreitas33@gmail.com') ON CONFLICT (email) DO NOTHING`
console.log('✓ 3 emails inserted')

// Insert sample blog post
console.log('\nInserting sample blog post...')
await sql`INSERT INTO posts (title, slug, description, content, author_name, published, created_at, updated_at)
VALUES (
  'Bem-vindo ao Blog do Projeto Padres para a Igreja de Palmas',
  'bem-vindo-ao-blog',
  'Conheça o novo espaço de reflexão e partilha do Projeto Padres para a Igreja de Palmas.',
  '<p>O Projeto Padres para a Igreja de Palmas inaugura este espaço dedicado à reflexão, à partilha de experiências e ao acompanhamento das ações vocacionais em nossa Arquidiocese.</p><h2>Por que um blog?</h2><p>Acreditamos que a comunicação é parte essencial da missão. Este blog nasce como um lugar de encontro entre aqueles que cultivam e apoiam as vocações sacerdotais em Palmas e região.</p><p>Aqui você encontrará textos que buscam iluminar o caminho vocacional, compartilhar as alegrias e desafios da formação, e manter a comunidade informada sobre o que acontece no projeto.</p><blockquote><p>"Farei de ti pescador de homens" (Mt 4,19)</p></blockquote><h2>O que esperar</h2><ul><li>Reflexões vocacionais e espirituais</li><li>Relatos de experiências missionárias</li><li>Notícias e eventos da Arquidiocese de Palmas</li></ul><p>Acompanhe-nos também no <a href="https://www.instagram.com/padresparapalmas" target="_blank" rel="noopener noreferrer">Instagram</a> e fique por dentro de todas as novidades.</p>',
  'Projeto Padres para a Igreja de Palmas',
  true,
  NOW(),
  NOW()
) ON CONFLICT (slug) DO NOTHING`
console.log('✓ Blog post inserted')

console.log('\n✅ Migration complete!')
