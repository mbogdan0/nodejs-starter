import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

export interface IPrice {
    price: number;
    priceText?: string;
    application: any;
    date: Date;
}


const PriceSchema = new Schema({
    price: {
        type: Number,
        index: true,
        required: true
    },
    priceText: {
        type: String
    },
    application: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    date: {
        required: true,
        type: Date,
        index: true
    }
});

export const Price = mongoose.model('Price', PriceSchema);
