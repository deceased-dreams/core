require('dotenv').config();
// if (process.env.NODE_ENV == 'development') {
//    require('dotenv').config();
// }
console.log('foobar valid foos ')
import boot from './boot';

const options = {
  port: parseInt(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
  sessionSecret: process.env.SESSION_SECRET,
  cookieSecret: process.env.COOKIE_SECRET
}
boot(options)
