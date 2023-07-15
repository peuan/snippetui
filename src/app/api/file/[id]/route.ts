import { readFile, readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const ITEMS_PER_PAGE = 3; // Number of items per page
  const currentPage = Number(context.params.id);
  const dirRelativeToPublicFolder = "css-battle";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  try {
    const files = await readdir(dir);
    const filteredFiles = files
      .filter((file) => !file.includes("."))
      .sort((a, b) => Number(b) - Number(a));
    const paginatedFiles = paginateArray(
      filteredFiles,
      currentPage,
      ITEMS_PER_PAGE
    );
    const fileResults = await Promise.all(
      paginatedFiles.map(async (file) => {
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
    fileResults.sort((a, b) => Number(b.folder) - Number(a.folder));

    return NextResponse.json({
      files: fileResults,
      totalItems: filteredFiles.length,
    });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.error();
  }

  function paginateArray(
    array: any[],
    currentPage: number,
    itemsPerPage: number
  ) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  }
}
