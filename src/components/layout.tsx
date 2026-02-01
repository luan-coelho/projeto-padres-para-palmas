import { Header } from './header'
import { Footer } from './footer'
import type { ComponentProps } from 'react'

export interface LayoutProps extends ComponentProps<'div'> {}

export function Layout({ children, ...props }: LayoutProps) {
  return (
    <div {...props}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
