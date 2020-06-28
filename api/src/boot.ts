import Fastify from 'fastify'
import MongoPlugin from './plugins/mongo'
import Cors from 'fastify-cors'
import Multer from 'fastify-multer'
import Routes from './routes'
import { join } from 'path'

type BootOption = {
  mongoUri: string;
  dbName: string;
  sessionSecret: string;
  cookieSecret: string;
  port: number;
}

export default async function (options: BootOption) {
  const {
    mongoUri,
    dbName,
    sessionSecret,
    cookieSecret,
    port
  } = options
  const fastify = Fastify({
    logger: true
  })
  fastify
    .register(MongoPlugin, { uri: mongoUri, dbName })
    .register(Cors)
    .register(Multer.contentParser)
    .register(Routes)
    .listen(port, (err, address) => {
      if (err) {
        console.log(err);
      }
      console.log(`listening at address: ${address}`);
    });
}
