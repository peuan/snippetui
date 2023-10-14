import { NextRequest, NextResponse } from "next/server"
import { Octokit, App } from "octokit"
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})
export async function GET(request: NextRequest, context: {}) {
  try {
    const result = await octokit.request(
      "GET /repos/peuan/snippetui/contributors",
      {
        owner: "OWNER",
        repo: "REPO",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    )
    return NextResponse.json({
      contributors: result.data,
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.error()
  }
}
