/*=============================================== AllUsers ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { Text, PageLoading } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { uuid } from "../../utils"

import Page from "../../components/layouts/Page"

import { ALL_USERS } from "../../graphql/queries"

import { UserType } from "../../types"

const AllUsers = () => {
    const { data, loading, error } = useQuery(ALL_USERS)
    const allUsers: UserType[] = data?.allUsers

    return loading ? (
        <PageLoading />
    ) : (
        <Page title="All users">
            <Text tag="h1">All users</Text>

            {data ? (
                allUsers.length ? (
                    <Text tag="ul">
                        {allUsers.map(user => (
                            <li key={uuid()}>
                                <Link to={`/users/${user._id}`}>
                                    {user.fullName}
                                </Link>
                            </li>
                        ))}
                    </Text>
                ) : (
                    <Text>No user.</Text>
                )
            ) : (
                <Text>{error?.message}</Text>
            )}
        </Page>
    )
}

export default AllUsers
