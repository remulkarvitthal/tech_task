import express, { Router } from 'express';
import agentRoute from './agent.route';
import propertyRoute from './property.route';

const router = express.Router();

interface IRoute {
    path: string;
    route: Router;
}

const defaultIRoute: IRoute[] = [
    {
        path: '/agents',
        route: agentRoute,
    },
    {
        path: '/property',
        route: propertyRoute,
    },
];

defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
