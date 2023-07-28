import { BiCode, BiLinkExternal } from "react-icons/bi"
import Iframe from "react-iframe"
import { GITHUB_URL } from "@/config"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IShowCaseFile } from "@/interfaces/IShowCase"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Badge } from "./ui/badge"
const Card = ({ folder, file }: { folder: string; file: IShowCaseFile }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClicktoGithubRepo = () => {
    window.open(
      `${GITHUB_URL}/blob/main/public/showcase/${folder}/${file.fileName}`,
      file.fileName
    )
  }

  const handleClickToPlayground = () => {
    setIsLoading(true)

    router.push(
      `/playground/showcase/${folder}/${file.fileName.replace(".html", "")}`
    )
  }

  return (
    <div className="overflow-hidden bg-slate-900 box-content mobile-scale rounded-[30px] border-[1px] hover:border-yellow-400 active:border-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg shadow-blue-600">
      <div className="flip-card overflow-hidden">
        <div className="flip-card-inner flex justify-center items-center lg:scale-100">
          <Iframe
            title={file.fileName}
            overflow="hidden"
            className="flip-card-front"
            url={`showcase/${folder}/${file.fileName}`}
          />
          <div className="flip-card-back">
            <Iframe
              title={file.fileName}
              overflow="hidden"
              className="w-[380px] h-[280px]"
              url={`showcase/${folder}/${file.fileName}`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2 px-2">
        <div className="flex justify-center mb-2">
          <div className="rounded-full bg-slate-800 flex items-center px-2">
            <h3 className="text-white font-bold py-2 px-4 text-md ">
              {" "}
              {file.name}
            </h3>
            <button onClick={() => handleClicktoGithubRepo()}>
              <BiLinkExternal className="text-white" />
            </button>
            <button className="ml-6" onClick={() => handleClickToPlayground()}>
              {!isLoading && <BiCode className="text-white" />}
              {isLoading && (
                <ReloadIcon className="text-white mr-2 h-4 w-4 animate-spin" />
              )}
            </button>
          </div>
        </div>

        <div className="flex text-sm justify-center items-center text-white mb-2">
          {file.tags?.map((tag, index) => {
            return (
              <Badge
                variant={"destructive"}
                key={index}
                className="bg-blue-500 mr-2"
              >
                {tag}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Card
