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
        }} variant={'sticky'} isCompact isBordered={true}>
            <Navbar.Brand  >
                <Navbar.Toggle showIn={'xs'} aria-label="toggle navigation" />
            </Navbar.Brand>
            <Navbar.Content variant={'underline'} hideIn="xs" activeColor={'primary'}>
                <Navbar.Link isActive href="/"><BiHome /></Navbar.Link>
                <Navbar.Link href="#">Playground</Navbar.Link>
                <Navbar.Link href="#">Blog</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>

                <Navbar.Item >
                    <Button rounded color={'primary'} auto as={Link} href="#">
                        Sign In
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
            <Navbar.Collapse>
                {collapseItems.map((item, index) => (
                    <Navbar.CollapseItem key={item}>
                        <Link
                            color="inherit"
                            css={{
                                minWidth: "100%",
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
