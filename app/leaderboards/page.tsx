import clsx from "clsx"
import React from "react"
import { BiMedal } from "react-icons/bi"
interface User {
  name: string
  score: number
  rank: number
}

interface LeaderboardProps {
  data: User[]
}
const Leaderboard = () => {
  const data: User[] = [
    { name: "John", score: 120, rank: 1 },
    { name: "Alice", score: 110, rank: 2 },
    { name: "Bob", score: 105, rank: 3 },
    { name: "Eve", score: 95, rank: 4 },
    { name: "Charlie", score: 90, rank: 5 },
    { name: "Grace", score: 85, rank: 6 },
    // Add more fake data as needed
  ]

  const top3 = data.slice(0, 3)
  const rest = data.slice(3)

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="text-3xl mb-4">Leaderboard</div>
      <div className="lg:w-1/3 w-full px-4">
        {top3.map((user, index) => (
          <div
            key={index}
            className={clsx(
              "flex items-center py-2 rounded-lg shadow-md mb-2 hover:scale-125 transition duration-300",
              index === 0 && "bg-yellow-400 h-16",
              index === 1 && "bg-blue-400 h-12",
              index === 2 && "bg-teal-400 h-12"
            )}
          >
            <div className="h-8 w-8 rounded bg-slate-500/70 shadow-md ml-2">
              <BiMedal
                className={clsx(
                  "w-7 h-7",
                  index === 0 && "text-yellow-500",
                  index === 1 && "text-slate-300",
                  index === 2 && "text-amber-600"
                )}
              />
            </div>
            <div className="w-1/3 text-center">{user.name}</div>
            <div className="w-1/3 text-center">{user.score}</div>
            <div className="w-1/3 text-center">{user.rank}</div>
          </div>
        ))}
      </div>
      <div className="lg:w-2/3 w-full px-4">
        {rest.map((user, index) => (
          <div
            key={index}
            className="flex items-center py-2 bg-gray-400 rounded-lg shadow-md mb-2"
          >
            <div className="w-1/3 text-center">{user.name}</div>
            <div className="w-1/3 text-center">{user.score}</div>
            <div className="w-1/3 text-center">{user.rank}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
