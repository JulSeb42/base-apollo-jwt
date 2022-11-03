/*=============================================== AllUsers ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { uuid } from "../../utils"

import Page from "../../components/layouts/Page"

import { ALL_USERS } from "../../graphql/queries"

import { UserType } from "../../types"

const AllUsers = () => {
    const { data, loading, error } = useQuery(ALL_USERS)
    const allUsers: UserType[] = data?.users

    return (
        <Page title="All users" isLoading={loading} error={error?.message}>
            <Text tag="h1">All users</Text>

            {allUsers?.length ? (
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
            )}
        </Page>
    )
}

export default AllUsers
