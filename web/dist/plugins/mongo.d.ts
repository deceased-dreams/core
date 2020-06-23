/// <reference types="node" />
import { MongoClient } from 'mongodb';
import { FastifyInstance } from 'fastify';
declare module "fastify" {
    interface FastifyInstance {
        mclient: MongoClient;
    }
}
declare type MongoPluginOption = {
    uri: string;
};
declare const _default: (instance: FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse>, options: MongoPluginOption, callback: (err?: import("fastify").FastifyError) => void) => void;
export default _default;
