"use client"
import React from "react"
import { BiHome } from "react-icons/bi"
import Link from "next/link"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/redux/hooks"
import { setGlobalTheme } from "@/redux/features/themeSlice"
import { Itheme } from "@/interfaces/Itheme"
import { reset } from "@/redux/features/pageSlice"

export default function Nav() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const dispatch = useAppDispatch()

  const handleTheme = (theme: Itheme) => {
    setTheme(theme.theme)
    dispatch(setGlobalTheme({ theme: theme.theme }))
  }

  const handleHomePage = () => {
    dispatch(reset())
  }
  return (
    <div className="h-12 dark:bg-slate-900 bg-white min-w-full flex items-center pl-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              onClick={handleHomePage}
              href={"/"}
              className={navigationMenuTriggerStyle()}
            >
              <BiHome />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={"/playground"} className={navigationMenuTriggerStyle()}>
              Playground
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" defaultValue={resolvedTheme}>
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
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
