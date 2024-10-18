import { OrderStatus } from '@synez-ankur/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
    id: string;
    status: OrderStatus;
    userId: string;
    price: number;
    version: number;
}

interface OrderDoc extends mongoose.Document {
    status: OrderStatus;
    userId: string;
    price: number;
    version: number;
}

interface OrderModal extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
    findByEvent(data: {
        id: string;
        version: number;
    }): Promise<OrderDoc | null>;
}
const orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);
orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        status: attrs.status,
        userId: attrs.userId,
        price: attrs.price,
        version: attrs.version,
    });
};

orderSchema.statics.findByEvent = (data: { id: string; version: number }) => {
    return Order.findOne({
        _id: data.id,
        version: data.version - 1,
    });
};

export const Order = mongoose.model<OrderDoc, OrderModal>('Order', orderSchema);
