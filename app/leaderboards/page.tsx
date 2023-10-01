"use client"
import clsx from "clsx"
import React from "react"
import { BiMedal } from "react-icons/bi"
import { FaRegSadTear } from "react-icons/fa"
import { useGetLeaderboardQuery } from "@/redux/services/leaderboardApi"
import Loading from "@/components/Loading"
import Image from "next/image"

interface User {
  name: string
  score: number
  rank: number
}

export default function Leaderboard() {
  const { isLoading, isFetching, data, error } = useGetLeaderboardQuery({
    path: "leaderboard",
  })
  const leaderboard = data?.leaderboard
  const top3 = leaderboard?.slice(0, 3)
  const rest = leaderboard?.slice(3)
  return (
    <>
      {isLoading && <Loading />}
      <div className="mt-8 flex flex-col items-center">
        <div className="text-3xl mb-8">Leaderboards</div>
        <div className="lg:w-[80vw] w-full px-4">
          <div className="flex items-center py-2 rounded-lg shadow-md mb-2">
            <div className="w-1/2 text-center">Player</div>
            <div className="w-1/3 text-center">Total score</div>
            <div className="w-1/5 text-center">Rank</div>
          </div>
          {top3?.map((user, index) => (
            <div
              key={index}
              className={clsx(
                "flex-col items-center py-2 rounded-lg shadow-md mb-2 hover:scale-110 transition duration-300",
                index === 0 && "bg-indigo-600 h-fit",
                index === 1 && "bg-purple-400 h-fit",
                index === 2 && "bg-blue-400 h-fit"
              )}
            >
              <div className="flex">
                <div className="w-1/2 text-center">
                  <div className="uppercase">{user.name}</div>
                  <div className="flex justify-start gap-4 items-center">
                    <div className="lg:h-8 lg:w-8 h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center backdrop-blur-md shadow-lg ml-2">
                      <BiMedal
                        className={clsx(
                          "w-5 h-5",
                          index === 0 && "text-yellow-500",
                          index === 1 && "text-slate-300",
                          index === 2 && "text-amber-600"
                        )}
                      />
                    </div>
                    <div className="lg:h-6 lg:w-24 h-8 w-8 lg:text-xs text-[5px] font-semibold rounded-full px-2 py-1 bg-yellow-500 flex justify-center items-center">
                      Gold {user.gold}
                    </div>
                    <div className="lg:h-6 lg:w-24 h-8 w-8 lg:text-xs text-[5px] font-semibold rounded-full px-2 py-1 bg-slate-300 flex justify-center items-center">
                      Silver {user.silver}
                    </div>
                    <div className="lg:h-6 lg:w-24 h-8 w-8 lg:text-xs text-[5px] font-semibold rounded-full px-2 py-1 bg-amber-600 flex justify-center items-center">
                      Bronze {user.bronze}
                    </div>
                  </div>
                </div>
                <div className="w-1/3 text-center lg:text-sm text-xs">
                  {user.score.toLocaleString("en-US")}
                  <div className="text-xs">{user.battles?.length} BATTLES</div>
                </div>
                <div className="w-1/5 text-center lg:text-sm text-xs">
                  #{user.rank}
                </div>
              </div>
              <div className="ml-2 mt-2 flex flex-wrap gap-1">
                {user.battles?.map((battle, index) => (
                  <Image
                    key={index}
                    src={`https://cssbattle.dev/targets/${battle}@2x.png`}
                    alt={"battle-" + battle}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-[80vw] w-full px-4">
          {rest?.map((user, index) => (
            <div
              key={index}
              className="flex-col items-center py-2 bg-gray-400 rounded-lg shadow-md mb-2"
            >
              <div className="flex">
                <div className="w-1/2 text-center">
                  <div className="uppercase">{user.name}</div>
                  <div className="flex justify-start gap-4 items-center">
                    <div className="lg:h-8 lg:w-8 h-5 w-5 rounded-full bg-slate-700 flex items-center justify-center backdrop-blur-md shadow-lg ml-2">
                      <FaRegSadTear className="w-5 h-5" />
                    </div>
                    <div className="lg:h-6 lg:w-24 h-8 w-8 lg:text-xs text-[5px] font-semibold rounded-full px-2 py-1 bg-yellow-500 flex justify-center items-center">
                      Gold {user.gold}
                    </div>
                    <div className="lg:h-6 lg:w-24 h-8 w-8 lg:text-xs text-[5px] font-semibold rounded-full px-2 py-1 bg-slate-300 flex justify-center items-center">
                      Silver {user.silver}
                    </div>
                    <div className="lg:h-6 lg:w-24 h-8 w-8 lg:text-xs text-[5px] font-semibold rounded-full px-2 py-1 bg-amber-600 flex justify-center items-center">
                      Bronze {user.bronze}
                    </div>
                  </div>
                </div>

                <div className="w-1/3 text-center lg:text-sm text-xs">
                  {user.score.toLocaleString("en-US")}
                  <div className="text-xs">{user.battles?.length} BATTLES</div>
                </div>
                <div className="w-1/5 text-center lg:text-sm text-xs">
                  #{user.rank}
                </div>
              </div>
              <div className="ml-2 mt-2 flex flex-wrap gap-1">
                {user.battles?.map((battle, index) => (
                  <Image
                    key={index}
                    src={`https://cssbattle.dev/targets/${battle}@2x.png`}
                    alt={"battle-" + battle}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
