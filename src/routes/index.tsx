import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '../components/layout'
import { Hero } from '../components/hero'
import { Apresentacao } from '../components/apresentacao'
import { Pilares } from '../components/pilares'
import { SobreProjeto } from '../components/sobre-projeto'
import { Contato } from '../components/contato'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <Layout>
      <Hero />
      <SobreProjeto />
      <Apresentacao />
      <Pilares />
      <Contato />
    </Layout>
  )
}
