/*=============================================== App ===============================================*/

import React, { useContext, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, ThemeContext, ComponentProps } from "tsx-library-julseb"
import { uuid } from "./utils"

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
                                    <route.element
                                        edited={route.edit && edited}
                                        setEdited={route.edit && setEdited}
                                    />
                                </AnonRoutes>
                            ) : (
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            )
                        }
                        key={uuid()}
                    />
                ))}

                {redirects.length > 0 &&
                    redirects.map(({ path, to }) => (
                        <Route
                            path={path}
                            element={<Navigate to={to} />}
                            key={uuid()}
                        />
                    ))}
            </Routes>
        </ThemeProvider>
    )
}

export default App
