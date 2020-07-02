// require('dotenv').config();
// const path = require('path');
// if (process.env.NODE_ENV == 'production') {
//    require('dotenv').config({
//     path: path.resolve(process.cwd(), '.env.production')
//    });
// }
import boot from './boot';

const options = {
  port: parseInt(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  cookieSecret: process.env.COOKIE_SECRET
}
boot(options)
