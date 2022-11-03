/*=============================================== Page ===============================================*/

import React from "react"
import { Wrapper, Main, PageLoading, Text } from "tsx-library-julseb"

import Helmet from "./Helmet"
import Header from "./Header"

const Page = ({
    title,
    description,
    keywords,
    cover,
    template = "1col",
    children,
    mainWidth = "default",
    isLoading,
    error,
}: Props) => {
    return (
        <>
            <Helmet
                title={error ? "An error occured" : title}
                description={description}
                keywords={keywords}
                cover={cover}
            />

            {isLoading ? (
                <PageLoading />
            ) : error ? (
                <>
                    <Text tag="h1">An error occured</Text>
                    <Text>{error}</Text>
                </>
            ) : (
                <>
                    <Header />

                    <Wrapper template={template}>
                        {template !== "1col" ? (
                            children
                        ) : (
                            <Main size={mainWidth}>{children}</Main>
                        )}
                    </Wrapper>
                </>
            )}
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
    isLoading?: boolean
    error?: string
}
