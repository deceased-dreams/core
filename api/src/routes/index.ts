import {
  FastifyInstance
} from 'fastify'
import data_routes from './data'
import criteria_routes from './criteria'
import naive_bayes_routes from './naive-bayes';

export default async function (fastify: FastifyInstance) {
  fastify.register(data_routes, {
    prefix: '/api/data'
  });
  fastify.register(criteria_routes, {
    prefix: '/api/criteria'
  });
  fastify.register(naive_bayes_routes, {
    prefix: '/api/nb'
  });
}