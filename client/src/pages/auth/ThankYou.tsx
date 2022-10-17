/*=============================================== ThankYou ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"

const ThankYou = () => {
    return (
        <Page title="Thank you!">
            <Text tag="h1">Thank you for creating your account!</Text>

            <Text>
                You are now logged in. We just sent you an email to verify your
                account, please click on the link to access all the
                functionalities.
            </Text>
        </Page>
    )
}

export default ThankYou
