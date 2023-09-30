interface ILeaderboard {
  leaderboard: {
    name: string
    battles: string[]
    score: number
    rank: number
    won: {
      battle: number
      rank: number
      score: number
    }[]
    gold: number
    silver: number
    bronze: number
  }[]
}
export type { ILeaderboard }
