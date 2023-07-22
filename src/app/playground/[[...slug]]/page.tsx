"use client"
import { useEffect, useMemo, useState } from "react";
import Editor from "@/components/Editor";
import Loading from "@/components/Loading";
import { useGetCodeByPathQuery } from "@/redux/services/playgroundApi";

const Playground = ({ params }: { params: { slug: [] } }) => {

    const path = params.slug?.join('/');
    var apiPath = ''
    if (path?.includes('battle')) {
        apiPath = `battle-detail/${path?.replace('battle', '')}`
    }
    if (path?.includes('showcase')) {
        apiPath = `showcase-detail/${path?.replace('showcase', '')}`
    }
    const { isLoading, isFetching, data, error } = useGetCodeByPathQuery({ path: apiPath }, { skip: path === undefined });

    return (
        <>
            {isLoading && (
                <Loading />
            )}

            {!isLoading && (
                <Editor code={data?.code} />
            )}
        </>
    )
}

export default Playground;