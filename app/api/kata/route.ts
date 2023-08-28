import { NextRequest, NextResponse } from "next/server"
import util from "util"
import { exec as childProcessExec } from "child_process"
import chai from "chai"

const assert = chai.assert
chai.config.truncateThreshold = 0

const exec = util.promisify(childProcessExec)

export async function POST(request: NextRequest) {
  const { code } = await request.json()

  // Test cases
  const testCases = [
    { input: "zodiac", output: 26 },
    { input: "chruschtschov", output: 80 },
    { input: "khrushchev", output: 38 },
    { input: "strength", output: 57 },
    { input: "catchphrase", output: 73 },
    { input: "twelfthstreet", output: 103 },
    { input: "mischtschenkoana", output: 80 },
    { input: "az", output: 26 },
  ]

  try {
    const { stdout, stderr } = await exec(`node -e "${code}"`)
    const userOutput = stdout.trim()
    const results = testCases.map((testCase, index) => {
      const input = testCase.input
      const expectedOutput = testCase.output
      const passed = userOutput === expectedOutput.toString()

      return { testCase: index + 1, passed }
    })

    return NextResponse.json({
      success: true,
      output: userOutput,
      results,
    })
  } catch (error: any) {
    console.error("Error executing code:", error)
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
