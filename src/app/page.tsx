"use client";

import { useEffect, useState } from "react";
import Battle from "./components/Battle";
import { useCallback } from "react";
import { TbMoustache } from 'react-icons/tb'
import ShowCase from "./components/Showcase";
import clsx from 'clsx'
import Loading from './components/Loading'
import ScrollToTop from './components/ScrollToTop';

import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

interface PageProps {
  page: "BATTLE" | "SHOWCASE"
}
const ITEMS_PER_PAGE = 3; // Number of items per page

export default function Home() {

  const [currentPage, setCurrentPage] = useState<PageProps>({ page: 'BATTLE' });

  const [battleResults, setBattleResults] = useState([])

  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [showCaseResults, setShowCaseResults] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  const fetchAllBattle = async (page: number) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/battle/${page}`, {
        method: "GET",
      });
      const { files, totalItems } = await res.json();
      setBattleResults(files)
      const total = Math.ceil(totalItems / ITEMS_PER_PAGE);
      setTotalPages(total)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    }
  };


  const fetchAllShowCase = async (page: number) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/showcase/${page}`, {
        method: "GET",
      });
      const { files, totalItems } = await res.json();
      setShowCaseResults(files)
      const total = Math.ceil(totalItems / ITEMS_PER_PAGE);
      setTotalPages(total)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    }
  };


  useEffect(() => {
    if (currentPage.page === "BATTLE") {
      fetchAllBattle(pageNumber);
    }
  }, [currentPage.page, pageNumber]);


  useEffect(() => {
    if (currentPage.page === "SHOWCASE") {
      fetchAllShowCase(pageNumber);

    }
  }, [currentPage.page, pageNumber]);



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
        {isLoading && (
          <Loading />
        )}
        <ScrollToTop />
        <div>
          <h1 className="flex justify-center items-center text-[50px] font-bold text-center p-2 text-yellow-400">
            <div className="flex items-center px-5">CSSBrother
              <TbMoustache className="ml-2" />
            </div>
          </h1>
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
          </div>
          {currentPage.page === 'BATTLE' && (
            <>
              <Battle files={battleResults} />
            </>
          )}
          {currentPage.page === 'SHOWCASE' && (
            <ShowCase files={showCaseResults} />
          )}


          {!isLoading && (
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