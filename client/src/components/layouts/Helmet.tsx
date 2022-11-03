/*=============================================== Helmet ===============================================*/

import React from "react"
import { Helmet as Container } from "tsx-library-julseb"

import siteData from "../../data/site-data"

const Helmet = ({ title, description, keywords, cover }: Props) => {
    return (
        <Container
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
    )
}

export default Helmet

interface Props {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
}
