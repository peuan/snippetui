"use client"
import React from "react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { BiHome } from "react-icons/bi";

export default function Nav() {
    const collapseItems = [
        "Playground",
        "Blog",
    ];
    return (
        <Navbar css={{
            backgroundColor: 'bg-slate-900',
            color: 'White'
        }} variant={'sticky'} isCompact isBordered={true}>
            <Navbar.Brand  >
                <Navbar.Toggle css={{
                    color: '$primary',
                    backgroundColor: '$primary',
                }} showIn={'xs'} aria-label="toggle navigation" />
            </Navbar.Brand>
            <Navbar.Content variant={'underline'} hideIn="xs" activeColor={'primary'}>
                <Navbar.Link isActive href="/"><BiHome /></Navbar.Link>
                <Navbar.Link href="#">Playground</Navbar.Link>
                <Navbar.Link href="#">Blog</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content >

                <Navbar.Item >
                    <Button rounded color={'primary'} auto as={Link} href="#">
                        Sign In
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
            <Navbar.Collapse css={{
                backgroundColor: 'transparent'
            }}>
                {collapseItems.map((item, index) => (
                    <Navbar.CollapseItem css={{
                        backgroundColor: 'transparent'
                    }} key={item}>
                        <Link
                            css={{
                                minWidth: "100%",
                                color: '$accents1'
                            }}
                            href="#"
                        >
                            {item}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    )
}
