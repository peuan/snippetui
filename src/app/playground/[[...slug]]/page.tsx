"use client"
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import Loading from "@/app/components/Loading";
import Preview from "@/app/components/Preview";

const Playground = ({ params }: { params: { slug: [] } }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState<string>("")
    const [code, setCode] = useState<string>("")

    const path = params.slug?.join('/')

    const fetchFolderData = async () => {
        try {
            const res = await fetch(`/api/getFile/${path}`, {
                method: "GET",
            });
            const { file } = await res.json();
            setResult(file)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
            setCode(result)
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

    const handleChildValueChange = (value: string) => {
        setCode(value);
    };

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