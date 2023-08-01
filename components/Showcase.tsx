import { IShowCaseResult } from "@/interfaces/IShowCase"
import Card from "@/components/ShowCaseCard"

const ShowCase = ({
  showCaseResults,
}: {
  showCaseResults: IShowCaseResult
}) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center gap-4 flex-wrap">
          {showCaseResults.files.map((folder, index) => (
            <div key={index} className="sm:flex-col gap-16 mt-10">
              <div className="flex lg:gap-4 md:gap-4 gap-0 flex-wrap lg:justify-start justify-center">
                {folder.files?.map((file, index) => (
                  <Card key={index} folder={folder.folder} file={file} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ShowCase
