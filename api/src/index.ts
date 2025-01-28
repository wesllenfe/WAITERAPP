import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';

mongoose.connect('mongodb://localhost:27017/api')
.then(() => {
  console.log('Connected to MongoDB');

  const app = express();
  const port = 3001;

  app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
  app.use(express.json());
  app.use(router);

  app.listen(port, () => {
      console.log(` 🚀🚀 Server running at http://localhost:${port}`);
  })

})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})



