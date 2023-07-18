"use client"
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import Loading from "@/app/components/Loading";

const Playground = ({ params }: { params: { slug: [] } }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState<string>("")

    const path = params.slug?.join('/');

    const apiPath = path?.includes('battle') ? `/api/battle-detail/${path?.replace('battle', '')}` : `/api/showcase-detail/${path?.replace('showcase', '')}`
    const fetchFolderData = async () => {
        try {
            const res = await fetch(apiPath, {
                method: "GET",
            });
            const { file } = await res.json();
            setResult(file)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    };


    useEffect(() => {
        setIsLoading(true)
        if (path) {
            fetchFolderData();
        } else {
            setIsLoading(false)

        }
    }, []);

    return (
        <>
            {isLoading && (
                <Loading />
            )}

            {!isLoading && (
                <Editor result={result} />
            )}
        </>
    )
}

export default Playground;