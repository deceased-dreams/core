"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(fastify) {
    fastify.get('/hello', {
        handler: async (request, reply) => {
            reply.send('hello, world!');
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map