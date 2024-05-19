import { createServer } from 'node:http';
import './app/helpers/env.load.js';
import cors from 'cors';
import express from 'express';
import router from './app/routers/index.router.js';
import errorHandler from './app/helpers/error.handler.js';

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 4000;
const PGHOST = process.env.PGHOST || 'localhost';
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use(router);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server launched at http://${PGHOST}:${PORT}`);
});
