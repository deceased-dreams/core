import Fastify from 'fastify'
import MongoPlugin from './plugins/mongo'
import Routes from './routes'

type BootOption = {
  mongoUri: string;
  port: number;
}

export default async function (options: BootOption) {
  const fastify = Fastify()
  fastify
    .register(MongoPlugin, { uri: options.mongoUri })
    .register(Routes)
    .listen(options.port, (err, address) => {
      if (err) {
        console.log(err);
      }
      console.log(`listening at address: ${address}`);
    });
}
