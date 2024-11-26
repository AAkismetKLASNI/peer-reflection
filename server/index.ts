import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3500;

const app = express();
const server = new http.Server(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`server started on ${PORT} port`);
});
