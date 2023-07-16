"use client"
import React from "react";
import { Navbar, Button, Text } from "@nextui-org/react";
import { BiHome } from "react-icons/bi";
import Link from 'next/link'


import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/app/components/ui/navigation-menu"
export default function Nav() {
    const collapseItems = [
        "Playground",
        "Blog",
    ];
    return (
        <div className="h-12 bg-slate-800 min-w-full flex items-center px-6">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                            <BiHome />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={'/playground'} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Playground
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
