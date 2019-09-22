import { lazy } from 'react';
import { waitingRouteComponent } from '../commons/utils';

const Home = lazy(() => import('./home'));
const DBSchema = lazy(() => import('./db-schema'));
const JsonFormatter = lazy(() => import('./json-formatter'));

const DEFAULT_SCENE_CONFIG = {
    enter: 'page-fade-in',
    exit: 'page-fade-out'
};

export const RouterConfig = [
    {
        path: '/',
        component: waitingRouteComponent(Home),
        exact: true
    },
    {
        path: '/db-schema',
        component: waitingRouteComponent(DBSchema),
        exact: true
    },
    {
        path: '/json-formatter',
        component: waitingRouteComponent(JsonFormatter),
        exact: true
    }
];

export const getSceneConfig = (location) => {
    const matchedRoute = RouterConfig.find((config) => new RegExp(`^${config.path}$`).test(location.pathname));
    return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG;
};
