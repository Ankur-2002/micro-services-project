"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const signin = () => {
    const email = 'testing@test.com';
    const id = new mongoose_1.default.Types.ObjectId().toHexString();
    const token = jsonwebtoken_1.default.sign({
        id, email
    }, 'asdf');
    const session = {
        jwt: token
    };
    const sessionJson = JSON.stringify(session);
    const base64 = Buffer.from(sessionJson).toString('base64');
    return [`session=${base64}`];
};
exports.signin = signin;
