/*=============================================== AllUsers ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { Text, PageLoading, Utils } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import PageLayout from "../../components/PageLayout"

import { ALL_USERS } from "../../graphql/queries"

import { UserType } from "../../types"

const AllUsers = () => {
    const { data, loading, error } = useQuery(ALL_USERS)
    const allUsers: UserType[] = data?.allUsers

    return loading ? (
        <PageLoading />
    ) : (
        <PageLayout title="All users">
            <Text tag="h1">All users</Text>

            {data ? (
                <Text tag="ul">
                    {allUsers.map(user => (
                        <li key={Utils.uuid()}>
                            <Link to={`/users/${user._id || user.id}`}>
                                {user.fullName}
                            </Link>
                        </li>
                    ))}
                </Text>
            ) : (
                <Text>{error?.message}</Text>
            )}
        </PageLayout>
    )
}

export default AllUsers
