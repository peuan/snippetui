import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

const kanit = Kanit({ subsets: ['thai'], weight: '600' })

export const metadata: Metadata = {
  title: 'CSSBattle Showcase',
  description: 'CSSBattle Showcase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning={true}
        className={kanit.className}>
        {children}
      </body>
    </html >
  )
}
