"use client"
import React from "react"
import Comment from "@/components/Comment"

export default function Discussions() {
  return (
    <>
      <div className="mt-8 flex flex-col items-center ">
        <div className="text-3xl mb-8 uppercase">Discussions</div>
        <div className="lg:w-[80vw] w-full px-4">
          <div className="flex items-center p-4 rounded-lg shadow-md mb-2 dark:bg-slate-800">
            <Comment />
          </div>
        </div>
      </div>
    </>
  )
}
