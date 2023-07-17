import Iframe from "react-iframe";
import { BiLinkExternal, BiPlay, BiMedal, BiCode } from 'react-icons/bi'
import { Avatar, Button, Loading } from "@nextui-org/react";
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from "react";
// import Loading from "./Loading";

interface FilesProps {
    folder: string;
    files: Array<{
        fileName: string;
        characterCount: number;
    }>;

}



const handleClickToCode = (folder: string, file: string) => {
    window.open(`https://github.com/peuan/css-battle/blob/main/public/css-battle/${folder}/${file}`, file);

}

const handleClickToPlay = (level: string) => {
    window.open(`https://cssbattle.dev/play/${level}`, level);

}


const Battle = ({ files }: { files: FilesProps[] }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [currentLoading, setCurrentLoading] = useState("")

    const handleClickToPlayground = (folder: string, file: string) => {
        setIsLoading(true)
        setCurrentLoading(`/playground/${folder}/${file.split('.')[0]}`)
        router.push(`/playground/${folder}/${file.split('.')[0]}`)
    }

    const getAvatar = (name: string) => {
        switch (name) {
            case 'niaw':
                return '/niaw.png'
            case 'first':
                return '/first.png'
            case 'chok':
                return '/chok.png'
            default:
                break;
        }
    }
    const renderFolderCards = () => {
        return files.map((folder, index) => (
            <div key={index} className="sm:flex-col gap-16 mt-10">
                <div onClick={(() => handleClickToPlay(folder.folder))} className="px-2 lg:mx-0 mx-2 cursor-pointer mb-5 w-fit">
                    <h3 className="hover:bg-green-400 active:bg-green-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 flex justify-start items-center rounded-full bg-yellow-500 w-fit text-white text-lg font-bold py-1 px-4 text-md ">
                        LEVEL: {folder.folder}
                        <BiPlay className="ml-2 text-white" />
                    </h3>
                </div>

                <div className="flex gap-4 flex-wrap lg:justify-start justify-center">
                    {renderFilePreviews(folder)}
                </div>
            </div>
        ));
    };

    const renderFilePreviews = (folder: FilesProps) => {
        return folder.files?.map((file, index) => {
            return (
                <div key={index}>
                    <div className="flex justify-center mb-2">
                        <div className="rounded-full bg-blue-600 flex items-center px-2">
                            <Avatar
                                rounded
                                src={getAvatar(file.fileName.split("_")[0])!}
                                className="ml-[-8px]"
                                text={getAvatar(file.fileName.split("_")[0]) ? '' : file.fileName.split("_")[0][0].toUpperCase()}
                            />
                            <h3 className="text-white font-bold py-1 px-4 text-md ">
                                {" "}
                                {file.fileName.split("_")[0]}
                            </h3>
                            <button onClick={(() => handleClickToCode(folder.folder, file.fileName))}>
                                <BiLinkExternal className="text-white" />
                            </button>

                            <button className="ml-6" onClick={(() => handleClickToPlayground(folder.folder, file.fileName))}>

                                {currentLoading !== `/playground/${folder.folder}/${file.fileName.split('.')[0]}` && (
                                    <BiCode className="text-white" />
                                )}
                                {isLoading && currentLoading === `/playground/${folder.folder}/${file.fileName.split('.')[0]}` && (
                                    <Loading color="success" size="xs" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex text-sm justify-center items-center text-white mb-2">
                        <BiMedal className={clsx('w-7 h-7',
                            index === 0 && 'text-yellow-500',
                            index === 1 && 'text-slate-300',
                            index === 2 && 'text-amber-600')} /> {`( ${file.characterCount.toLocaleString("en-US")} characters ) `}
                    </div>
                    <div className="flip-card">

                        <div className="flip-card-inner flex justify-center lg:scale-100 mobile-scale rounded-[20px] hover:bg-yellow-400 active:bg-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg shadow-blue-600">
                            <Iframe
                                overflow="hidden"
                                className="flip-card-front w-[400px] h-[300px] rounded-[20px] p-1"
                                url={`css-battle/${folder.folder}/${file.fileName}`}
                            />
                            <div className="flip-card-back">
                                <Iframe
                                    overflow="hidden"
                                    className="w-[400px] h-[300px] rounded-[20px] p-1"
                                    url={`css-battle/${folder.folder}/${file.fileName}`}
                                />
                            </div>
                        </div>
                    </div>
                </div >
            );
        });
    };


    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col">
                    {renderFolderCards()}
                </div>
            </div>
        </>
    );
}

export default Battle;