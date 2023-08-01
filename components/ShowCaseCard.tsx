import { BiCode, BiLinkExternal } from "react-icons/bi"
import Iframe from "react-iframe"
import { GITHUB_URL } from "@/config"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IShowCaseFile } from "@/interfaces/IShowCase"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
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
    <div className="overflow-hidden bg-yellow-200 dark:bg-slate-900 box-content mobile-scale rounded-[30px] border-[1px] hover:border-yellow-400 active:border-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg shadow-blue-600">
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
          <div className="rounded-full bg-yellow-300 dark:bg-slate-800 flex items-center px-2">
            <h3 className="dark:text-white text-slate-800 font-bold py-2 px-4 text-md ">
              {" "}
              {file.name}
            </h3>
            <button onClick={() => handleClicktoGithubRepo()}>
              <BiLinkExternal className="dark:text-white text-slate-800 hover:text-white" />
            </button>
            <button className="ml-6" onClick={() => handleClickToPlayground()}>
              {!isLoading && (
                <BiCode className="dark:text-white text-slate-800 hover:text-white" />
              )}
              {isLoading && (
                <ReloadIcon className="dark:text-white text-slate-800 mr-2 h-4 w-4 animate-spin hover:text-white" />
              )}
            </button>
          </div>
        </div>

        <div className="flex text-sm justify-center items-center dark:text-white text-slate-800 mb-2">
          {file.tags?.map((tag, index) => {
            return (
              <Badge
                variant={"default"}
                key={index}
                className="dark:text-white bg-slate-500 dark:bg-blue-500 mr-2"
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
