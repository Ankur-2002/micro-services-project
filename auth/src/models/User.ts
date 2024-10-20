import mongoose from 'mongoose';
import { Password } from '../services/password';

interface userAttrs {
    email: string;
    password: string;
}

interface userModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: userAttrs): UserDoc => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, userModel>('User', userSchema);

export { User };
