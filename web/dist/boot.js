"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mongo_1 = __importDefault(require("./plugins/mongo"));
const routes_1 = __importDefault(require("./routes"));
async function default_1(options) {
    const fastify = fastify_1.default();
    fastify
        .register(mongo_1.default, { uri: options.mongoUri })
        .register(routes_1.default)
        .listen(options.port, (err, address) => {
        if (err) {
            console.log(err);
        }
        console.log(`listening at address: ${address}`);
    });
}
exports.default = default_1;
//# sourceMappingURL=boot.js.map