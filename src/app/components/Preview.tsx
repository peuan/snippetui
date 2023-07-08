import Iframe from "react-iframe";
import { BiLinkExternal, BiKnife, BiSolidGraduation, BiBomb } from 'react-icons/bi'
interface FilesProps {
    folder: string;
    files: string[]
}
const Preview = ({ files }: { files: FilesProps[] }) => {

    const handleClick = (folder: string, file: string) => {
        window.open(`https://github.com/peuan/css-battle/blob/main/public/css-battle/${folder}/${file}`, '_ blank');

    }
    const renderFolderCards = () => {
        return files.map((folder, index) => (
            <div key={index} className="flex gap-16 mt-10">
                <h3 className="text-green-500 text-lg font-bold">
                    Challenge: {folder.folder}
                </h3>
                <div className="flex gap-4 flex-wrap justify-center ">
                    {renderFilePreviews(folder)}
                </div>
            </div>
        ));
    };

    const renderFilePreviews = (folder: FilesProps) => {
        return folder.files?.map((file, index) => {
            return (
                <div key={index}>
                    <div className="flex justify-center p-2">
                        <div onClick={(() => handleClick(folder.folder, file))} className=" bg-gray-600 flex items-center px-2 cursor-pointer">
                            <h3 className="text-white font-bold py-2 px-4 text-md">
                                {" "}
                                {file.split("_")[0]}
                            </h3>
                            <BiLinkExternal className="text-white" />
                        </div>
                    </div>
                    <div className="flex justify-center rounded-[20px] hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white">
                        <Iframe
                            className=" w-[400px] h-[300px] rounded-[20px] p-1 "
                            url={`css-battle/${folder.folder}/${file}`}
                        />
                    </div>
                </div>
            );
        });
    };


    return (
        <>
            <div className="min-h-screen">
                <h1 className="flex justify-center items-center text-[50px] font-bold text-center p-10 text-yellow-400">
                    CSSBattle
                    <BiBomb className="ml-2" />
                </h1>
                <div className=" p-3 flex flex-col justify-center ">
                    {renderFolderCards()}
                </div>
            </div>
        </>
    );
}

export default Preview;