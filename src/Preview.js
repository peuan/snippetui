import React, { useEffect, useState } from "react";
import axios from "axios";
import Iframe from "react-iframe";

const FolderList = () => {
  const [folders, setFolders] = useState([]);

  const fetchFolderData = async () => {
    try {
      const allFolders = await axios.get("/css-battle/");
      const folderData = allFolders.data;
      const allFiles = await fetchFiles(folderData);
      setFolders(allFiles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFolderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFiles = async (folderList) => {
    try {
      const requests = folderList.map((folder) =>
        axios.get(`/css-battle/${folder}`)
      );
      const responses = await Promise.all(requests);

      const fileDataPromises = responses.map(async (response, index) => {
        const filesDataResponse = {
          folder: folderList[index],
          files: response.data,
        };
        return filesDataResponse;
      });

      const fileData = await Promise.all(fileDataPromises);
      return fileData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const renderFolderCards = () => {
    return folders.map((folder, index) => (
      <div key={index} className="flex gap-32">
        <h3 className="text-green-500 text-2xl font-bold">
          Challenge: {folder.folder}
        </h3>
        <div className="flex gap-5">{renderFilePreviews(folder)}</div>
      </div>
    ));
  };

  const renderFilePreviews = (folder) => {
    return folder.files?.map((file, index) => {
      return (
        <div key={index}>
          <div className="flex justify-center p-2">
            <div className=" bg-gray-600">
              <h3 className="text-white font-bold py-2 px-4 text-md">
                {" "}
                {file.split("_")[0]}
              </h3>
            </div>
          </div>
          <div className="flex justify-center relative w-[300px] h-[300px]">
            <Iframe url={`css-battle/${folder.folder}/${file}`} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-[50px] font-bold text-center p-10 text-yellow-400">
        CSSBattle
      </h1>
      <div className=" p-3 flex flex-col justify-center ">
        {renderFolderCards()}
      </div>
    </div>
  );
};

export default FolderList;
