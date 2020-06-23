"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = fastify_plugin_1.default(async (fastify, opts) => {
    const mclient = new mongodb_1.MongoClient(opts.uri, { useNewUrlParser: true });
    fastify.decorate('mclient', mclient);
    fastify.addHook('onClose', async (instance) => {
        await fastify.mclient.close();
    });
});
//# sourceMappingURL=mongo.js.map