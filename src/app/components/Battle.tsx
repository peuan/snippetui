import { useState } from "react";
import { useRouter } from 'next/navigation'

import Iframe from "react-iframe";
import { BiLinkExternal, BiPlay, BiMedal, BiCode, BiInfoCircle, } from 'react-icons/bi'
import { FaHeartBroken } from 'react-icons/fa'
import { Avatar, Loading } from "@nextui-org/react";
import clsx from 'clsx'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { CSSBATTLE_URL, GITHUB_URL } from "@/config";
import { IBattle, IBattleResult } from "@/interfaces/IBattle";
import { Button } from "./ui/button";

const Battle = ({ battleResults }: { battleResults: IBattleResult }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [currentLoading, setCurrentLoading] = useState("")

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [description, setDescription] = useState<string | undefined>("");


    const handleClickToCode = (folder: string, file: string) => {
        window.open(`${GITHUB_URL}/blob/main/public/battle/${folder}/${file}`, file);
    }

    const handleClickToPlay = (level: string) => {
        window.open(`${CSSBATTLE_URL}/play/${level}`, level);

    }

    //handle dialog for display description
    const handleDialog = (description: string | undefined) => {
        setIsDialogOpen(true)
        setDescription(description)
    }

    const onOpenDialog = () => {
        setIsDialogOpen(!isDialogOpen)
    }

    const handleClickToPlayground = (folder: string, file: string) => {
        setIsLoading(true)

        let fileName = file.split('.')[0]

        setCurrentLoading(`/playground/${folder}/${fileName}`)

        router.push(`/playground/battle/${folder}/${fileName}`)
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
        return battleResults.files.map((folder, index) => (
            <div key={index} className="sm:flex-col mb-10">
                <div onClick={(() => handleClickToPlay(folder.folder))} className="px-2 lg:mx-0 mx-8 mt-4 cursor-pointer mb-5 w-fit">
                    <h3 className="hover:bg-green-400 active:bg-green-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 flex justify-start items-center rounded-full bg-yellow-500 w-fit text-white text-lg font-bold py-1 px-4 text-md ">
                        LEVEL: {folder.folder}
                        <BiPlay className="ml-2 text-white" />
                    </h3>
                </div>

                <div className="flex lg:gap-4 md:gap-4 gap-0 flex-wrap lg:justify-start justify-center">
                    {renderFilePreviews(folder)}
                </div>
            </div>
        ));
    };

    const renderFilePreviews = (folder: IBattle) => {
        return folder.files?.map((file, index) => {
            const autherName = file.fileName.split("_")[0];
            const fileName = file.fileName.split('.')[0];
            return (
                <div className="overflow-hidden bg-slate-900 box-content mobile-scale rounded-[30px] border-[1px] hover:border-yellow-400 active:border-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg shadow-blue-600" key={index}>

                    <div className="flip-card overflow-hidden">
                        <div className="flip-card-inner flex justify-center items-center lg:scale-100">
                            <Iframe
                                title={file.fileName}
                                overflow="hidden"
                                className="flip-card-front"
                                url={`battle/${folder.folder}/${file.fileName}`}
                            />
                            <div className="flip-card-back">
                                <Iframe
                                    title={file.fileName}
                                    overflow="hidden"
                                    className="w-[380px] h-[280px]"
                                    url={`battle/${folder.folder}/${file.fileName}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-2 px-2">
                        <div className="flex justify-center mb-2">
                            <div className="rounded-full bg-slate-800 flex items-center px-2">
                                <Avatar
                                    rounded
                                    src={getAvatar(autherName)!}
                                    className="ml-[-8px]"
                                    text={getAvatar(autherName) ? '' : autherName[0].toUpperCase()}
                                />
                                <h3 className="text-white font-bold py-1 px-4 text-md ">
                                    {" "}
                                    {autherName}
                                </h3>
                                <button onClick={(() => handleClickToCode(folder.folder, file.fileName))}>
                                    <BiLinkExternal className="text-white" />
                                </button>

                                <button className="ml-6" onClick={(() => handleClickToPlayground(folder.folder, file.fileName))}>

                                    {currentLoading !== `/playground/${folder.folder}/${fileName}` && (
                                        <BiCode className="text-white" />
                                    )}
                                    {isLoading && currentLoading === `/playground/${folder.folder}/${fileName}` && (
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
                            {file.status === "incomplete" && (
                                <div className="ml-2">
                                    <FaHeartBroken title="incomplete" className=" text-red-400" />
                                </div>
                            )}
                            {file.description && (
                                <div className="ml-2 flex justify-center items-center">
                                    <Button variant={file.color || 'destructive'} className="rounded-full" size={'sm'} onClick={(() => handleDialog(file.description))}>
                                        <BiInfoCircle />
                                    </Button>

                                    <Dialog open={isDialogOpen} onOpenChange={onOpenDialog}>
                                        <DialogContent className="sm:max-w-[425px]" >
                                            <DialogHeader>
                                                <DialogTitle> {description}</DialogTitle>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
                        </div>
                    </div>


                </div >
            );
        });
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col ">
                    {renderFolderCards()}
                </div>
            </div>
        </>
    );
}

export default Battle;