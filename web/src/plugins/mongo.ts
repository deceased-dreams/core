import { MongoClient } from 'mongodb'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'

declare module "fastify" {
  interface FastifyInstance {
    mclient: MongoClient
  }
}

type MongoPluginOption = {
  uri: string
}

export default fp(async (fastify: FastifyInstance, opts: MongoPluginOption) => {
  const mclient = new MongoClient(opts.uri, { useNewUrlParser: true });
  fastify.decorate('mclient', mclient);

  fastify.addHook('onClose', async (instance) => {
    await fastify.mclient.close();
  });
});
