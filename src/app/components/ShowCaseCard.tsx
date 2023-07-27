import { BiCode, BiLinkExternal } from "react-icons/bi";
import Iframe from "react-iframe";
import { Avatar, Badge, Loading } from "@nextui-org/react";
import { GITHUB_URL } from "@/config";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { IShowCaseFile } from "@/interfaces/IShowCase";

const Card = ({ folder, file }: { folder: string, file: IShowCaseFile }) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const handleClicktoGithubRepo = () => {
        window.open(`${GITHUB_URL}/blob/main/public/showcase/${folder}/${file.fileName}`, file.fileName);
    }

    const handleClickToPlayground = () => {
        console.log('hello')
        setIsLoading(true)

        router.push(`/playground/showcase/${folder}/${file.fileName.replace('.html', '')}`)
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
                        <Avatar
                            rounded
                            className="ml-[-8px]"
                            text={file.auther}
                        />
                        <h3 className="text-white font-bold py-1 px-4 text-md ">
                            {" "}
                            {file.name}
                        </h3>
                        <button onClick={(() => handleClicktoGithubRepo())}>
                            <BiLinkExternal className="text-white" />
                        </button>
                        <button className="ml-6" onClick={(() => handleClickToPlayground())}>
                            {!isLoading && (
                                <BiCode className="text-white" />
                            )}
                            {isLoading && (
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
}

export default Card;