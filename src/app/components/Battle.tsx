
import { BiPlay } from 'react-icons/bi'

import { CSSBATTLE_URL } from "@/config";
import { IBattleResult } from "@/interfaces/IBattle";
import Card from "./Card";

const Battle = ({ battleResults }: { battleResults: IBattleResult }) => {

    const handleClickToPlay = (level: string) => {
        window.open(`${CSSBATTLE_URL}/play/${level}`, level);
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col ">
                    {
                        battleResults.files.map((folder, index) => (
                            <div key={index} className="sm:flex-col mb-10">
                                <div onClick={(() => handleClickToPlay(folder.folder))} className="px-2 lg:mx-0 mx-8 mt-4 cursor-pointer mb-5 w-fit">
                                    <h3 className="hover:bg-green-400 active:bg-green-400
                                    focus:outline-none focus:ring 
                                    focus:ring-blue-bg-yellow-400 
                                    flex justify-start items-center
                                    rounded-full bg-yellow-500 w-fit 
                                    text-white text-lg font-bold py-1 px-4 text-md">
                                        LEVEL: {folder.folder}
                                        <BiPlay className="ml-2 text-white" />
                                    </h3>
                                </div>

                                <div className="flex lg:gap-4 md:gap-4 gap-0 flex-wrap lg:justify-start justify-center">
                                    {
                                        folder.files?.map((file, index) => (
                                            <Card key={index} folder={folder.folder} file={file} index={index} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Battle;