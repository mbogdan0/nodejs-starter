import * as mongoose from 'mongoose';
import config from './config';



mongoose.connect(config.mongoUri).then(() => {
    console.log('MongoDB is connected');
}).catch((err: any) => {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});


console.log(123);
