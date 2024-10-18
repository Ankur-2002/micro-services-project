import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@synez-ankur/common';
// import './errors/bad-request-errors';
import cookieSession from 'cookie-session';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';
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
app.use(currentUser);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);
app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
