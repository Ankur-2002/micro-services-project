import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { currentUserRoutes } from './routes/current-user';
import { signUpRoutes } from './routes/signup';
import { signInRoutes } from './routes/signin';
import { signOutRoutes } from './routes/signout';
import { errorHandler, NotFoundError } from '@synez-ankur/common';
// import { BadRequestError } from "./errors/bad-request-errors";
import cookieSession from 'cookie-session';
import cors from 'cors';

const app = express();
app.set('trusting proxy', true);
app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
    })
);
app.use(
    cookieSession({
        //  secure: true,
        signed: false,
    })
);

app.use(currentUserRoutes);
app.use(signUpRoutes);
app.use(signInRoutes);
app.use(signOutRoutes);
app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
