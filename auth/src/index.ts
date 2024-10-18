import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.MONGO_URI)
        throw new Error('MONGO_URI not defined in the ENV');
    try {
        await mongoose.connect(
            // 'mongodb+srv://ankursynez:ankursyneztech@learning.tndytfj.mongodb.net/'
            process.env.MONGO_URI
        );
        console.log('Connected to mongoDB');
    } catch (error) {
        console.log(error);
    }
    app.listen(3000, () => {
        console.log('Auth application is running on PORT 3000');
    });
};

start();
