/*=============================================== PublicProfile ===============================================*/

import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { PageLoading, Text } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"
import ErrorPage from "../../components/layouts/ErrorPage"

import { GET_USER } from "../../graphql/queries"

import { UserType } from "../../types"

const PublicProfile = () => {
    const { id } = useParams()

    const { data, error, loading } = useQuery(GET_USER, {
        variables: {
            _id: id,
        },
    })

    const user: UserType = data?.getUser

    if (loading) return <PageLoading />

    if (error) return <ErrorPage error={error.message} />

    return user ? (
        <Page title={user.fullName}>
            <Text tag="h1">{user.fullName}</Text>
        </Page>
    ) : (
        <div />
    )
}

export default PublicProfile
