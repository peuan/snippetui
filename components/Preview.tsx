"use client"

import { useEffect, useRef } from "react"
import Loading from "@/components/Loading"
const Preview = ({
  code,
  isLoading,
}: {
  code: string | undefined
  isLoading?: boolean
}) => {
  const iframeRef = useRef<any>()
  useEffect(() => {
    if (iframeRef.current) {
      // create a dom content with html code
      const document = iframeRef.current.contentDocument
      const documentContents = `${code || ""}`
      document.open()
      document.write(documentContents)
      document.close()
    }
  }, [code])

  return (
    <div className="relative w-full">
      {isLoading && <Loading />}
      <>
        <iframe
          title="result"
          className={`preview-iframe mt-10`}
          ref={iframeRef}
        />
      </>
    </div>
  )
}

export default Preview
