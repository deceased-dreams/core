import { Transform } from 'stream';
import { FastifyInstance } from "fastify";
import { Criteria } from 'dinastry/entities';
import NumericCriteria, { in_bound } from 'dinastry/entities/numeric_criteria';
import CategorialCriteria from 'dinastry/entities/categorial_criteria';

function build_sub_attribute (crit: Criteria) {
  const subs: any[] = crit.kind == 'numeric' ? crit.ranges : crit.options;
  return subs.reduce((acc, curr) => {
    acc[curr.value] = 0;
    return acc;
  }, {} as any);
}

function build_result_structure (criteria) {
  let result: any = {
    1: { count: 0, attributes: {} },
    0: { count: 0, attributes: {} }
  };
  criteria.forEach(c => {
    result[1].attributes[c.key] = build_sub_attribute(c);
    result[0].attributes[c.key] = build_sub_attribute(c);
  })
  return result;
}

function calc_summary (criteria: Criteria[], option) {
  const keys = criteria.map(c => c.key);
  let result = build_result_structure(criteria);
  return new Transform({
    writableObjectMode: true,
    transform (chunk: any, encoding, cb) {
      // increment class counter
      result[chunk._class].count += 1
      keys.forEach(k => {
        const x = chunk[k];
        const c = criteria.find(c => c.key == k);
        if (c.kind == 'numeric') {
          const range = c.ranges.find(range => in_bound(range, x as number));
          result[chunk._class].attributes[k][range.value] += 1;
        } else {
          const o = c.options.find(o => o.value == x);
          result[chunk._class].attributes[k][o.value] += 1;
        }
      })
      cb();
    },
    flush (cb) {
      let end_result = {
        ...option,
        summary: result
      }
      this.push(JSON.stringify(end_result));
      this.push(null);
      cb();
    }
  });
}

export default async (fastify: FastifyInstance) => {

  const rows = fastify.db.collection('rows');
  const criterias = fastify.db.collection<Criteria>('criteria');

  fastify.get('/summary', {
    handler: async (request, reply) => {
      const criteria = await criterias.find().toArray();
      const N = await rows.countDocuments();
      const all_rows = await rows.find();
      let transform = calc_summary(criteria, { total: N });
      all_rows.pipe(transform);
      reply
        .type('application/json')
        .send(transform);
    }
  })

}