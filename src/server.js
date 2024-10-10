import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  //якщо приходить запит на статичний файл, перевіряється папка uploads, якщо файл там є - він повертається фронтенду
  app.use(express.static('uploads'));

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);
  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
