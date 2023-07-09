import { readFile, readdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const dirRelativeToPublicFolder = "css-battle";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  try {
    const files = await readdir(dir);
    const filteredFiles = files.filter((file) => !file.includes("."));
    const fileResults = await Promise.all(
      filteredFiles.map(async (file) => {
        const fileDir = path.resolve(dir, file);
        const fileLists = await readdir(fileDir);
        const filesWithCount = await Promise.all(
          fileLists.map(async (fileName) => {
            const filePath = path.resolve(fileDir, fileName);
            const fileData = await readFile(filePath, "utf-8");
            return { fileName, characterCount: fileData.trim().length };
          })
        );
        filesWithCount.sort((a, b) => a.characterCount - b.characterCount);
        return { folder: file, files: filesWithCount };
      })
    );
    fileResults.sort((a, b) => Number(a.folder) - Number(b.folder));
    return NextResponse.json({ files: fileResults });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.error();
  }
}
