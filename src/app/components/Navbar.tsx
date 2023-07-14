"use client"
import React from "react";
import { Navbar, Button, Link } from "@nextui-org/react";
import { BiHome } from "react-icons/bi";
import { SSRProvider } from '@react-aria/ssr';
import { Box } from "./Box";

export default function Nav() {
    return (
        <Navbar variant={'floating'}>
            <Navbar.Brand>
                <BiHome />
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" activeColor={'primary'}>
                <Navbar.Link isActive href="#">Playground</Navbar.Link>
                <Navbar.Link href="#">About</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="#">
                    Login
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="#">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}
