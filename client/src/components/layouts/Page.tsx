/*=============================================== Page ===============================================*/

import React from "react"
import { Helmet, Wrapper, Main } from "tsx-library-julseb"

import Header from "./Header"

import siteData from "../../data/site-data"

const Page = ({
    title,
    description,
    keywords,
    cover,
    template = "1col",
    children,
    mainWidth = "default",
}: Props) => {
    return (
        <>
            <Helmet
                title={`${title} | ${siteData.name}`}
                description={description}
                keywords={[...siteData.keywords, keywords]}
                favicon={siteData.favicon}
                author={siteData.author}
                type={siteData.type}
                cover={cover || siteData.cover}
                siteName={siteData.name}
                language={siteData.language}
            />

            <Header />

            <Wrapper template={template}>
                {template !== "1col" ? (
                    children
                ) : (
                    <Main size={mainWidth}>{children}</Main>
                )}
            </Wrapper>
        </>
    )
}

export default Page

interface Props {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
    template?: "1col" | "2cols" | "3cols"
    children?: any
    mainWidth?: "default" | "large" | "form" | number
}
