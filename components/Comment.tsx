"use client"

import Giscus from "@giscus/react"
import { useTheme } from "next-themes"

export default function Comment() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  console.log(theme)
  return (
    <Giscus
      id="comments"
      repo="peuan/snippetui"
      repoId="R_kgDOJ5O7wQ"
      category="General"
      categoryId="DIC_kwDOJ5O7wc4CaGB2"
      mapping="specific"
      term="Welcome to SnippetUI!"
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === "dark" ? "dark" : "light"}
      lang="en"
      loading="lazy"
    />
  )
}
