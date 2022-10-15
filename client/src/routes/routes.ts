/*=============================================== Routes ===============================================*/

import { FC } from "react"

import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"

import AllUsers from "../pages/user/AllUsers"
import PublicProfile from "../pages/user/PublicProfile"

import Signup from "../pages/auth/Signup"
import Verify from "../pages/auth/Verify"
import Login from "../pages/auth/Login"

import MyAccount from "../pages/account/MyAccount"
import EditAccount from "../pages/account/EditAccount"

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
        path: "/users",
        element: AllUsers,
    },
    {
        path: "/users/:id",
        element: PublicProfile,
    },

    {
        path: "/signup",
        element: Signup,
        anon: true,
    },
    {
        path: "/verify/:token/:id",
        element: Verify,
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
]

export default routes
