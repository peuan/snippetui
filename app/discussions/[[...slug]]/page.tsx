"use client"
import React, { useEffect } from "react"
import Comment from "@/components/Comment"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import Card from "@/components/BattleCard"
import { useGetBattleByIdQuery } from "@/redux/services/battleApi"

export default function Discussions() {
  const pathname = usePathname()
  const params = useSearchParams()

  const path = pathname.split("/discussions").filter(Boolean).join("")
  const [folder, file] = path?.replace("/battle", "").split("/").filter(Boolean)

  const { isLoading, isFetching, data, error } = useGetBattleByIdQuery(
    { folder: folder, file: file },
    { skip: !folder || !file }
  )

  console.log(data)
  return (
    <>
      <div className="mt-8 flex flex-col items-center pt-20 pb-16">
        <div className="text-3xl mb-8 uppercase">Discussions</div>
        <div className="flex lg:w-[90vw] lg:justify-between justify-center flex-wrap w-full px-4">
          {path && data && (
            <>
              <div className="w-[400px] lg:scale-100 scale-75">
                <Card folder={folder} file={data} />
              </div>
              <div className="lg:w-[60%] px-10 w-full p-4 rounded-lg shadow-md mb-2 dark:bg-slate-800">
                <Comment path={path} />
              </div>
            </>
          )}
          {!path && (
            <div className="w-full p-4 rounded-lg shadow-md mb-2 dark:bg-slate-800">
              <Comment path={path} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
