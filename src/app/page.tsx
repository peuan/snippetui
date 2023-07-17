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
  const [result, setResult] = useState([])
  const [currentPage, setCurrentPage] = useState<PageProps>({ page: 'BATTLE' });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFolderData = async (page: number) => {
    try {
      const res = await fetch(`/api/file/${page}`, {
        method: "GET",
      });
      const { files, totalItems } = await res.json();
      setResult(files)
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
    setIsLoading(true)
    fetchFolderData(pageNumber);
  }, []);

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      const previousPage = pageNumber - 1;
      setPageNumber(previousPage);
      fetchFolderData(previousPage);
    }
  };


  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      fetchFolderData(nextPage);
    }
  };

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
              <button onClick={(() => setCurrentPage({ page: 'BATTLE' }))} className={clsx('text-white font-bold py-2 px-4  rounded-l-full',
                currentPage.page === "BATTLE" && 'bg-blue-700  hover:bg-blue-800',
                currentPage.page === "SHOWCASE" && 'bg-blue-500  hover:bg-blue-600',
              )
              }
              >
                Battle
              </button>

              <button onClick={(() => setCurrentPage({ page: 'SHOWCASE' }))} className={clsx('text-white font-bold py-2 px-4  rounded-r-full',
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
              <Battle files={result} />
              {result && result.length > 0 && !isLoading && (
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
            </>
          )}
          {currentPage.page === 'SHOWCASE' && (
            <ShowCase />
          )}
        </div>

      </div>
    </>
  )
}