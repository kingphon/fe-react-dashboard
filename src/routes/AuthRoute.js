import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import cookie from 'js-cookie'
import { ROUTE_LOGIN } from '.';
import { USER_TOKEN } from '../constants';

export const isAuthenticated = () => !!cookie.get(USER_TOKEN)

const AuthRoute = ({ children, ...rest }) => (
    <Route
        render={({ location }) =>
            isAuthenticated() ? children : (
                <Redirect
                    to={{
                    pathname: ROUTE_LOGIN,
                    state: { from: location }
                    }}
                />
            )
        }
        {...rest}
    />
)

export default AuthRoute