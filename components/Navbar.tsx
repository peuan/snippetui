"use client"
import React, { useState } from "react"
import { BiHome } from "react-icons/bi"
import Link from "next/link"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { IoMdColorPalette } from "react-icons/io"
import { GiTrophy } from "react-icons/gi"

import { navigationMenuTriggerStyle } from "./ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useAppDispatch } from "../redux/hooks"
import { setGlobalTheme } from "../redux/features/themeSlice"
import { Itheme } from "../interfaces/Itheme"
import { reset } from "../redux/features/pageSlice"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function Nav() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const router = useRouter()
  const { data: session } = useSession()

  const dispatch = useAppDispatch()
  const [state, setState] = useState(false)

  const menus = [
    { title: "Playground", path: "/playground" },
    { title: "Leaderboards", path: "/leaderboards" },
    { title: "Profile", path: "/profile" },
  ]

  const handleTheme = (theme: Itheme) => {
    setTheme(theme.theme)
    dispatch(setGlobalTheme({ theme: theme.theme }))
  }

  const handleHomePage = () => {
    dispatch(reset())
  }

  return (
    <nav className="dark:bg-slate-900 bg-white min-w-full border-b lg:border-0 fixed z-50 top-0">
      <div className="items-center px-4 max-w-screen-xl mx-auto lg:flex lg:px-8 absolute min-w-full dark:bg-slate-900 bg-white">
        <div className="flex items-center justify-between py-3 lg:py-3 lg:block ">
          <a href={"/"} onClick={handleHomePage}>
            <h1 className={navigationMenuTriggerStyle()}>
              <BiHome />
            </h1>
          </a>
          <div className="lg:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-2 mt-2 lg:block lg:pb-0 lg:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-2 lg:flex lg:space-x-6 lg:space-y-0">
            <>
              {menus.map((item, idx) => (
                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                  {item.title === "Playground" && (
                    <Link
                      href={item.path}
                      className={navigationMenuTriggerStyle({
                        class: "min-w-full",
                      })}
                    >
                      {item.title}
                      <IoMdColorPalette className="ml-2" />
                    </Link>
                  )}
                  {item.title === "Leaderboards" && (
                    <Link
                      href={item.path}
                      className={navigationMenuTriggerStyle({
                        class:
                          "min-w-full dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:bg-yellow-500",
                      })}
                    >
                      {item.title}
                      <GiTrophy className="ml-2" />
                    </Link>
                  )}
                </li>
              ))}
              {!session?.user && (
                <Button
                  onClick={() => router.push("/login")}
                  variant="secondary"
                  size="icon"
                  className="lg:w-fit px-4 w-full dark:bg-blue-500 bg-slate-400 hover:bg-slate-600 dark:hover:bg-blue-600"
                >
                  <span>Login</span>
                </Button>
              )}
              {session?.user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="lg:w-fit px-4 w-full dark:bg-blue-500 bg-slate-400 hover:bg-slate-600 dark:hover:bg-blue-600"
                    >
                      <Avatar className="w-[30px] h-[30px] mr-2 border-2">
                        <AvatarImage src={session?.user?.image!} />
                        <AvatarFallback>
                          {session?.user?.image
                            ? ""
                            : session?.user?.name?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {session?.user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="center"
                    defaultValue={resolvedTheme}
                  >
                    <DropdownMenuCheckboxItem
                      onCheckedChange={() => handleTheme({ theme: "light" })}
                    >
                      Profile
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                      onCheckedChange={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                    >
                      Logout
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:w-12 w-full"
                  >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  defaultValue={resolvedTheme}
                >
                  <DropdownMenuCheckboxItem
                    checked={theme === "light"}
                    onCheckedChange={() => handleTheme({ theme: "light" })}
                  >
                    Light
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={theme === "dark"}
                    onCheckedChange={() => handleTheme({ theme: "dark" })}
                  >
                    Dark
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuCheckboxItem
                    checked={theme === "system"}
                    onCheckedChange={() => handleTheme({ theme: "system" })}
                  >
                    System
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          </ul>
        </div>
      </div>
    </nav>
  )
}
