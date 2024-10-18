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
const tickets_1 = require("../../models/tickets");
const nats_wrapper_1 = require("../../nats-wrapper");
it('Has a route handler listening to /api/tickets for post requests', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
}));
it('Can only be accessed if the user is signed in', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).post('/api/tickets').send({});
    expect(401);
}));
it('returns a status other 401 if the user is signed in', () => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = (0, signin_1.signin)();
    const response = yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({});
    expect(response.status).not.toEqual(401);
}));
it('returns an error if an invalid title is provided', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .send({
        title: '',
        price: 12,
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .send({
        price: 12,
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(400);
}));
it('returns an error if an invalid price is provided', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .send({
        title: 'asdfkhaklsdf',
        price: -12,
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .send({
        title: 'asdfkajysdf',
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(400);
}));
it('creates a ticket with valid inputs', () => __awaiter(void 0, void 0, void 0, function* () {
    let Tickets = yield tickets_1.Ticket.find({});
    expect(Tickets.length).toEqual(0);
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .send({
        title: 'New Ticket',
        price: 200,
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(201);
    Tickets = yield tickets_1.Ticket.find({});
    expect(Tickets.length).toEqual(1);
    expect(Tickets[0].price).toEqual(200);
    expect(Tickets[0].title).toEqual('New Ticket');
}));
it('Publishes the event', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/tickets')
        .send({
        title: 'New Ticket',
        price: 200,
    })
        .set('Cookie', (0, signin_1.signin)())
        .expect(201);
    expect(nats_wrapper_1.natsWrapper.client.publish).toHaveBeenCalled();
}));
