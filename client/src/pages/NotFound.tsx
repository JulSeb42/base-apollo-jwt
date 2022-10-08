/*=============================================== NotFound ===============================================*/

import React from "react"
import { Link } from "react-router-dom"
import { Text } from "tsx-library-julseb"

import PageLayout from "../components/PageLayout"

const NotFound = () => {
    return (
        <PageLayout title="404">
            <Text tag="h1">Page not found!</Text>

            <Text>
                <Link to="/">Back to homepage.</Link>
            </Text>
        </PageLayout>
    )
}

export default NotFound
