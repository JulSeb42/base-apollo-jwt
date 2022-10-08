/*=============================================== Nav items ===============================================*/

import React from "react"

interface NavItem {
    text: string
}

interface PossibleItem1 extends NavItem {
    to: string
    onClick?: never
}

interface PossibleItem2 extends NavItem {
    to?: never
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

type NavItemType = PossibleItem1 | PossibleItem2

const baseLinks: NavItemType[] = [
    {
        text: "Home",
        to: "/",
    },
]

const loggedInLinks: NavItemType[] = [
    {
        text: "My account",
        to: "/my-account",
    },
    {
        text: "",
        to: "",
    }
]

export { baseLinks }
