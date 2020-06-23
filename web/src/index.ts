require('dotenv').config();
import boot from './boot';

boot({
  port: parseInt(process.env.PORT),
  mongoUri: process.env.MONGO_URI
})
