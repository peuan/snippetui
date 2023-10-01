import { ILeaderboard } from "@/interfaces/ILeaderboard"
import { readFile, readdir } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import yaml from "js-yaml"
import { readFileSync } from "fs"

// get leaderboard
export async function GET(request: NextRequest) {
  const dirRelativeToPublicFolder = "battle"
  const dir = path.resolve("./public", dirRelativeToPublicFolder)

  try {
    const files = await readdir(dir)
    const filteredFiles = files.filter((file) => !file.includes("."))

    // const allBattles = await getAllBattles(filteredFiles)

    const fileResults = await Promise.all(
      filteredFiles.map(async (file) => {
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

            if (yamlContent) {
              status = yamlContent.status || status
            }

            return {
              fileName,
              characterCount: fileData.trim().length,
              status,
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
    fileResults.sort((a, b) => Number(b.folder) - Number(a.folder))
    const playerName = fileResults
      .map((item) => item.files.map((file) => file.fileName?.split("_")[0]))
      .flat(Infinity)
    const uniquePlayerName = [...new Set(playerName)]

    const getBattlesByPlayerName = (playerName: string) => {
      return fileResults
        .filter((item) =>
          item.files.map((file) => file.fileName?.split("_")[0])
        )
        .filter((item) =>
          item.files
            .map((file) => file.fileName?.split("_")[0])
            ?.includes(playerName)
        )
        .map((item) => item.folder)
    }

    const getScoreByRank = (rank: number) => {
      switch (rank) {
        case 0:
          return 20
        case 1:
          return 10
        case 2:
          return 5
        default:
          return 1
      }
    }
    const getWonBattlesByPlayerName = (playerName: string) => {
      return fileResults
        .filter((item) =>
          item.files.map((file) => file.fileName?.split("_")[0])
        )
        .filter((item) =>
          item.files
            .map((file) => file.fileName?.split("_")[0])
            ?.includes(playerName)
        )
        .map((item) => {
          return {
            battle: item.folder,
            rank:
              item.files.findIndex(
                (file) => file.fileName?.split("_")[0] === playerName
              ) + 1,
            score: getScoreByRank(
              item.files.findIndex(
                (file) => file.fileName?.split("_")[0] === playerName
              )
            ),
          }
        })
    }
    const leaderboard = uniquePlayerName.map((playerName) => {
      return {
        name: playerName,
        battles: getBattlesByPlayerName(playerName as string),
        won: getWonBattlesByPlayerName(playerName as string),
        score: getWonBattlesByPlayerName(playerName as string).reduce(
          (acc, item) => acc + item.score,
          0
        ),
      }
    })

    const sortingLeaderboard = leaderboard.sort((a, b) => {
      return Number(b.score) - Number(a.score)
    })

    const leaderboardResult = sortingLeaderboard.map((item, index) => {
      return {
        ...item,
        rank: index + 1,
        gold: item.won.filter((item) => item.rank === 1).length,
        silver: item.won.filter((item) => item.rank === 2).length,
        bronze: item.won.filter((item) => item.rank === 3).length,
      }
    })
    return NextResponse.json({
      leaderboard: leaderboardResult,
    })
  } catch (error) {
    console.error("Error reading directory:", error)
    return NextResponse.error()
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
