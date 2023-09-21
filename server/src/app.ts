import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

const app: Express = express();

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);
app.use((_req, _res, next) => {
    next(new Error( 'Not found'));
});

export default app;
