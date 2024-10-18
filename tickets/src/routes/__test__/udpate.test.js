"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const signin_1 = require("./helpers/signin");
const mongoose_1 = __importDefault(require("mongoose"));
const nats_wrapper_1 = require("../../nats-wrapper");
it('returns a 404 if the provided id does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
    const tempId = new mongoose_1.default.Types.ObjectId().toHexString();
    yield (0, supertest_1.default)(app_1.app)
        .put('/api/tickets/' + tempId)
        .set('Cookie', (0, signin_1.signin)())
        .send({
        title: 'asdfasdf',
        price: 23,
    })
        .expect(404);
}));
it('returns a 401 if the user is not authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
    const tempId = new mongoose_1.default.Types.ObjectId().toHexString();
    yield (0, supertest_1.default)(app_1.app)
        .put('/api/tickets/' + tempId)
        .send({
        title: 'asdfasdf',
        price: 23,
    })
        .expect(401);
}));
it('returns a 400 if the user does not own the ticket', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .send({
        title: 'asdfasdfasdf',
        price: 23,
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(201);
    yield (0, supertest_1.default)(app_1.app)
        .put('/api/tickets/' + response.body.id)
        .send({
        title: 'asdfasdf',
        price: 100,
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(401);
}));
it('returns a 400 if the user provides an invalid title or price', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .put('/api/tickets/adfasdfasdf')
        .set('Cookie', (0, signin_1.signin)())
        .send({
        title: '',
        price: 100,
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .put('/api/tickets/asdfasdfasdf')
        .set('Cookie', (0, signin_1.signin)())
        .send({
        title: 'asdfasdfasdf',
        price: 0,
    })
        .expect(400);
}));
it('updates the ticket provided valid inputs', () => __awaiter(void 0, void 0, void 0, function* () {
    const title = 'final_testing';
    const price = 100;
    const cookie = (0, signin_1.signin)();
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
        title,
        price,
    })
        .expect(201);
    const updateResponse = yield (0, supertest_1.default)(app_1.app)
        .put('/api/tickets/' + response.body.id)
        .send({
        title: 'Final_update',
        price: 1000,
    })
        .set('Cookie', cookie)
        .expect(200);
    expect(updateResponse.body.title).toEqual('Final_update');
}));
it('Publishes an event', () => __awaiter(void 0, void 0, void 0, function* () {
    const title = 'final_testing';
    const price = 100;
    const cookie = (0, signin_1.signin)();
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
        title,
        price,
    })
        .expect(201);
    const updateResponse = yield (0, supertest_1.default)(app_1.app)
        .put('/api/tickets/' + response.body.id)
        .send({
        title: 'Final_update',
        price: 1000,
    })
        .set('Cookie', cookie)
        .expect(200);
    expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled();
}));
