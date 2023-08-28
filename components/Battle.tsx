import { BiPlay } from "react-icons/bi"

import { CSSBATTLE_URL } from "@/config"
import { IBattleResult } from "@/interfaces/IBattle"
import Card from "@/components/BattleCard"

const Battle = ({ battleResults }: { battleResults: IBattleResult }) => {
  const handleClickToPlay = (level: string) => {
    window.open(`${CSSBATTLE_URL}/play/${level}`, level)
  }

  return (
    <>
      <div className="flex justify-center ">
        <div className="flex flex-col lg:container ">
          {battleResults.files.map((folder, index) => (
            <div key={index} className="sm:flex-col mb-10">
              <div
                onClick={() => handleClickToPlay(folder.folder)}
                className="group px-2 lg:mx-0 mx-8 mt-4 cursor-pointer mb-5 w-fit hover:text-white"
              >
                <h3
                  className="hover:bg-slate-400 active:bg-slate-400 group-hover:text-white dark:hover:bg-green-400 active:dark:bg-green-400
                                    focus:outline-none focus:ring 
                                    focus:ring-blue-bg-yellow-400 
                                    flex justify-start items-center
                                    rounded-full bg-slate-300 text-slate-800 dark:bg-yellow-500 w-fit 
                                    dark:text-white font-bold py-1 px-4 text-sm"
                >
                  LEVEL: {folder.folder}
                  <BiPlay className="group-hover:text-white ml-2 text-slate-800 dark:text-white" />
                </h3>
              </div>

              <div className="flex  md:gap-4 gap-0 flex-wrap lg:justify-start justify-center">
                {folder.files?.map((file, index) => (
                  <Card
                    key={index}
                    folder={folder.folder}
                    file={file}
                    index={index}
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

export default Battle
