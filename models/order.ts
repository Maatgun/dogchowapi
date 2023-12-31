import { Model, Schema, model } from 'mongoose';
import { Types } from 'mongoose';

interface IShippingDetails {
    name: string;
    cellphone: string;
    location: string;
    address: string;
    }

interface IItem {
    id: string;
    price: number;
    quantity: number;
    title: string;
    
    }

export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    price: number;
    shippingCost: number;
    items: IItem[];
    shippingDetails: IShippingDetails;
    status: string;
    total: number;
}

const orderSchema = new Schema<IOrder>({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    },
    items: {
        type: [{
            id: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
        }
            
        ]
    },
    shippingDetails: {
        name: {
            type: String,
            required: true
        },
        cellphone: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});


const Order: Model<IOrder> = model('Order', orderSchema);

export default Order;