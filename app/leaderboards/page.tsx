"use client"
import clsx from "clsx"
import React from "react"
import { BiMedal } from "react-icons/bi"
import { useGetLeaderboardQuery } from "@/redux/services/leaderboardApi"
import Loading from "@/components/Loading"
import Image from "next/image"
import { CSSBATTLE_URL } from "@/config"
import { useGetContributorsQuery } from "@/redux/services/githubApi"
import { GitHubUser } from "@/interfaces/IContributor"
import { contributors } from "@/config/contributors"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { AiOutlineGithub } from "react-icons/ai"

export default function Leaderboard() {
  const { isLoading, isFetching, data, error } = useGetLeaderboardQuery()
  const {
    isLoading: isLoadingContributors,
    isFetching: isFetchingContributors,
    data: dataContributors,
    error: errorContributors,
  } = useGetContributorsQuery()
  const leaderboard = data?.leaderboard

  const getGitDetailByFileName = (name: string) => {
    const githubName = dataContributors?.contributors.find(
      (contributor: GitHubUser) =>
        contributor.login ===
        contributors.find((user) => user.name === name)?.githubName
    )
    return githubName
  }
  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col items-center pt-20 pb-16 ">
        <div className="text-3xl mb-8 uppercase">Leaderboards</div>
        <div className="lg:w-[80vw] w-full px-4">
          <div className="flex items-center py-2 rounded-lg shadow-md mb-2">
            <div className="w-1/2 text-left ml-2">Player</div>
            <div className="w-1/3 text-center">Total score</div>
            <div className="w-1/5 text-center">Rank</div>
          </div>
          {leaderboard?.map((user, index) => (
            <div
              key={index}
              className={clsx(
                "flex-col items-center py-2 rounded-lg shadow-md mb-2 hover:scale-105 transition duration-300 hover:shadow-2xl",
                index === 0 && "bg-indigo-600 h-fit",
                index === 1 && "bg-purple-400 h-fit",
                index === 2 && "bg-blue-400 h-fit",
                index > 2 && "bg-gray-400 h-fit"
              )}
            >
              <div className="flex">
                <div className="w-1/2">
                  <div className="flex items-center justify-start gap-2 ml-2">
                    <Avatar>
                      <AvatarImage
                        className="h-10 w-10 rounded-full"
                        src={getGitDetailByFileName(user.name)?.avatar_url}
                      />
                      <AvatarFallback>
                        {getGitDetailByFileName(user.name)?.avatar_url
                          ? ""
                          : user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="uppercase text-sm flex gap-2 items-center">
                      {user.name} ({getGitDetailByFileName(user.name)?.login})
                      <div
                        onClick={() =>
                          window.open(
                            getGitDetailByFileName(user.name)?.html_url,
                            "_blank"
                          )
                        }
                        className="cursor-pointer"
                      >
                        <AiOutlineGithub />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start gap-4 items-center mt-2">
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
                    <div className="lg:h-6 lg:w-20 h-6 w-10 lg:text-xs text-[6px] font-semibold rounded-full px-2 py-1 bg-yellow-500 flex justify-center items-center">
                      Gold {user.gold}
                    </div>
                    <div className="lg:h-6 lg:w-20 h-6 w-10 lg:text-xs text-[6px] font-semibold rounded-full px-2 py-1 bg-slate-300 flex justify-center items-center">
                      Silver {user.silver}
                    </div>
                    <div className="lg:h-6 lg:w-20 h-6 w-10 lg:text-xs text-[6px] font-semibold rounded-full px-2 py-1 bg-amber-600 flex justify-center items-center">
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
                    onClick={() =>
                      window.open(`${CSSBATTLE_URL}/play/${battle}`)
                    }
                    key={index}
                    src={`https://cssbattle.dev/targets/${battle}@2x.png`}
                    alt={"battle-" + battle}
                    width={20}
                    height={20}
                    className="rounded object-cover cursor-pointer"
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
