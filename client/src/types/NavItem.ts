/*=============================================== Nav item types ===============================================*/

interface NavItem {
    text: string
    end?: boolean
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

export default NavItemType
