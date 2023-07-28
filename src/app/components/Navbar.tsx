"use client"
import React from "react"
import { BiHome } from "react-icons/bi"
import Link from "next/link"

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
export default function Nav() {
  const collapseItems = ["Playground", "Blog"]
  return (
    <div className="h-12 bg-slate-800/50 min-w-full flex items-center pl-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={"/"} className={navigationMenuTriggerStyle()}>
              <BiHome />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={"/playground"} className={navigationMenuTriggerStyle()}>
              Playground
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
