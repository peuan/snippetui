import { useEffect, useRef } from "react"
import Loading from "./Loading"

const Preview = ({
  code,
  isLoading,
}: {
  code: string | undefined
  isLoading?: boolean
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      // Get the contentWindow of the iframe
      const iframeWindow = iframeRef.current.contentWindow
      if (iframeWindow) {
        // Get the document of the iframe
        const iframeDocument = iframeWindow.document

        // Clear the existing content
        iframeDocument.body.innerHTML = ""

        // Write the new code directly to the body of the document
        iframeDocument.body.innerHTML = code || ""
      }
    }
  }, [code])

  return (
    <div className="relative w-full">
      {isLoading && <Loading />}
      <iframe title="result" className="preview-iframe mt-10" ref={iframeRef} />
    </div>
  )
}

export default Preview
