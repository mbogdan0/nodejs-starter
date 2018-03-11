import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

export interface IApplication {
    appid: string;
    title: string;
    subtitle?: string;
    description?: string;
    picture?: any;
    active: boolean;
    hasInAppPurchases?: boolean;
    releaseDate?: any;
    lastUpdateSoft?: any;
    category: any;
    size?: number;
    deviceIphone?: boolean;
    deviceIpad?: boolean;
    deviceIpod?: boolean;
    copyright?: string;
    urlItunes: string;
    rating?: any;
    ratingCount?: any;
    timeAdd: any;
    localPicture?: string;
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
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        index: false
    },
    picture: {
        type: String,
    },
    localPicture: {
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
        type: String,
        index: true,
        trim: true
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
    },
    rating: {
        type: Number,
        index: true
    },
    ratingCount: {
        type: Number,
        index: true
    },
    timeAdd: {
        type: Date,
        index: true
    }
});

export const Application = mongoose.model('Application', ApplicationSchema);
