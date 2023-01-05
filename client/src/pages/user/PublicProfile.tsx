/*=============================================== PublicProfile ===============================================*/

import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Text } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"

import { GET_USER } from "./graphql"

import { UserType } from "../../types"

const PublicProfile = () => {
    const { id } = useParams()

    const { data, error, loading } = useQuery(GET_USER, {
        variables: {
            _id: id,
        },
    })

    const user: UserType = data?.user

    return (
        <Page title={user?.fullName} isLoading={loading} error={error?.message}>
            <Text tag="h1">{user?.fullName}</Text>
        </Page>
    )
}

export default PublicProfile
