"use client"
import { GITHUB_URL } from "@/config"
import { AiOutlineGithub } from "react-icons/ai"

const Footer = () => {
  return (
    <section className="text-center flex justify-center items-center absolute bottom-0 w-full dark:bg-slate-800 py-2 px-20 border-t-2 border-slate-700 ">
      <div className="flex w-full justify-center">
        Build with ❤️ by
        <a
          href="https://github.com/niawjunior"
          target="_blank"
          className="ml-2"
        >
          Niaw
        </a>
      </div>
      <div className="ml-auto">
        <button onClick={() => window.open(GITHUB_URL)}>
          <AiOutlineGithub />
        </button>
      </div>
    </section>
  )
}

export default Footer
