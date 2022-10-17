/*=============================================== ForgotSent ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"

const ForgotSent = () => {
    return (
        <Page title="Email sent successfully!" >
            <Text tag="h1">Email sent successfully!</Text>

            <Text>
                We just sent you an email with a link to reset your password.
            </Text>
        </Page>
    )
}

export default ForgotSent
