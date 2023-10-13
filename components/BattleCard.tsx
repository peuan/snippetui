"use client"
import { IFile } from "@/interfaces/IBattle"
import Iframe from "react-iframe"
import { GITHUB_URL } from "@/config"

import { useRouter } from "next/navigation"
import { BiCode, BiInfoCircle, BiLinkExternal, BiMedal } from "react-icons/bi"
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

const Card = ({
  folder,
  file,
  index,
}: {
  folder: string
  file: IFile
  index?: number
}) => {
  const [isPlaygroundLoading, setIsPlaygroundLoading] = useState(false)
  const [isDiscussionsLoading, setIsDiscussionsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const router = useRouter()

  const autherName = file.fileName.split("_")[0]

  const getAvatar = (name: string) => {
    switch (name) {
      case "niaw":
        return "/niaw.png"
      case "first":
        return "/first.png"
      case "chok":
        return "/chok.png"
      case "ake":
        return "/ake.png"
      default:
        break
    }
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
    setIsDiscussionsLoading(true)

    let fileName = file.split(".")[0]

    router.push(`/discussions/battle/${folder}/${fileName}`)
    setIsDiscussionsLoading(false)
  }

  //handle dialog for display description
  const handleDialog = () => {
    setIsDialogOpen(true)
  }

  const onOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  return (
    <div className=" overflow-hidden bg-yellow-200 dark:bg-slate-900 box-content mobile-scale rounded-[30px] border-[1px] hover:border-yellow-400 active:border-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg card-animation">
      <div className="flip-card overflow-hidden ">
        <div className="flip-card-inner flex justify-center items-center lg:scale-100">
          <Iframe
            title={file.fileName}
            overflow="hidden"
            className="flip-card-front rounded-[30px]"
            url={`/battle/${folder}/${file.fileName}`}
          />
          <div className="flip-card-back rounded-[30px]">
            <Iframe
              title={file.fileName}
              overflow="hidden"
              className="w-[400px] h-[300px]"
              url={`/battle/${folder}/${file.fileName}`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2 px-2">
        <div className="flex justify-center mb-2">
          <div className="rounded-full bg-yellow-300 dark:bg-slate-800  flex items-center px-2 z-10">
            <Avatar className="ml-[-8px]">
              <AvatarImage src={getAvatar(autherName)!} />
              <AvatarFallback>
                {getAvatar(autherName) ? "" : autherName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="dark:text-white text-slate-800 font-bold  py-1 px-4 text-md ">
              {" "}
              {autherName}
            </h3>
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
                  <GoCommentDiscussion className="dark:text-white text-slate-800 hover:text-white" />
                )}
                {isDiscussionsLoading && (
                  <ReloadIcon className="dark:text-white text-slate-800 hover:text-white h-4 w-4 animate-spin" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex text-xs justify-center items-center dark:text-white text-slate-800 mb-2">
          {index! <= 2 && (
            <BiMedal
              className={clsx(
                "w-7 h-7",
                index === 0 && "text-yellow-500",
                index === 1 && "text-slate-300",
                index === 2 && "text-amber-600"
              )}
            />
          )}{" "}
          {`( ${file.characterCount.toLocaleString("en-US")} characters ) `}
          {file.status === "incomplete" && (
            <div className="ml-2">
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
