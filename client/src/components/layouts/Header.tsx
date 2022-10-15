/*=============================================== Header ===============================================*/

import React, { useContext } from "react"
import {
    Header as Container,
    ButtonIcon,
    ThemeContext,
    ComponentProps,
} from "tsx-library-julseb"
import { NavLink } from "react-router-dom"
import { uuid } from "../../utils"

import { AuthContext, AuthContextType } from "../../context/auth"

import siteData from "../../data/site-data"

import { NavItemType } from "../../types"

const Header = () => {
    const { toggleTheme, selectedTheme } = useContext(
        ThemeContext
    ) as ComponentProps.ThemeContextProps
    const { isLoggedIn, logoutUser } = useContext(
        AuthContext
    ) as AuthContextType

    const baseLinks: NavItemType[] = [
        {
            text: "Home",
            to: "/",
            end: true,
        },
        {
            text: "Users",
            to: "/users",
        },
    ]

    const protectedLinks: NavItemType[] = [
        {
            text: "My account",
            to: "/my-account",
        },
        {
            text: "Logout",
            onClick: logoutUser,
        },
    ]

    const anonLinks: NavItemType[] = [
        {
            text: "Sign up",
            to: "/signup",
        },
        {
            text: "Login",
            to: "/login",
        },
    ]

    const navLinks = (links: NavItemType[]) =>
        links.map(({ text, to, onClick, end }) =>
            to ? (
                <NavLink to={to} end={end} key={uuid()}>
                    {text}
                </NavLink>
            ) : (
                <button onClick={onClick} key={uuid()}>
                    {text}
                </button>
            )
        )

    return (
        <Container logo={{ text: siteData.name }}>
            {navLinks(baseLinks)}

            {isLoggedIn ? navLinks(protectedLinks) : navLinks(anonLinks)}

            <ButtonIcon
                icon={selectedTheme === "dark" ? "sun" : "moon"}
                size={24}
                variant="transparent"
                color="background"
                onClick={toggleTheme}
                aria-label="Toggle theme"
            />
        </Container>
    )
}

export default Header
