"use client"

import Giscus from "@giscus/react"
import { useTheme } from "next-themes"

interface IPage {
  path?: string
}
export default function Comment({ path }: IPage) {
  const { setTheme, theme, resolvedTheme } = useTheme()
  return (
    <Giscus
      id="comments"
      repo="peuan/snippetui"
      repoId="R_kgDOJ5O7wQ"
      category="General"
      categoryId="DIC_kwDOJ5O7wc4CaGB2"
      mapping="pathname"
      term="Welcome to SnippetUI!"
      reactionsEnabled={path ? "1" : "0"}
      emitMetadata="0"
      inputPosition="top"
      theme={theme === "dark" ? "dark" : "light"}
      lang="en"
      loading="lazy"
    />
  )
}
