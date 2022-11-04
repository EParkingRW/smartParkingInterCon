import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUploader from 'express-fileupload';
import routes from './app/restful/routers';
import DB from './app/database';
import { associate } from './app/database/relationships';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  fileUploader({
    fileSize: 50 * 1024 * 1024,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);
app.use(routes);

const initializeDatabase = async (): Promise<void> => {
  await DB.sequelize.sync({
    force: false,
    alter: process.env.NODE_ENV !== 'production',
  });
  associate();
};

const start = () => {
  try {
    initializeDatabase();
    app.listen({ port: PORT }, () =>
      process.stdout.write(`http://localhost:${PORT} \n`),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
