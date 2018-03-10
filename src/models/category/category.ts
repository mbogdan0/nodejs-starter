import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

export interface ICategory {
    title: String;
}


const CategorySchema = new Schema({
    title: {
        type: String,
        index: true,
        trim: true,
        required: true,
        unique: true
    }
});

export const Category = mongoose.model('Category', CategorySchema);
