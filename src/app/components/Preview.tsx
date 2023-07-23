"use client"

import { useEffect, useRef } from "react";
import Loading from "./Loading";
const Preview = ({ code, isLoading }: { code: string | undefined, isLoading?: boolean }) => {
    const iframeRef = useRef<any>()

    useEffect(() => {
        if (iframeRef.current) {
            const document = iframeRef.current.contentDocument;
            const documentContents = `${code || ""}`
            document.open();
            document.write(documentContents);
            document.close();
        }

    }, [code])

    return (

        <div className="target-container">
            {isLoading && (
                <Loading />
            )}
            {!isLoading && (
                <>
                    <iframe title="result" className="preview-iframe" ref={iframeRef} />
                </>
            )}
        </div >

    );
}

export default Preview;
