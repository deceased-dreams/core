"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boot_1 = __importDefault(require("./boot"));
boot_1.default({
    port: parseInt(process.env.PORT),
    mongoUri: process.env.MONGO_URI
});
//# sourceMappingURL=index.js.map