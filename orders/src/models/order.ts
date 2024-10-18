import mongoose from 'mongoose';
import { OrderStatus } from '@synez-ankur/common';
import { TicketDoc } from './ticket';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface orderAttrs {
    userId: string;
    status: OrderStatus;
    expireAt: Date;
    ticket: TicketDoc;
}

interface orderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expireAt: Date;
    ticket: TicketDoc;
    version: number;
}

interface orderModel extends mongoose.Model<orderDoc> {
    build(order: orderAttrs): orderDoc;
}

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Create,
        },
        expireAt: {
            type: mongoose.Schema.Types.Date,
        },
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
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
orderSchema.statics.build = (attrs: orderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<orderDoc, orderModel>('order', orderSchema);

export { Order };
