import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Nav from './components/nav'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin-ext'],
})

export const metadata: Metadata = {
  title: 'LunaPets | Un lugar para tu mascota',
  description: 'Servicios para tu mascota en un solo lugar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
