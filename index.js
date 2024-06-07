import { app } from './app.js';
import dotenv from 'dotenv';
import { connectDb } from './src/db/connectDb.js';

dotenv.config({
  path: './.env',
});

app.get('/', (req, res) => {
  res.send('server is working');
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is working at http://localhost:${process.env.PORT}`);
    });
  })

  .catch((err) => {
    console.log('failed to connect', err.message);
  });
