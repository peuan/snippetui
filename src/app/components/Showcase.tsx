import Iframe from "react-iframe";
import { BiLinkExternal, BiCode } from 'react-icons/bi'
import { Avatar, Loading } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { Badge } from "@nextui-org/react";
import { GITHUB_URL } from "@/config";
import { IShowCase, IShowCaseResult } from "@/interfaces/IShowCase";

const handleClickToCode = (folder: string, file: string) => {
    window.open(`${GITHUB_URL}/blob/main/public/showcase/${folder}/${file}`, file);

}

const ShowCase = ({ showCaseResults }: { showCaseResults: IShowCaseResult }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [currentLoading, setCurrentLoading] = useState("")


    const handleClickToPlayground = (folder: string, file: string) => {
        setIsLoading(true)
        setCurrentLoading(`/playground/${folder}/${file.split('.')[0]}`)
        router.push(`/playground/showcase/${folder}/${file.split('.')[0]}`)
    }


    const renderFolderCards = () => {
        return showCaseResults.files.map((folder, index) => (
            <div key={index} className="sm:flex-col gap-16 mt-10">
                <div className="flex gap-4 flex-wrap lg:justify-start justify-center">
                    {renderFilePreviews(folder)}
                </div>
            </div>
        ));
    };

    const renderFilePreviews = (folder: IShowCase) => {
        return folder.files?.map((file, index) => {
            return (
                <div key={index}>
                    <div className="flex justify-center mb-2">
                        <div className="rounded-full  bg-blue-600 flex items-center px-2">
                            <Avatar
                                rounded
                                className="ml-[-8px]"
                                text={file.auther}
                            />
                            <h3 className="text-white font-bold py-1 px-4 text-md ">
                                {" "}
                                {file.name}
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
                        {file.tags?.map((tag, index) => {
                            return (
                                <Badge size={'xs'} key={index} disableOutline variant={'flat'} color="primary" className="mr-2">{tag}</Badge>
                            )
                        })}
                    </div>
                    <div className="flip-card">
                        <div className="flip-card-inner flex justify-center items-center lg:scale-100 mobile-scale rounded-[20px] border-[4px] hover:border-yellow-400 active:border-yellow-400 focus:outline-none focus:ring focus:ring-blue-bg-yellow-400 shadow-lg shadow-blue-600">
                            <Iframe
                                overflow="hidden"
                                className="flip-card-front w-[400px] h-[300px] rounded-[20px] p-2"
                                url={`showcase/${folder.folder}/${file.fileName}`}
                            />
                            <div className="flip-card-back">
                                <Iframe
                                    overflow="hidden"
                                    className="w-[400px] h-[300px] rounded-[20px] p-1"
                                    url={`showcase/${folder.folder}/${file.fileName}`}
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
                <div className="flex gap-4 justify-center  flex-wrap">
                    {renderFolderCards()}
                </div>
            </div>
        </>
    );
}

export default ShowCase;