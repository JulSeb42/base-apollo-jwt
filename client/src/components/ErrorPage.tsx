/*=============================================== ErrorPage ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import PageLayout from "./PageLayout"

const ErrorPage = ({ error }: Props) => {
    return (
        <PageLayout title="An error occured">
            <Text tag="h1">An error occured</Text>

            <Text>{error}</Text>
        </PageLayout>
    )
}

export default ErrorPage

interface Props extends React.HTMLAttributes<HTMLElement> {
    error: string
}
