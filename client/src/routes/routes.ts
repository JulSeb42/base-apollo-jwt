/*=============================================== Routes ===============================================*/

import { FC } from "react"

import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"

import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"

import MyAccount from "../pages/user/MyAccount"
import EditAccount from "../pages/user/EditAccount"

import AllUsers from "../pages/user/AllUsers"
import PublicProfile from "../pages/user/PublicProfile"


type RouteType = {
    path: string
    element: FC | any
    protected?: boolean
    anon?: boolean
    edit?: boolean
}

const routes: RouteType[] = [
    {
        path: "/",
        element: Homepage,
    },
    {
        path: "*",
        element: NotFound,
    },

    {
        path: "/signup",
        element: Signup,
        anon: true,
    },
    {
        path: "/login",
        element: Login,
        anon: true,
    },

    {
        path: "/my-account",
        element: MyAccount,
        protected: true,
    },
    {
        path: "/my-account/edit",
        element: EditAccount,
        protected: true,
        edit: true,
    },

    {
        path: "/users",
        element: AllUsers,
    },
    {
        path: "/users/:id",
        element: PublicProfile,
    },
]

export default routes
