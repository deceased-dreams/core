import { MongoClient, Db } from 'mongodb'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'

declare module "fastify" {
  interface FastifyInstance {
    mclient: MongoClient;
    db: Db;
  }
}

type MongoPluginOption = {
  uri: string;
  dbName: string;
}

export default fp(async (fastify: FastifyInstance, opts: MongoPluginOption) => {
  const mclient = new MongoClient(opts.uri, { useNewUrlParser: true });
  await mclient.connect();
  const db = mclient.db(opts.dbName);
  fastify.decorate('mclient', mclient);
  fastify.decorate('db', db);

  fastify.addHook('onClose', async (instance) => {
    await fastify.mclient.close();
  });
});
