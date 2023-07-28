import { readFile, readdir } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function GET(
  request: NextRequest,
  context: { params: { id: [] } }
) {
  const filePath = `${context.params.id.join("/")}.html`
  const dirRelativeToPublicFolder = `showcase/${filePath}`
  const dir = path.resolve("./public", dirRelativeToPublicFolder)

  try {
    const fileData = await readFile(dir, "utf-8")
    return NextResponse.json({
      code: fileData,
    })
  } catch (error) {
    console.error("Error reading directory:", error)
    return NextResponse.error()
  }
}
