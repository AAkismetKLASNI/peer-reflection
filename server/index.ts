import express from 'express';
import http from 'http';
import { socket } from './services/socket';

const PORT = process.env.PORT || 3500;

const app = express();
const server = new http.Server(app);

socket(server);

server.listen(PORT, () => {
  console.log(`server started on ${PORT} port`);
});
