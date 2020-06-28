import { Readable, Transform } from 'stream';
import { FastifyInstance } from "fastify";
import S from 'fluent-schema'
import Multer from 'fastify-multer'
import { ObjectID } from 'mongodb';
import { Criteria, create_validator, Data } from 'dinastry/entities';
// import csvParse from 'csv-parse';
const upload = Multer();

function toline_transform (headers) {
  let first = true;
  let transform = new Transform({
    writableObjectMode: true,
    transform (chunk: any, encoding, cb) {
      if (first) {
        this.push(`nama,${headers}\n`);
        first = false;
      }
      const crit_vals = headers.map(key => {
        const item = chunk[key];
        if (item === undefined || item == null) {
          cb(new Error('chunk invalid'), chunk);
        }
        return item;
      }).join(',');

      this.push(`${chunk.nama},${crit_vals}\n`);
    },
    flush (cb) {
      this.push(null);
      cb();
    }
  })
  return transform;
}

function export_transform () {
  let first = true;
  return new Transform({
    writableObjectMode: true,
    transform (chunk, encoding, cb) {
      let prefix = ',';
      if (first) {
        first = false;
        this.push('[');
        prefix = '';
      }
      this.push(prefix);
      this.push( JSON.stringify(chunk) );
      cb();
    },
    flush (cb) {
      this.push(']');
      this.push(null);
      cb();
    }
  });
}

export default async (fastify: FastifyInstance) => {

  const rows = fastify.db.collection('rows');
  const criterias = fastify.db.collection<Criteria>('criteria');

  fastify.post('/', {
    handler: async (request, reply) => {
      const payload = request.body;
      const criteria = await criterias.find().toArray();
      const validator = create_validator(criteria);
      const error = validator(payload);

      if (error) {
        return reply.status(400).send(error);
      }

      try {
        await rows.insertOne(payload);
        reply.send('ok');
      } catch (err) {
        console.log(err);
      }
    }
  })

  fastify.put('/:id', {
    schema: {
      params: S.object()
        .prop('id', S.string().required())
    },
    handler: async (request, reply) => {
      const _id = new ObjectID(request.params.id);
      let payload = request.body;
      const criteria = await criterias.find().toArray();
      const validator = create_validator(criteria);
      const error = validator(payload);

      if (error) {
        return reply.status(400).send(error);
      }

      if (payload._id) {
        delete payload._id;
      }

      await rows.update({ _id }, payload);
      reply.send('ok');
    }
  })

  fastify.post('/import', {
    preHandler: upload.single('import_file'),
    handler: async (request, reply) => {
      const data = JSON.parse(request.file.buffer.toString());
      const action = request.body.action;
      if (action == 'DELETE') {
        await rows.deleteMany({});
      }
      await rows.insertMany(data);
      reply.send('ok');
    }
  })

  fastify.get('/export', {
    handler: async (request, reply) => {
      // const criteria = await criterias.find().toArray();
      // const headers = criteria.map(c => c.key);
      let transform = export_transform();
      const result = rows.find();
      result.pipe(transform);
      reply
        .type('application/json')
        .header('Content-Disposition', 'attachment; filename=db.json')
        .send(transform);
    }
  })

  fastify.get('/', {
    schema: {
      querystring: S.object()
        .prop('take', S.integer().minimum(10).default(10))
        .prop('skip', S.integer().minimum(0).default(0))
        .prop('keyword', S.string().default(''))
    },
    handler: async (request, reply) => {
      const options = { 
        limit: request.query.take,
        skip: request.query.skip,
        sort: [['nama', 1]]
      };
      const keyword = request.query.keyword.toLowerCase().trim();
      const keyword_regex = new RegExp('^' + keyword + '.*');
      const query = {
        nama: keyword_regex
      };
      const items = await rows.find(query, options).toArray();
      reply.type('application/json').send(items);
    }
  })

  fastify.get('/:id', {
    schema: {
      params: S.object()
        .prop('id', S.string().required())
    },
    handler: async (request, reply) => {
      const _id = new ObjectID(request.params.id);
      let item = await rows.findOne({ _id });
      reply.send(item);
    }
  })

}