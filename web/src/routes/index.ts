import { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {

  fastify.get('/hello', {
    handler: async (request, reply) => {
      reply.send('hello, world!');
    }
  })

}
