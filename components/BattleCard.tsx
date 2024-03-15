"use client"
import { IFile } from "@/interfaces/IBattle"
import Iframe from "react-iframe"
import { GITHUB_URL } from "@/config"

import { usePathname, useRouter } from "next/navigation"
import { BiCode, BiCoffee, BiInfoCircle, BiLinkExternal, BiMedal } from "react-icons/bi"
import { useState } from "react"
import clsx from "clsx"
import { FaHeartBroken } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { GoCommentDiscussion } from "react-icons/go"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReloadIcon } from "@radix-ui/react-icons"
import { GitHubUser } from "@/interfaces/IContributor"
import { contributors as githubContributors } from "@/config/contributors"

const Card = ({
  folder,
  file,
  rank,
  contributors,
}: {
  folder: string
  file: IFile
  rank: number
  contributors?: GitHubUser[]
}) => {
  const [isPlaygroundLoading, setIsPlaygroundLoading] = useState(false)
  const [isDiscussionsLoading, setIsDiscussionsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const pathname = usePathname()

  const router = useRouter()

  const authorName = file.fileName.split("_")[0]

  const getGitDetailByFileName = (name: string) => {
    const githubName = contributors?.find(
      (contributor: GitHubUser) =>
        contributor.login ===
        githubContributors.find((user) => user.name === name)?.githubName
    )
    return githubName
  }

  const handleClickToCode = (folder: string, file: string) => {
    window.open(`${GITHUB_URL}/blob/main/public/battle/${folder}/${file}`, file)
  }

  const handleClickToPlayground = (folder: string, file: string) => {
    setIsPlaygroundLoading(true)

    let fileName = file.split(".")[0]

    router.push(`/playground/battle/${folder}/${fileName}`)
  }

  const handleClickToDiscussions = (folder: string, file: string) => {
    if (!pathname?.includes("discussions")) {
      setIsDiscussionsLoading(true)

      let fileName = file.split(".")[0]

      router.push(`/discussions/battle/${folder}/${fileName}`)
    }
  }

  //handle dialog for display description
  const handleDialog = () => {
    setIsDialogOpen(true)
  }

  const onOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  return (
    <div className=" overflow-hidden bg-yellow-200 dark:bg-slate-900 box-content mobile-scale rounded-[15px] border-[1px] hover:border-yellow-400 active:border-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg card-animation">
      <div className="flip-card overflow-hidden ">
        <div className="flip-card-inner flex justify-center items-center lg:scale-100">
          <Iframe
            title={file.fileName}
            overflow="hidden"
            className="flip-card-front"
            url={`/battle/${folder}/${file.fileName}`}
          />
          <div className="flip-card-back">
            <Iframe
              title={file.fileName}
              overflow="hidden"
              className="w-[400px] h-[300px]"
              url={`/battle/${folder}/${file.fileName}`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start mt-2 px-2">
        <div className="flex mb-2">
          <div className="w-full rounded-full bg-yellow-300 dark:bg-slate-800  flex justify-between items-center pl-2 pr-4 z-10">
            <div className="flex items-center">
              <Avatar className="ml-[-8px]">
                <AvatarImage
                  src={getGitDetailByFileName(authorName)?.avatar_url}
                />
                <AvatarFallback>
                  {getGitDetailByFileName(authorName)?.avatar_url
                    ? ""
                    : authorName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="dark:text-white text-slate-800 font-bold  py-1 px-4 text-xs w-[120px] break-words">
                {" "}
                {getGitDetailByFileName(authorName)?.login}
              </h3>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleClickToCode(folder, file.fileName)}
                title="Open Github"
              >
                <BiLinkExternal className="dark:text-white text-slate-800 hover:text-white" />
              </button>
              <button
                title="Open Playground"
                onClick={() => handleClickToPlayground(folder, file.fileName)}
              >
                {!isPlaygroundLoading && (
                  <BiCode className="dark:text-white text-slate-800 hover:text-white" />
                )}
                {isPlaygroundLoading && (
                  <ReloadIcon className="dark:text-white text-slate-800 hover:text-white h-4 w-4 animate-spin" />
                )}
              </button>
              <button
                onClick={() => handleClickToDiscussions(folder, file.fileName)}
                title="Open Discussions"
              >
                {!isDiscussionsLoading && (
                  <GoCommentDiscussion className="dark:text-white text-slate-800 hover:text-white " />
                )}
                {isDiscussionsLoading && (
                  <ReloadIcon className="dark:text-white text-slate-800 hover:text-white h-4 w-4 animate-spin" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="w-fit h-10 px-3 flex justify-start text-xs items-center dark:text-white text-slate-800 mb-2 rounded-full bg-yellow-300 dark:bg-slate-800 gap-x-2">
          {rank <= 3 && (
            <BiMedal
              className={clsx(
                "w-6 h-6",
                rank === 1 && "text-yellow-500",
                rank === 2 && "text-slate-300",
                rank === 3 && "text-amber-600"
              )}
            />
          )}
          {rank > 3 && (
            <span className="flex justify-center items-center dark:text-white text-slate-800">
              <BiCoffee className="w-6 h-6 text-white" />
            </span>
          )}{" "}
          {`( ${file.characterCount.toLocaleString("en-US")} characters ) `}
          {file.status === "incomplete" && (
            <div className="ml-2 flex items-center gap-x-1">
              <span>{file.percentage ?? ''}</span>
              <FaHeartBroken title="incomplete" className=" text-red-400" />
            </div>
          )}
          {file.description && (
            <div className="ml-2 flex justify-center items-center">
              <Button
                variant={file.color || "destructive"}
                className="rounded-full"
                size={"sm"}
                onClick={() => handleDialog()}
              >
                <BiInfoCircle />
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={onOpenDialog}>
                <DialogContent className="max-w-[300px]">
                  <DialogHeader>
                    <DialogTitle> {file.description}</DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
