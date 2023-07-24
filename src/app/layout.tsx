import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import Nav from '@/components/Navbar'
import { Providers } from '@/redux/provider'

const kanit = Kanit({ subsets: ['thai'], weight: '600' })

// layout metadata
export const metadata: Metadata = {
  title: 'SnippetUI',
  description: 'Begin Your Coding Journey Here',
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
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html >
  )
}
