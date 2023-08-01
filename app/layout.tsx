import "./globals.css"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import clsx from "clsx"

import Nav from "@/components/Navbar"
import { Providers } from "@/redux/provider"
import Toast from "@/components/Toast"
import { ThemeProvider } from "@/components/ThemeProvider"

const kanit = Kanit({ subsets: ["thai"], weight: "600" })

// layout metadata
export const metadata: Metadata = {
  title: "SnippetUI",
  description: "Begin Your Coding Journey Here",
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
      <body
        suppressHydrationWarning={true}
        className={clsx(`${kanit.className} dark:bg-slate-900 m-0 p-0 `)}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toast />
            <Nav />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
