/*=============================================== ErrorPage ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import Page from "./Page"

const ErrorPage = ({ error }: Props) => {
    return (
        <Page title="An error occured">
            <Text tag="h1">An error occured</Text>

            <Text>{error}</Text>
        </Page>
    )
}

export default ErrorPage

interface Props extends React.HTMLAttributes<HTMLElement> {
    error: string
}
