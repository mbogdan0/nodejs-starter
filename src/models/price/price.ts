import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';
import * as moment from 'moment';

export interface IPrice {
    price: number;
    priceText?: string;
    application: any;
    date: any;
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
    prevPrice: {
        type: Number,
        index: true
    },
    prevPriceText: {
      type: String
    },
    application: {
        required: true,
        index: true,
        unique: true,
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
