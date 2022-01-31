import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoutes({ component: Component, isAuth, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return <Component {...props} />
                }
                else {
                    return <Redirect to={{ pathname: "/login" }} />
                }
            }}
        />
    )
}
