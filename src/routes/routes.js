import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../containers/home';
import About from '../containers/about';

const routes = [
    {
        id: 0,
        path: '/',
        component: Home,
        exact: true,
    },
    {
        id: 1,
        path: '/about',
        component: About,
    },
];

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export {
    routes,
    RouteWithSubRoutes,
};
