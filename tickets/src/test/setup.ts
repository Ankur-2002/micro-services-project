import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

jest.setTimeout(500000);
jest.mock('../nats-wrapper.ts');
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) await mongo.stop();
    await mongoose.connection.close();
});
