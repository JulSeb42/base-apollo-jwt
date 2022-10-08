/*=============================================== App ===============================================*/

import React, { useContext, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import {
    Utils,
    ThemeProvider,
    ThemeContext,
    ComponentProps,
} from "tsx-library-julseb"

import ProtectedRoutes from "./routes/ProtectedRoutes"
import AnonRoutes from "./routes/AnonRoutes"

import routes from "./routes/routes"
import redirects from "./routes/redirects"

const App = () => {
    const { theme } = useContext(
        ThemeContext
    ) as ComponentProps.ThemeContextProps
    const [edited, setEdited] = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                {routes.map(route => (
                    <Route
                        path={route.path}
                        element={
                            route.protected ? (
                                <ProtectedRoutes>
                                    <route.element
                                        edited={route.edit && edited}
                                        setEdited={route.edit && setEdited}
                                    />
                                </ProtectedRoutes>
                            ) : route.anon ? (
                                <AnonRoutes>
                                    <route.element />
                                </AnonRoutes>
                            ) : (
                                <route.element />
                            )
                        }
                        key={Utils.uuid()}
                    />
                ))}

                {redirects.map(({ path, to }) => (
                    <Route
                        path={path}
                        element={<Navigate to={to} />}
                        key={Utils.uuid()}
                    />
                ))}
            </Routes>
        </ThemeProvider>
    )
}

export default App
