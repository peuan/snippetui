"use client"

import { useEffect, useRef, useState } from "react";

const Preview = ({ code }: { code: string }) => {
    const iframeRef = useRef<any>()


    useEffect(() => {
        if (iframeRef.current) {
            const document = iframeRef.current.contentDocument;
            const documentContents = `${code}`

            document.open();
            document.write(documentContents);
            document.close();
        }

    }, [code])
    return (

        <div className="target-container">
            <iframe title="result" className="preview-iframe min-h-[90vh]" ref={iframeRef} />
        </div >

    );
}

export default Preview;
