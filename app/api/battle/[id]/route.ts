import { readFile, readdir } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import yaml from "js-yaml"
import { readFileSync } from "fs"
import { IBattle, IFile } from "@/interfaces/IBattle"

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const ITEMS_PER_PAGE = 3
  const currentPage = Number(context.params.id)
  const { searchParams } = new URL(request.url)
  const sorting = searchParams.get("sorting")
  const search = searchParams.get("q")!

  const dirRelativeToPublicFolder = "battle"
  const dir = path.resolve("./public", dirRelativeToPublicFolder)

  try {
    const files = await readdir(dir)
    const filteredFiles = files
      .filter((file) => !file.includes("."))
      .sort((a, b) =>
        sorting === "DESC" ? Number(b) - Number(a) : Number(a) - Number(b)
      )
    const paginatedFiles = paginateArray(
      filteredFiles,
      currentPage,
      ITEMS_PER_PAGE
    )
    const getAllResult = search ? filteredFiles : paginatedFiles
    const fileResults = await Promise.all(
      getAllResult.map(async (file) => {
        const fileDir = path.resolve(dir, file)
        const fileLists = await readdir(fileDir)
        const fileListsFilterOutYaml = fileLists.filter(
          (v) => !v.endsWith(".yml")
        )
        const filesWithCount = await Promise.all(
          fileListsFilterOutYaml.map(async (fileName) => {
            const filePath = path.resolve(fileDir, fileName)
            const fileData = await readFile(filePath, "utf-8")

            const yamlFilePath = path.join(
              fileDir,
              `${fileName.replace(".html", ".yml")}`
            )

            const yamlFileExists = await fileExists(yamlFilePath)

            const yamlContent = yamlFileExists
              ? yaml.load(readFileSync(yamlFilePath, "utf8"))
              : ("" as any)

            let status = "complete"
            let description = null
            let color = "primary"

            if (yamlContent) {
              status = yamlContent.status || status
              description = yamlContent.description
              color = yamlContent.color || color
            }

            return {
              fileName,
              characterCount: fileData.trim().length,
              description: description,
              status,
              color,
            }
          })
        )
        filesWithCount.sort((a, b) => {
          if (
            a.status.includes("incomplete") &&
            !b.status.includes("incomplete")
          ) {
            return 1
          } else if (
            !a.status.includes("incomplete") &&
            b.status.includes("incomplete")
          ) {
            return -1
          } else {
            return a.characterCount - b.characterCount
          }
        })
        return { folder: file, files: filesWithCount }
      })
    )
    fileResults.sort((a, b) =>
      sorting === "DESC"
        ? Number(b.folder) - Number(a.folder)
        : Number(a.folder) - Number(b.folder)
    )

    const filteredFile = filteredFileResults(fileResults as IBattle[], search)
    const filterEmpty = filteredFile.filter((item) => item.files.length > 0)
    console.log(filteredFile)
    const sliceItems = paginateArray(filterEmpty, currentPage, ITEMS_PER_PAGE)
    return NextResponse.json({
      files: sliceItems,
      totalItems: search ? filterEmpty.length : filteredFiles.length,
    })
  } catch (error) {
    console.error("Error reading directory:", error)
    return NextResponse.error()
  }

  function filteredFileResults(fileResults: IBattle[], search?: string) {
    return search
      ? fileResults.map((folderData) => {
          const filteredFiles = folderData.files.filter((file) => {
            const folderMatches = search
              ? folderData.folder
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              : false
            const fileMatches = search
              ? file.fileName
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              : false
            const statusMatches = search
              ? file.status
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              : false
            return folderMatches || fileMatches || statusMatches
          })

          return { folder: folderData.folder, files: filteredFiles }
        })
      : fileResults
  }

  function paginateArray(
    array: any[],
    currentPage: number,
    itemsPerPage: number
  ) {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return array.slice(startIndex, endIndex)
  }

  async function fileExists(filePath: string) {
    try {
      await readFile(filePath)
      return true
    } catch (error) {
      return false
    }
  }
}
