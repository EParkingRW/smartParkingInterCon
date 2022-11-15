import express from 'express';
import morgan from 'morgan';
import * as http from 'http'
import cors from 'cors';
import dotenv from 'dotenv';
import fileUploader from 'express-fileupload';
import routes from './app/restful/routers';
import DB from './app/database';
import { associate } from './app/database/relationships';
import { isAuth } from './app/restful/middlewares/auth'
const {Server} = require('socket.io')

dotenv.config();
//const __dirname = path.resolve();
const app = express();
const server = http.createServer(app)
export const io = new Server(server, {cors:{origin: "*"}})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(isAuth);
app.use(
  fileUploader({
    fileSize: 50 * 1024 * 1024,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
);
//app.use(express.static(path.join(__dirname, 'assets')));
app.use(routes);

const initializeDatabase = async (): Promise<void> => {
  await DB.sequelize.sync({
    force: false,
    alter: process.env.NODE_ENV !== 'production',
  });
  associate();
};


io.on('connection', socket =>{
  //console.log("connected to",socket.id)
  socket.on('disconnect',()=>{
    console.log("user disconnected:")
  })
})

const PORT = process.env.PORT || 3030;
const start = () => {
  try {
    initializeDatabase();
    server.listen({ port: PORT }, () =>
      process.stdout.write(`http://localhost:${PORT} \n`),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
