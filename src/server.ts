import * as mongoose from 'mongoose';
import config from './config';
import {getbody} from './lib/request';
import {getLinks} from './lib/list';
import {AddDb} from './lib/add-db';

mongoose.connect(config.mongoUri, { autoIndex: false }).then(() => {
    console.log('MongoDB is connected');
    new AddDb();
}).catch((err: any) => {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});
