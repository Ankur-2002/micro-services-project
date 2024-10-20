import mongoose from 'mongoose';
import { Order } from './order';
import { OrderStatus } from '@synez-ankur/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
interface TicketAttrs {
    title: string;
    price: number;
    id: string;
}

export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    isReserved(): Promise<boolean>;
    version: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
    findByEvent(event: {
        id: string;
        version: number;
    }): Promise<TicketDoc | null>;
}

const schema = new mongoose.Schema(
    {
        title: {
            type: String,

            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
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
schema.set('versionKey', 'version');
schema.plugin(updateIfCurrentPlugin);
schema.statics.build = (attrs: TicketAttrs) => {
    // console.log(attrs, 'TICKET IS CREATED');
    return new Ticket({
        ...attrs,
        _id: attrs.id,
        name: 'Ankur',
    });
};

schema.statics.findByEvent = async (event: { id: string; version: number }) => {
    return Ticket.findOne({
        _id: event.id,
        version: event.version - 1,
    });
};
schema.methods.isReserved = async function () {
    const existOrder = await Order.findOne({
        status: {
            $ne: OrderStatus.Cancelled,
        },
        ticket: this,
    });
    return !!existOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', schema);

export { Ticket };
