import { FastifyInstance } from "fastify";
import S from 'fluent-schema'
import { CriteriaSchema } from 'dinastry/entities/schema';

export default async (fastify: FastifyInstance) => {

  const collection = fastify.db.collection('criteria');

  fastify.post('/', {
    schema: {
      body: S.array().items(CriteriaSchema)
    },
    handler: async (request, reply) => {
      await collection.deleteMany({});
      const result = await collection.insert(request.body);
      reply.send(result.insertedCount);
    }
  });

  fastify.get('/', {
    handler: async (request, reply) => {
      const result = await collection.find({});
      const items = await result.toArray();
      reply.send(items);
    }
  });

}
