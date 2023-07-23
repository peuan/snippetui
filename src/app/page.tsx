"use client";

import { useEffect, useState } from "react";
import Battle from "@/components/Battle";
import { TbMoustache } from 'react-icons/tb'
import ShowCase from "@/components/Showcase";
import clsx from 'clsx'
import Loading from '@/components/Loading'
import ScrollToTop from '@/components/ScrollToTop';

import { setBattleResult } from "@/redux/features/battleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useGetBattlesQuery } from "@/redux/services/battleApi";
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { setShowCaseResult } from "./redux/features/showCaseSlice";
import { useGetShowCasesQuery } from "./redux/services/showCaseApi";
import { IPages } from "./interfaces/IPage";

const ITEMS_PER_PAGE = 3;

export default function Home() {
  const battleResults = useAppSelector((state) => state.battleReducer);
  const totalPages = useAppSelector((state) => state.battleReducer.totalItems);

  const showCaseResults = useAppSelector((state) => state.showCaseReducer);

  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(1);

  const [currentPage, setCurrentPage] = useState<IPages>({ page: 'BATTLE' });

  const { isLoading: battleLoading, isFetching: battleIsFetching, data: battleData, error: battleError } = useGetBattlesQuery({ pageNumber: pageNumber }, { skip: currentPage.page !== 'BATTLE' });
  const { isLoading: showCaseLoading, isFetching: showCaseFetching, data: showCaseData, error: showCaseError } = useGetShowCasesQuery({ pageNumber: pageNumber }, { skip: currentPage.page !== 'SHOWCASE' });


  useEffect(() => {
    if (battleData && currentPage.page === "BATTLE" && !battleLoading) {
      const total = Math.ceil(battleData.totalItems / ITEMS_PER_PAGE);
      dispatch(setBattleResult({
        files: battleData.files,
        totalItems: total
      }
      ))

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentPage.page, pageNumber, battleData, dispatch, battleLoading]);

  useEffect(() => {
    if (showCaseData && currentPage.page === "SHOWCASE" && !showCaseLoading) {
      const total = Math.ceil(showCaseData.totalItems / ITEMS_PER_PAGE);
      dispatch(setShowCaseResult({
        files: showCaseData.files,
        totalItems: total
      }
      ))

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentPage.page, pageNumber, showCaseData, dispatch, showCaseLoading]);



  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      const previousPage = pageNumber - 1;
      setPageNumber(previousPage);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
    }
  };

  const onClickBattle = () => {
    setCurrentPage({ page: 'BATTLE' })
    setPageNumber(1);
  }

  const onClickShowCase = () => {
    setCurrentPage({ page: 'SHOWCASE' })
    setPageNumber(1);
  }
  return (
    <>

      <div className="mb-10">
        {(battleLoading || showCaseLoading) && (
          <Loading />
        )}
        <ScrollToTop />
        <div>
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className="text-[50px] font-bold text-center px-2 py-2 text-yellow-400">
              <div className="flex items-center px-5">SnippetUI
                <TbMoustache className="ml-2" />
              </div>
            </h1>
            <h6 className="text-[24px] font-light text-center px-2 pb-4 text-yellow-400">
              “Begin Your Coding Journey Here”
            </h6>

          </div>
          <div className="flex justify-center">

            <div className="inline-flex ">
              <button onClick={(() => onClickBattle())} className={clsx('text-white font-bold py-2 px-4  rounded-l-full',
                currentPage.page === "BATTLE" && 'bg-blue-700  hover:bg-blue-800',
                currentPage.page === "SHOWCASE" && 'bg-blue-500  hover:bg-blue-600',
              )
              }
              >
                Battle
              </button>

              <button onClick={(() => onClickShowCase())} className={clsx('text-white font-bold py-2 px-4  rounded-r-full',
                currentPage.page === "SHOWCASE" && 'bg-blue-700  hover:bg-blue-800',
                currentPage.page === "BATTLE" && 'bg-blue-500  hover:bg-blue-600',
              )
              }
              >
                Showcase
              </button>
            </div>
            h</div>
          {currentPage.page === 'BATTLE' && (
            <>
              <Battle battleResults={battleResults} />
            </>
          )}
          {currentPage.page === 'SHOWCASE' && (
            <ShowCase showCaseResults={showCaseResults} />
          )}


          {(!battleLoading && !showCaseLoading) && (
            <div className="invisible lg:visible flex justify-center items-center mt-10 gap-6">
              <button className={clsx('w-[100px] bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full',
                pageNumber === 1 && 'opacity-50 cursor-not-allowed',
              )
              }
                disabled={pageNumber === 1} onClick={handlePreviousPage}>
                Previous
              </button>
              <span className="text-white font-bold">{`Page ${pageNumber} of ${totalPages}`}</span>

              <button className={clsx('w-[100px] bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full',
                pageNumber === totalPages && 'opacity-50 cursor-not-allowed',
              )
              }
                disabled={pageNumber === totalPages} onClick={handleNextPage}>
                Next
              </button>
              <div className="fixed right-2 origin-top-right top-[50vh] rotate-90">
                <div className="visible lg:invisible flex justify-between w-[100px] bg-green-500 py-2 px-2 rounded-full">
                  <button onClick={handlePreviousPage} className={clsx(' hover:text-green-700 text-white font-bold',
                    pageNumber === 1 && 'opacity-50 cursor-not-allowed',
                  )
                  }>
                    <BiLeftArrow />
                  </button>
                  <span className="text-white text-xs font-bold">{`${pageNumber}/${totalPages}`}</span>
                  <button onClick={handleNextPage} className={clsx(' hover:text-green-700 text-white font-bold',
                    pageNumber === totalPages && 'opacity-50 cursor-not-allowed',
                  )
                  }>
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