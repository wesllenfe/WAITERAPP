import express from 'express';
import http from 'node:http';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);

export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017/api')
.then(() => {
  console.log('Connected to MongoDB');
  const port = 3001;

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
  })
  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  app.use(express.json());
  app.use(router);

  server.listen(port, () => {
      console.log(` 🚀🚀 Server running at http://localhost:${port}`);
  })

})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})



