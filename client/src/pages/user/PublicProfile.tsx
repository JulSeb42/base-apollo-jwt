/*=============================================== PublicProfile ===============================================*/

import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { PageLoading, Text } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"

import { GET_USER } from "../../graphql/queries"

import { UserType } from "../../types"

const PublicProfile = () => {
    const { id } = useParams()

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            _id: id,
        },
    })

    const user: UserType = data?.getUser

    return loading ? (
        <PageLoading />
    ) : (
        <Page title={error ? "An error occured" : user.fullName}>
            <Text tag="h1">{user.fullName}</Text>
        </Page>
    )
}

export default PublicProfile
