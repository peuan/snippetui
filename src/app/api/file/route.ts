import { readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const dirRelativeToPublicFolder = "css-battle";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  try {
    const files = await readdir(dir);
    const result = { files };
    const filtered = result.files.filter((v) => !v.includes("."));
    const fileResults: any[] = [];

    await Promise.all(
      filtered.map(async (file) => {
        const fileDir = path.resolve(dir, file);
        const fileLists = await readdir(fileDir);
        fileResults.push({ folder: file, files: fileLists });
      })
    );
    return NextResponse.json({ files: fileResults });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.error();
  }
}
