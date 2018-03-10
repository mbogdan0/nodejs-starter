import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

export interface IApplication {
    appid: number;
    title: string;
    subtitle?: string;
    description?: string;
    picture?: string;
    active: boolean;
    hasInAppPurchases?: boolean;
    releaseDate?: Date;
    lastUpdateSoft?: Date;
    category: any;
    size?: number;
    deviceIphone?: boolean;
    deviceIpad?: boolean;
    deviceIpod?: boolean;
    copyright?: string;
    urlItunes: string;
}



const ApplicationSchema = new Schema({
    appid: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        index: true,
        trim: true,
        required: true
    },
    subtitle: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        index: false
    },
    picture: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
        index: true
    },
    hasInAppPurchases: {
        type: Boolean,
        index: true
    },
    releaseDate: {
        type: Date,
        index: true
    },
    lastUpdateSoft: {
        type: Date,
        index: true
    },
    category: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    size: {
        type: Number,
        index: true
    },
    deviceIphone: {
        type: Boolean,
        index: true
    },
    deviceIpad: {
        type: Boolean,
        index: true
    },
    deviceIpod: {
        type: Boolean,
        index: true
    },
    copyright: {
        type: String
    },
    urlItunes: {
        type: String,
        require: true
    }
}, { autoIndex: false });

export const Application = mongoose.model('Application', ApplicationSchema);
