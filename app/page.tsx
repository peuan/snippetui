"use client"

// import libs
import { useCallback, useEffect, useRef, useState } from "react"
import { TbMoustache } from "react-icons/tb"
import {
  AiFillSound,
  AiOutlineCaretDown,
  AiOutlineCaretUp,
} from "react-icons/ai"
import clsx from "clsx"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import debounce from "lodash.debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

// import component
import Battle from "@/components/Battle"
import ShowCase from "@/components/Showcase"
import Loading from "@/components/Loading"
import ScrollToTop from "@/components/ScrollToTop"

// import reducer
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setBattleResult } from "@/redux/features/battleSlice"
import { setShowCaseResult } from "@/redux/features/showCaseSlice"
import { setPage } from "@/redux/features/pageSlice"

// import api services
import { useGetBattlesQuery } from "@/redux/services/battleApi"
import { useGetShowCasesQuery } from "@/redux/services/showCaseApi"

// import interface
import { IPages } from "@/interfaces/IPage"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sorting } from "@/types/sorting.enum"

// items per page
const ITEMS_PER_PAGE = 3

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams: any = useSearchParams()!

  const battleResults = useAppSelector((state) => state.battleReducer)

  const showCaseResults = useAppSelector((state) => state.showCaseReducer)
  const currentPage = useAppSelector((state) => state.pageReducer.page)
  const pageNumber = useAppSelector((state) => state.pageReducer.pageNumber)

  const [totalPages, setTotalPages] = useState(1)
  const [sorting, setSorting] = useState<Sorting>(Sorting.DESC)
  const [paginationValue, setPaginationValue] = useState<any>(pageNumber)
  const audioRef = useRef<any>(null)
  const {
    isLoading: battleLoading,
    isFetching: battleIsFetching,
    data: battleData,
    error: battleError,
  } = useGetBattlesQuery(
    { pageNumber: pageNumber, sorting: sorting },
    { skip: currentPage !== "BATTLE" }
  )
  const {
    isLoading: showCaseLoading,
    isFetching: showCaseFetching,
    data: showCaseData,
    error: showCaseError,
  } = useGetShowCasesQuery(
    { pageNumber: pageNumber },
    { skip: currentPage !== "SHOWCASE" }
  )

  const dispatch = useAppDispatch()

  const createQueryString = useCallback(
    (
      type: string,
      typeValue: string,
      page: string,
      pageValue: string,
      sorting: string,
      sortingValue: Sorting
    ) => {
      const params = new URLSearchParams(searchParams)
      params.set(type, typeValue)
      params.set(page, pageValue)

      if (currentPage === "BATTLE") {
        params.set(sorting, sortingValue)
      } else {
        params.delete("sorting")
      }

      return params.toString()
    },
    [currentPage, searchParams]
  )

  useEffect(() => {
    const type = searchParams.get("type")
    const page = searchParams.get("page")
    const sorting = searchParams.get("sorting")
    if (type && page && sorting) {
      setPaginationValue(Number(page))
      setSorting(sorting.toUpperCase())
      dispatch(setPage({ page: type.toUpperCase(), pageNumber: Number(page) }))
    }
  }, [dispatch, searchParams])

  useEffect(() => {
    if (battleData && !battleLoading && currentPage === "BATTLE") {
      const total = Math.ceil(battleData.totalItems / ITEMS_PER_PAGE)
      setTotalPages(total)
      dispatch(
        setBattleResult({
          files: battleData.files,
          totalItems: total,
        })
      )

      router.push(
        pathname +
          "?" +
          createQueryString(
            "type",
            currentPage.toLocaleLowerCase(),
            "page",
            pageNumber.toString(),
            "sorting",
            sorting.toLocaleLowerCase() as unknown as any
          )
      )
    }
  }, [
    currentPage,
    pageNumber,
    battleData,
    dispatch,
    battleLoading,
    router,
    pathname,
    createQueryString,
    searchParams,
    sorting,
  ])

  useEffect(() => {
    if (showCaseData && !showCaseLoading && currentPage === "SHOWCASE") {
      const total = Math.ceil(showCaseData.totalItems / ITEMS_PER_PAGE)
      setTotalPages(total)
      dispatch(
        setShowCaseResult({
          files: showCaseData.files,
          totalItems: total,
        })
      )

      router.push(
        pathname +
          "?" +
          createQueryString(
            "type",
            currentPage.toLocaleLowerCase(),
            "page",
            pageNumber.toString(),
            "sorting",
            sorting.toLocaleLowerCase() as unknown as any
          )
      )
    }
  }, [
    currentPage,
    pageNumber,
    showCaseData,
    dispatch,
    showCaseLoading,
    router,
    pathname,
    createQueryString,
    sorting,
  ])

  // pagination
  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      const previousPage = pageNumber - 1
      setPaginationValue(previousPage)
      dispatch(setPage({ page: currentPage, pageNumber: previousPage }))
    }
  }
  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      const nextPage = pageNumber + 1
      setPaginationValue(nextPage)
      dispatch(setPage({ page: currentPage, pageNumber: nextPage }))
    }
  }

  // handle to display battle/showcase section
  const handlePageSection = (page: IPages) => {
    dispatch(setPage({ page: page.page, pageNumber: 1 }))
    setPaginationValue(1)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangePagination = useCallback(
    debounce((value: number) => {
      dispatch(setPage({ page: currentPage, pageNumber: value }))
    }, 500),
    [currentPage]
  )

  const onChangePage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const page = Number(event.target.value)
    if (page > 0 && page <= totalPages) {
      setPaginationValue(page)
      debouncedChangePagination(page)
    } else {
      setPaginationValue("")
    }
  }

  const handleOnSorting = (event: Sorting) => {
    setSorting(event)
    dispatch(setPage({ page: currentPage, pageNumber: 1 }))
    setPaginationValue(1)
  }
  return (
    <>
      <div className="mb-10">
        {(battleLoading || showCaseLoading) && <Loading />}
        <ScrollToTop />
        <div>
          <div className="flex flex-col justify-center items-center mt-2">
            <AiFillSound
              className="absolute mb-[120px] -ml-[250px] hover:cursor-pointer text-yellow-400 "
              onClick={() => audioRef.current.play()}
            />
            <h1 className="text-[50px] font-bold text-center px-2 py-2 text-yellow-400">
              <div className="flex items-center px-5">
                SnippetUI
                <TbMoustache className="ml-2" />
                <audio ref={audioRef} src={"/snippetUI.mp3"} />
              </div>
            </h1>
            <h6 className="text-[24px] font-light text-center px-2 pb-4 text-yellow-400">
              “Begin Your Coding Journey Here”
            </h6>
          </div>
          <div className="flex-col justify-center items-center gap-4">
            <div className="flex justify-center">
              <Button
                onClick={() =>
                  handlePageSection({ page: "BATTLE", pageNumber })
                }
                className={clsx(
                  "text-slate-800 dark:text-white hover:text-white font-bold py-2 px-4  rounded-l-full",
                  currentPage === "BATTLE" &&
                    "bg-slate-300 hover:bg-slate-400  dark:bg-blue-500  dark:hover:bg-blue-600",
                  currentPage === "SHOWCASE" &&
                    "bg-slate-400 hover:bg-slate-400  dark:bg-blue-700  dark:hover:bg-blue-600"
                )}
              >
                Battle
              </Button>
              <Button
                onClick={() =>
                  handlePageSection({ page: "SHOWCASE", pageNumber })
                }
                className={clsx(
                  "text-slate-800 dark:text-white hover:text-white font-bold py-2 px-4  rounded-r-full",
                  currentPage === "SHOWCASE" &&
                    "bg-slate-300 hover:bg-slate-400 dark:bg-blue-500  hover:dark:bg-blue-600",
                  currentPage === "BATTLE" &&
                    "bg-slate-400 hover:bg-slate-400 dark:bg-blue-700  hover:dark:bg-blue-600"
                )}
              >
                Showcase
              </Button>
            </div>
            {currentPage === "BATTLE" && (
              <div className="flex container lg:justify-end justify-center items-center gap-4  mt-4">
                <div className=" flex">
                  <Button
                    onClick={() => handleOnSorting(Sorting.ASC)}
                    className={clsx(
                      `rounded-full h-[30px!important] text-slate-800 dark:text-white hover:text-white text-xs  rounded-r-none bg-slate-400 hover:bg-slate-400  dark:bg-blue-700  dark:hover:bg-blue-800`,
                      sorting === Sorting.ASC &&
                        "bg-slate-300 hover:bg-slate-400 dark:bg-blue-500  hover:dark:bg-blue-600"
                    )}
                  >
                    ASC
                  </Button>

                  <Button
                    onClick={() => handleOnSorting(Sorting.DESC)}
                    className={clsx(
                      `rounded-full h-[30px!important] text-slate-800 dark:text-white hover:text-white text-xs bg-slate-400 hover:bg-slate-400  dark:bg-blue-700  dark:hover:bg-blue-800  rounded-l-none`,
                      sorting === Sorting.DESC &&
                        "bg-slate-300 hover:bg-slate-400 dark:bg-blue-500  hover:dark:bg-blue-600"
                    )}
                  >
                    DESC
                  </Button>
                </div>
              </div>
            )}
          </div>
          {currentPage === "BATTLE" && (
            <>
              <Battle battleResults={battleResults} />
            </>
          )}
          {currentPage === "SHOWCASE" && (
            <ShowCase showCaseResults={showCaseResults} />
          )}

          {!battleLoading && !showCaseLoading && (
            <div className="invisible lg:visible flex justify-center items-center mt-10 gap-6">
              <button
                className={clsx(
                  "hover:text-white w-[100px] bg-slate-400 hover:bg-slate-500 dark:bg-green-500  dark:hover:bg-green-700 text-slate-800 dark:text-white font-bold py-2 px-4  rounded-full",
                  pageNumber === 1 && "opacity-50 cursor-not-allowed"
                )}
                disabled={pageNumber === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                Page
                <Input
                  onChange={onChangePage}
                  type="number"
                  className="w-20 text-center rounded-full"
                  value={paginationValue!}
                  onBlur={() =>
                    paginationValue <= 0 ? setPaginationValue(pageNumber) : null
                  }
                  max={totalPages}
                  min={1}
                />
                of {totalPages}
              </div>
              <button
                className={clsx(
                  "w-[100px] hover:text-white bg-slate-400 hover:bg-slate-500 dark:bg-green-500  dark:hover:bg-green-700 text-slate-800 dark:text-white font-bold py-2 px-4  rounded-full",
                  pageNumber === totalPages && "opacity-50 cursor-not-allowed"
                )}
                disabled={pageNumber === totalPages}
                onClick={handleNextPage}
              >
                Next
              </button>
              <div className="fixed right-2 origin-top-right top-[50vh] rotate-90">
                <div className="visible lg:invisible flex justify-between w-[100px] bg-slate-500 dark:bg-green-500 py-2 px-2 rounded-full">
                  <button
                    onClick={handlePreviousPage}
                    className={clsx(
                      "hover:text-white text-slate-800 dark:text-white font-bold",
                      pageNumber === 1 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <BiLeftArrow />
                  </button>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-white text-xs font-bold">
                    {pageNumber} / {totalPages}
                  </div>

                  <button
                    onClick={handleNextPage}
                    className={clsx(
                      "hover:text-white text-slate-800 dark:text-white font-bold",
                      pageNumber === totalPages &&
                        "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <BiRightArrow />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
