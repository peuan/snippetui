"use client"
import { useEffect, useRef, useState } from "react"
import { BiSolidSend } from "react-icons/bi"
import clsx from "clsx"
import Image from "next/image"
import { ReloadIcon } from "@radix-ui/react-icons"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Editor from "@/components/Editor"
import Loading from "@/components/Loading"
import { useGetCodeByPathQuery } from "@/redux/services/playgroundApi"
import { usePostMessageMutation } from "@/redux/services/chatGPTApi"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { setChatGPTApiKey } from "@/redux/features/chatGPTSlice"
import { reset } from "@/redux/features/toastSlice"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const Playground = ({ params }: { params: { slug: [] } }) => {
  const path = params.slug?.join("/")
  var apiPath = ""
  if (path?.includes("battle")) {
    apiPath = `battle-detail/${path?.replace("battle", "")}`
  }
  if (path?.includes("showcase")) {
    apiPath = `showcase-detail/${path?.replace("showcase", "")}`
  }

  const {
    isLoading: isFetching,
    data,
    error,
  } = useGetCodeByPathQuery({ path: apiPath }, { skip: path === undefined })

  const [sendMessage, sendMessageResult] = usePostMessageMutation()
  const chatGPTApiKey = useAppSelector((state) => state.chatGPTReducer.apiKey)
  const toastResult = useAppSelector((state) => state.toastReducer.title)
  const [chatMessage, setChatMessage] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isInvalidMessage, setIsInvalidMessage] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isInvalidApiKey, setIsInvalidApiKey] = useState(false)
  const [code, setCode] = useState(data?.code)

  const { toast } = useToast()

  const inputRef = useRef<any>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (toastResult) {
      toast({
        variant: "destructive",
        title: toastResult,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      dispatch(reset())
    }
  }, [dispatch, toast, toastResult])

  useEffect(() => {
    setCode(sendMessageResult?.data?.message)
  }, [sendMessageResult?.data?.message])

  useEffect(() => {
    setCode(data?.code)
  }, [data?.code])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (chatMessage) {
      sendMessage({ message: chatMessage, apiKey: apiKey })
      setIsInvalidMessage(false)
      setChatMessage("")
    } else {
      setIsInvalidMessage(true)
    }
  }

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(event.target.value)
    if (event.target.value) {
      setIsInvalidMessage(false)
    } else {
      setIsInvalidMessage(true)
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
        inputRef.current.focus()
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

  return (
    <div>
      {isFetching && <Loading />}
      {!isFetching && (
        <div>
          <div className="flex lg:flex-row flex-col w-full lg:justify-start justify-center lg:items-center items-center lg:pb-0 pb-4">
            <form
              onSubmit={onSubmit}
              className="ml-2 flex flex-row lg:w-[38%] w-[90%]"
            >
              <div
                className={clsx(
                  `flex w-full flex-grow relative border-2 bg-white rounded-md  dark:text-white  shadow-xs dark:shadow-xs`,
                  isInvalidMessage && "border-red-500"
                )}
              >
                <Input
                  ref={inputRef}
                  disabled={!chatGPTApiKey}
                  onChange={(event) => onMessageChange(event)}
                  value={chatMessage}
                  placeholder="Send a message"
                  className="border-none dark:text-slate-800"
                />
                <Button
                  type="submit"
                  variant={"ghost"}
                  className="p-2 text-green-600"
                  disabled={sendMessageResult.isLoading || !chatGPTApiKey}
                >
                  {sendMessageResult.isLoading && (
                    <ReloadIcon className="text-green mr-2 h-4 w-4 animate-spin" />
                  )}
                  {!sendMessageResult.isLoading && <BiSolidSend />}
                </Button>
              </div>
            </form>

            <Dialog open={isDialogOpen} onOpenChange={onOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => onOpenDialog}
                  className="dark:text-white text-slate-800 hover:text-white border-transparent focus:border-transparent focus:ring-0 ml-2 lg:w-fit lg:mt-0 lg:mb-0 w-[90%] mt-4 mb-4 bg-slate-400 hover:bg-slate-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 h-11"
                  variant="default"
                >
                  Get Started{" "}
                  <Image
                    className="ml-2"
                    src={"/ChatGPT.svg"}
                    alt="chatgpt"
                    width={"30"}
                    height={"30"}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Your ChatGPT API Key</DialogTitle>
                  <DialogDescription>
                    To start using our platform, you need to add your ChatGPT
                    API key
                  </DialogDescription>
                  <DialogDescription className=" p-2 text-rose-600">
                    Rest assured, your API key is safe with us. We take data
                    security and privacy seriously and ensure that your
                    information is protected.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmitApiKey}>
                  <div className="flex justify-between items-end gap-4">
                    <div className="items-center w-full">
                      <Label htmlFor="name" className="text-right">
                        API KEY
                      </Label>
                      <Input
                        id="apiKey"
                        type="password"
                        onChange={(event) => onApiKeyChange(event)}
                        value={apiKey}
                        placeholder="Enter your ChatGPT API key here"
                        className={clsx(
                          `col-span-3`,
                          isInvalidApiKey && "border-rose-500"
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-slate-400 text-slate-800 hover:text-white dark:text-white hover:bg-slate-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        type="submit"
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Editor isLoading={sendMessageResult.isLoading} code={code} />
        </div>
      )}
    </div>
  )
}

export default Playground
