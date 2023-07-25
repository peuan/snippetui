"use client"
import { useEffect, useRef, useState } from "react";
import Editor from "@/components/Editor";
import Loading from "@/components/Loading";
import { useGetCodeByPathQuery } from "@/redux/services/playgroundApi";
import { usePostMessageQuery } from "@/redux/services/chatGPTApi";
import { BiSolidSend } from 'react-icons/bi'
import { Loading as LoadingButton } from "@nextui-org/react";
import clsx from 'clsx'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { setChatGPTApiKey } from "@/redux/features/chatGPTSlice";
import Image from "next/image";
const Playground = ({ params }: { params: { slug: [] } }) => {
    const [message, setMessage] = useState("")
    const [chatMessage, setChatMessage] = useState("")
    const [apiKey, setApiKey] = useState("")
    const [isInvalidInput, setIsInvalidInput] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const path = params.slug?.join('/');
    var apiPath = ''
    if (path?.includes('battle')) {
        apiPath = `battle-detail/${path?.replace('battle', '')}`
    }
    if (path?.includes('showcase')) {
        apiPath = `showcase-detail/${path?.replace('showcase', '')}`
    }
    const { isLoading: isFetching, data, error } = useGetCodeByPathQuery({ path: apiPath }, { skip: path === undefined });
    const { isLoading: isLoadingMessage, isFetching: isFetchingMessage, data: dataMessage, error: errorMessage } = usePostMessageQuery({ message: message, apiKey: apiKey }, { skip: message === "" });
    const chatGPTApiKey = useAppSelector((state) => state.chatGPTReducer.apiKey);


    const [isCallingApi, setIsCallingApi] = useState(isLoadingMessage);
    const [isInvalidApiKey, setIsInvalidApiKey] = useState(false);

    const [code, setCode] = useState(data?.code)
    const inputRef = useRef<any>()
    const dispatch = useAppDispatch();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!isInvalidInput) {
            setMessage(chatMessage)
        }

        if (chatMessage) {
            setIsCallingApi(true)
            setIsInvalidInput(false)
        } else {
            setIsInvalidInput(true)
        }
        setChatMessage("")
        setIsInvalidInput(false)
    }

    const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChatMessage(event.target.value)
        if (event.target.value) {
            setIsInvalidInput(false)
        } else {
            setIsInvalidInput(true)
        }
    }

    const onApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(event.target.value)
        if (event.target.value) {
            setIsInvalidApiKey(false)
        } else {
            setIsInvalidApiKey(true)
        }
    }

    const onSubmitApiKey = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!isInvalidApiKey && apiKey) {
            dispatch(setChatGPTApiKey({ apiKey: apiKey }))
            setIsDialogOpen(false)
            setTimeout(() => {
                inputRef.current.focus();

            }, 200)
        } else {
            setIsInvalidApiKey(true)
        }
    }

    const onOpenDialog = () => {
        setIsInvalidApiKey(false)
        setIsDialogOpen(!isDialogOpen)
        setApiKey(chatGPTApiKey)
    }
    useEffect(() => {
        setCode(dataMessage?.message);
        setIsCallingApi(false)
    }, [dataMessage])

    useEffect(() => {
        setCode(data?.code);
        setIsCallingApi(false)
    }, [data?.code])
    return (
        <div>
            {isFetching && (
                <Loading />
            )}

            {!isFetching && (
                <div>
                    <div className="flex lg:flex-row flex-col w-full lg:justify-start justify-center lg:items-center items-center lg:pb-0 pb-4">
                        <form onSubmit={onSubmit} className="ml-2 flex flex-row lg:w-[38%] w-[90%]">
                            <div className={clsx(`flex w-full flex-grow relative border-2 bg-white rounded-md  dark:text-white  shadow-xs dark:shadow-xs`,
                                isInvalidInput && "border-red-500"
                            )}>
                                <Input ref={inputRef} disabled={!chatGPTApiKey} onChange={((event) => onMessageChange(event))} value={chatMessage} placeholder="Send a message" className="border-none" />
                                <Button type="submit" variant={'ghost'} className="p-2 text-green-600" disabled={isCallingApi || !chatGPTApiKey}>
                                    {isCallingApi && (
                                        <LoadingButton color="success" size="xs" />
                                    )}
                                    {!isCallingApi && (
                                        <BiSolidSend />
                                    )}
                                </Button>
                            </div>
                        </form>

                        <Dialog open={isDialogOpen} onOpenChange={onOpenDialog}>
                            <DialogTrigger asChild>
                                <Button onClick={(() => onOpenDialog)} className=" border-transparent focus:border-transparent focus:ring-0 ml-2 lg:w-fit lg:mt-0 lg:mb-0 w-[90%] mt-4 mb-4 bg-indigo-500 hover:bg-indigo-600 h-11" variant="default">Get Started <Image className="ml-2" src={'/ChatGPT.svg'} alt="chatgpt" width={'30'} height={'30'} /></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]" >
                                <DialogHeader>
                                    <DialogTitle>Add Your ChatGPT API Key</DialogTitle>
                                    <DialogDescription>
                                        To start using our platform, you need to add your ChatGPT API key
                                    </DialogDescription>
                                    <DialogDescription className=" p-2 text-rose-600">
                                        Rest assured, your API key is safe with us. We take data security and privacy seriously and ensure that your information is protected.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={onSubmitApiKey}>
                                    <div className="flex justify-between items-end gap-4">
                                        <div className="items-center w-full">
                                            <Label htmlFor="name" className="text-right">
                                                API KEY
                                            </Label>
                                            <Input id="apiKey" type="password" onChange={((event) => onApiKeyChange(event))} value={apiKey} placeholder="Enter your ChatGPT API key here" className={clsx(`col-span-3`,
                                                isInvalidApiKey && "border-rose-500"
                                            )} />
                                        </div>
                                        <DialogFooter>
                                            <Button className="bg-indigo-500 hover:bg-indigo-600" type="submit">Save</Button>
                                        </DialogFooter>
                                    </div>

                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Editor isLoading={isCallingApi} code={code} />
                </div>
            )}

        </div>
    )
}

export default Playground;