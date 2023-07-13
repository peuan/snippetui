"use client";

import { useEffect, useState } from "react";
import Battle from "./components/Battle";
import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { TbMoustache } from 'react-icons/tb'
import ShowCase from "./components/Showcase";
import clsx from 'clsx'

interface PageProps {
  page: "BATTLE" | "SHOWCASE"
}
const ITEMS_PER_PAGE = 3; // Number of items per page

export default function Home() {
  const [result, setResult] = useState([])
  const [currentPage, setCurrentPage] = useState<PageProps>({ page: 'BATTLE' });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
    }
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
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
        <Particles id="tsparticles" init={particlesInit}
          options={{
            "fullScreen": {
              "zIndex": 1
            },
            "emitters": {
              "position": {
                "x": 50,
                "y": 100
              },
              "rate": {
                "quantity": 5,
                "delay": 0.15
              }
            },
            "particles": {
              "color": {
                "value": [
                  "#1E00FF",
                  "#FF0061",
                  "#E1FF00",
                  "#00FF9E"
                ]
              },
              "move": {
                "decay": 0.05,
                "direction": "top",
                "enable": true,
                "gravity": {
                  "enable": true
                },
                "outModes": {
                  "top": "none",
                  "default": "destroy"
                },
                "speed": {
                  "min": 50,
                  "max": 100
                }
              },
              "number": {
                "value": 0
              },
              "opacity": {
                "value": 1
              },
              "rotate": {
                "value": {
                  "min": 0,
                  "max": 360
                },
                "direction": "random",
                "animation": {
                  "enable": true,
                  "speed": 30
                }
              },
              "tilt": {
                "direction": "random",
                "enable": true,
                "value": {
                  "min": 0,
                  "max": 360
                },
                "animation": {
                  "enable": true,
                  "speed": 30
                }
              },
              "size": {
                "value": 3,
                "animation": {
                  "enable": true,
                  "startValue": "min",
                  "count": 1,
                  "speed": 16,
                  "sync": true
                }
              },
              "roll": {
                "darken": {
                  "enable": true,
                  "value": 25
                },
                "enlighten": {
                  "enable": true,
                  "value": 25
                },
                "enable": true,
                "speed": {
                  "min": 5,
                  "max": 15
                }
              },
              "wobble": {
                "distance": 30,
                "enable": true,
                "speed": {
                  "min": -7,
                  "max": 7
                }
              },
              "shape": {
                "type": [
                  "circle",
                  "square"
                ],
                "options": {}
              }
            },
            "responsive": [
              {
                "maxWidth": 1024,
                "options": {
                  "particles": {
                    "move": {
                      "speed": {
                        "min": 33,
                        "max": 66
                      }
                    }
                  }
                }
              }
            ]

          }}
        />

        <div className="min-h-screen">
          <h1 className="flex justify-center items-center text-[50px] font-bold text-center p-10 text-yellow-400">
            <div className="flex items-center shadow-xl rounded-lg px-5">CSSBrother
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
              <div className="flex justify-center items-center mt-10 gap-6">
                <button className="w-[100px] bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full" disabled={pageNumber === 1} onClick={handlePreviousPage}>
                  Previous
                </button>
                <span className="text-white font-bold">{`Page ${pageNumber} of ${totalPages}`}</span>
                <button className="w-[100px] bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full" disabled={pageNumber === totalPages} onClick={handleNextPage}>
                  Next
                </button>
              </div>
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