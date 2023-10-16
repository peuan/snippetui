"use client"
import React, { useCallback, useEffect, useState } from "react"
import { BiMedal } from "react-icons/bi"
import { AiOutlineMail, AiOutlineGithub } from "react-icons/ai"
import { BsCode } from "react-icons/bs"
import Loading from "@/components/Loading"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useGetContributorsQuery } from "@/redux/services/githubApi"

export default function Profile() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<any>()

  console.log(session)
  const {
    isLoading: isLoadingContributors,
    isFetching: isFetchingContributors,
    data: dataContributors,
    error: errorContributors,
  } = useGetContributorsQuery()

  const getGithubProfile = useCallback(
    (profile: any) => {
      return profile.find((p: any) => p.login === session?.user?.name)
    },
    [session?.user?.name]
  )

  useEffect(() => {
    if (status === "loading" || isLoadingContributors) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    if (session && !isLoadingContributors) {
      const profile = getGithubProfile(dataContributors?.contributors)
      setProfile(profile)
    }
  }, [
    dataContributors,
    getGithubProfile,
    isLoadingContributors,
    session,
    status,
  ])
  return (
    <>
      {isLoading && <Loading />}
      {session && (
        <div className="mt-8 flex flex-col items-center pt-20 pb-16">
          <div className="text-3xl mb-8 uppercase">Profile</div>
          <div className="flex items-center  w-full justify-center">
            <div className="lg:w-[30vw] w-full px-4">
              <div className="dark:bg-slate-800 bg-slate-50 shadow-xl rounded-lg py-3">
                <div className="photo-wrapper p-2">
                  <Image
                    className="w-32 h-32 rounded-full mx-auto border-2"
                    src={session?.user?.image ?? ""}
                    alt="Profile"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 dark:text-white font-medium leading-8">
                    {session?.user?.name}
                  </h3>
                  <table className="text-xs my-3">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2  text-gray-900 dark:text-white font-semibold">
                          <AiOutlineMail />
                        </td>
                        <td className="px-2 py-2">{session?.user?.email}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2  text-gray-900 dark:text-white font-semibold">
                          <AiOutlineGithub />
                        </td>
                        <td className="px-2 py-2">
                          <a
                            href={profile?.html_url ?? "#"}
                            target="_blank"
                            className="text-blue-400"
                          >
                            {profile?.html_url ?? "-"}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2  text-gray-900 dark:text-white font-semibold">
                          <BsCode />
                        </td>
                        <td className="px-2 py-2">
                          {profile?.contributions ?? 0} commits
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
