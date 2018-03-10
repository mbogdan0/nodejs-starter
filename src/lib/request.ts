import * as request from 'request';

const getbody = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        request(url, (err, response, body) => {
            if (err) {
                return reject(err);
            } else {
                resolve(body);
            }
        });
    });
};

export {getbody};