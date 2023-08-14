"use client"

import { useCallback, useEffect, useState } from "react"
import { TbMoustache } from "react-icons/tb"
import clsx from "clsx"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"

// import component
import Battle from "@/components/Battle"
import ShowCase from "@/components/Showcase"
import Loading from "@/components/Loading"
import ScrollToTop from "@/components/ScrollToTop"

// import reducer
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setBattleResult } from "@/redux/features/battleSlice"
import { setShowCaseResult } from "@/redux/features/showCaseSlice"

// import api services
import { useGetBattlesQuery } from "@/redux/services/battleApi"
import { useGetShowCasesQuery } from "@/redux/services/showCaseApi"

// import interface
import { IPages } from "@/interfaces/IPage"
import { setPage } from "@/redux/features/pageSlice"
import { Input } from "@/components/ui/input"
import debounce from "lodash.debounce"

// items per page
const ITEMS_PER_PAGE = 3

export default function Home() {
  const battleResults = useAppSelector((state) => state.battleReducer)

  const showCaseResults = useAppSelector((state) => state.showCaseReducer)
  const currentPage = useAppSelector((state) => state.pageReducer.page)
  const pageNumber = useAppSelector((state) => state.pageReducer.pageNumber)

  const [totalPages, setTotalPages] = useState(1)
  const [paginationValue, setPaginationValue] = useState<any>(pageNumber)

  const {
    isLoading: battleLoading,
    isFetching: battleIsFetching,
    data: battleData,
    error: battleError,
  } = useGetBattlesQuery(
    { pageNumber: pageNumber },
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

      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // })
    }
  }, [currentPage, pageNumber, battleData, dispatch, battleLoading])

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

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [currentPage, pageNumber, showCaseData, dispatch, showCaseLoading])

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

  const debouncedChangePagination = useCallback(
    debounce((value: number) => {
      dispatch(setPage({ page: currentPage, pageNumber: value }))
    }, 500),
    []
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

  return (
    <>
      <div className="mb-10">
        {(battleLoading || showCaseLoading) && <Loading />}
        <ScrollToTop />
        <div>
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className="text-[50px] font-bold text-center px-2 py-2 text-yellow-400">
              <div className="flex items-center px-5">
                SnippetUI
                <TbMoustache className="ml-2" />
              </div>
            </h1>
            <h6 className="text-[24px] font-light text-center px-2 pb-4 text-yellow-400">
              “Begin Your Coding Journey Here”
            </h6>
          </div>
          <div className="flex justify-center">
            <div className="inline-flex ">
              <button
                onClick={() =>
                  handlePageSection({ page: "BATTLE", pageNumber })
                }
                className={clsx(
                  "text-slate-800 dark:text-white hover:text-white font-bold py-2 px-4  rounded-l-full",
                  currentPage === "BATTLE" &&
                    "bg-slate-400 hover:bg-slate-400  dark:bg-blue-700  dark:hover:bg-blue-800",
                  currentPage === "SHOWCASE" &&
                    "bg-slate-300 hover:bg-slate-400  dark:bg-blue-500  dark:hover:bg-blue-600"
                )}
              >
                Battle
              </button>
              <button
                onClick={() =>
                  handlePageSection({ page: "SHOWCASE", pageNumber })
                }
                className={clsx(
                  "text-slate-800 dark:text-white hover:text-white font-bold py-2 px-4  rounded-r-full",
                  currentPage === "SHOWCASE" &&
                    "bg-slate-400 hover:bg-slate-400 dark:bg-blue-700  hover:dark:bg-blue-800",
                  currentPage === "BATTLE" &&
                    "bg-slate-300 hover:bg-slate-400 dark:bg-blue-500  hover:dark:bg-blue-600"
                )}
              >
                Showcase
              </button>
            </div>
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
                <div className="visible lg:invisible flex justify-between w-[200px] bg-slate-500 dark:bg-green-500 py-2 px-2 rounded-full">
                  <button
                    onClick={handlePreviousPage}
                    className={clsx(
                      "  hover:text-white text-slate-800 dark:text-white font-bold",
                      pageNumber === 1 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <BiLeftArrow />
                  </button>
                  <div className="flex items-center gap-2 text-slate-800 dark:text-white text-xs font-bold">
                    <Input
                      onChange={onChangePage}
                      type="number"
                      className="lg:w-20 w-20 h-[14px] text-center rounded-full"
                      value={paginationValue!}
                      onBlur={() =>
                        paginationValue <= 0
                          ? setPaginationValue(pageNumber)
                          : null
                      }
                      max={totalPages}
                      min={1}
                    />
                    / {totalPages}
                  </div>

                  <button
                    onClick={handleNextPage}
                    className={clsx(
                      " hover:text-white dark:hover:text-green-700 text-slate-800 font-bold",
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
