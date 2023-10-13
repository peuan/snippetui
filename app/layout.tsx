import "./globals.css"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import clsx from "clsx"

import Nav from "@/components/Navbar"
import { Providers } from "@/redux/provider"
import Toast from "@/components/Toast"
import { ThemeProvider } from "@/components/ThemeProvider"
import NextAuthProviders from "./(auth)/login/NextAuthProvider"

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
        <meta property="og:url" content="https://css-battle-eta.vercel.app" />
        <meta
          property="og:title"
          content="SnippetUI | Begin Your Coding Journey Here"
        />
        <meta
          property="og:image"
          content="https://css-battle-eta.vercel.app/og-image.png"
        />
        <meta property="og:image:type" content="website" />
        <meta property="og:image:width" content="" />
        <meta property="og:image:height" content="" />
      </head>
      <body
        suppressHydrationWarning={true}
        className={clsx(`${kanit.className} dark:bg-slate-900 m-0 p-0 `)}
      >
        <NextAuthProviders>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Toast />
              <div className="relative min-h-[85vh]">
                <div className="mb-20">
                  <Nav />
                </div>
                <div className="pb-8">{children}</div>
                <section className="text-center absolute bottom-0 mb-2 w-full">
                  Build with ❤️ by{" "}
                  <a href="https://github.com/niawjunior" target="_blank">
                    Niaw{" "}
                  </a>
                </section>
              </div>
            </ThemeProvider>
          </Providers>
        </NextAuthProviders>
      </body>
    </html>
  )
}
