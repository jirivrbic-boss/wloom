import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wloom Studio | S Námi Rozkvetete Online',
  description: 'Vytváříme moderní webové stránky, které přitahují zákazníky. Spojujeme nejnovější technologie s krásnými vizuály. Každý projekt je jako květ – vyrůstá z vašich potřeb a rozkvétá online.',
  keywords: ['tvorba webů', 'webové stránky', 'moderní design', '3D animace', 'digitální marketing', 'e-shop'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
