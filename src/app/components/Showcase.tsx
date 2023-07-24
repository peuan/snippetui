import Iframe from "react-iframe";
import { BiLinkExternal, BiCode } from 'react-icons/bi'
import { Avatar, Loading } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { useState } from "react";

import { GITHUB_URL } from "@/config";
import { IShowCase, IShowCaseResult } from "@/interfaces/IShowCase";



const ShowCase = ({ showCaseResults }: { showCaseResults: IShowCaseResult }) => {
    const router = useRouter()
    const [currentSelected, setCurrentSelected] = useState("")

    const handleClicktoGithubRepo = (folder: string, file: string) => {
        window.open(`${GITHUB_URL}/blob/main/public/showcase/${folder}/${file}`, file);
    }

    const handleClickToPlayground = (folder: string, file: string) => {
        let fileName = file.split('.')[0];

        setCurrentSelected(`/playground/${folder}/${fileName}`)
        router.push(`/playground/showcase/${folder}/${fileName}`)
    }


    const renderFolderCards = () => {
        return showCaseResults.files.map((folder, index) => (
            <div key={index} className="sm:flex-col gap-16 mt-10">
                <div className="flex lg:gap-4 md:gap-4 gap-0 flex-wrap lg:justify-start justify-center">
                    {renderFilePreviews(folder)}
                </div>
            </div>
        ));
    };

    const renderFilePreviews = (folder: IShowCase) => {
        return folder.files?.map((file, index) => {
            const fileName = file.fileName.split('.')[0]
            return (
                <div className="overflow-hidden bg-slate-900 box-content mobile-scale rounded-[30px] border-[1px] hover:border-yellow-400 active:border-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg shadow-blue-600" key={index}>

                    <div className="flip-card overflow-hidden">
                        <div className="flip-card-inner flex justify-center items-center lg:scale-100">
                            <Iframe
                                title={file.fileName}
                                overflow="hidden"
                                className="flip-card-front"
                                url={`showcase/${folder.folder}/${file.fileName}`}
                            />
                            <div className="flip-card-back">
                                <Iframe
                                    title={file.fileName}
                                    overflow="hidden"
                                    className="w-[380px] h-[280px]"
                                    url={`showcase/${folder.folder}/${file.fileName}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-2 px-2">
                        <div className="flex justify-center mb-2">
                            <div className="rounded-full bg-slate-800 flex items-center px-2">
                                <Avatar
                                    rounded
                                    className="ml-[-8px]"
                                    text={file.auther}
                                />
                                <h3 className="text-white font-bold py-1 px-4 text-md ">
                                    {" "}
                                    {file.name}
                                </h3>
                                <button onClick={(() => handleClicktoGithubRepo(folder.folder, file.fileName))}>
                                    <BiLinkExternal className="text-white" />
                                </button>
                                <button className="ml-6" onClick={(() => handleClickToPlayground(folder.folder, file.fileName))}>
                                    {currentSelected !== `/playground/${folder.folder}/${fileName}` && (
                                        <BiCode className="text-white" />
                                    )}
                                    {currentSelected === `/playground/${folder.folder}/${fileName}` && (
                                        <Loading color="success" size="xs" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex text-sm justify-center items-center text-white mb-2">
                            {file.tags?.map((tag, index) => {
                                return (
                                    <Badge size={'xs'} key={index} disableOutline variant={'flat'} color="primary" className="mr-2">{tag}</Badge>
                                )
                            })}
                        </div>
                    </div>

                </div >
            );
        });
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="flex justify-center gap-4 flex-wrap">
                    {renderFolderCards()}
                </div>
            </div>
        </>
    );
}

export default ShowCase;