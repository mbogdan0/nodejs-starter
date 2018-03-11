import {IApplication, Application} from '../models/application/application';
import {IPrice, Price} from '../models/price/price';
import {SiteJSON} from './site-json';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import config from '../config';
import * as request from 'request';
import * as fs from 'fs';

export const addAppDb = (json: SiteJSON): Promise<any> => {
    return new Promise((resolve, reject) => {
        let lastUpdate = json.data.attributes.versionHistory;
        if (lastUpdate && lastUpdate.length) {
            lastUpdate = lastUpdate[0];
            lastUpdate = lastUpdate ? lastUpdate.releaseDate : null;
            if (lastUpdate) {
                lastUpdate = moment(lastUpdate).toDate();
            }
        }
        let releaseDate = json.data.attributes.releaseDate;
        if (releaseDate) {
            releaseDate = moment(releaseDate).toDate();
        }
        const app: IApplication = {
            appid: json.data.id,
            active: true,
            copyright: json.data.attributes.copyright,
            description: json.data.attributes.description,
            title: json.data.attributes.name,
            deviceIpad: json.data.attributes.deviceFamilies.indexOf('ipad') !== -1,
            deviceIphone: json.data.attributes.deviceFamilies.indexOf('iphone') !== -1,
            deviceIpod: json.data.attributes.deviceFamilies.indexOf('ipod') !== -1,
            urlItunes: json.data.attributes.url,
            subtitle: json.data.attributes.subtitle,
            size: json.data.attributes.size,
            category: json.category,
            releaseDate: releaseDate,
            hasInAppPurchases: json.data.attributes.hasInAppPurchases,
            picture: json.picture,
            lastUpdateSoft: lastUpdate,
            rating: json.data.attributes.userRating.value,
            ratingCount: json.data.attributes.userRating.ratingCount,
            timeAdd: moment().toDate()
        };
        const price = {
            price: json.included[0].attributes.price,
            priceText: json.included[0].attributes.priceFormatted
        };
        Application.findOne({appid: app.appid}).lean().select('_id picture').then(found => {
            let foundId = found ? mongoose.Types.ObjectId(found._id) : null;
            const prevPicture = found ? found.picture : null;
            addOrUpdate(app, foundId, prevPicture).then((added: any) => {
                if (added && added._id) {
                    foundId = mongoose.Types.ObjectId(added._id);
                }
                updateCost(foundId, price).then(resolve).catch(reject);
            }).catch(reject);
        }).catch(reject);
    });
}

const uploadPicture = (picurl, id, picIsTheSame = false) => {
    return new Promise((resolve, reject) => {
        if (picIsTheSame) {
            return resolve(null);
        } else { // url is changed
            const up_title = id + '.jpg';
            const upPath = config.uploadDir + up_title;
            request.get(picurl)
                .on('error', (err) => {
                    reject(err);
                })
                .on('complete', () => {
                    resolve(upPath);
                })
                .pipe(fs.createWriteStream(upPath));
        }
    });
}

const updateCost = (appId, priceObj) => {
    return new Promise((resolve, reject) => {
        Price.findOne({application: appId}).lean().select('_id date price priceHistory').then(foundPrice => {
            if (foundPrice) {
                if (foundPrice.price !== priceObj.price) {
                    const updatedPrice = {
                        price: priceObj.price,
                        priceText: priceObj.priceText,
                        prevPrice: foundPrice.price,
                        prevPriceText: foundPrice.priceText,
                        application: appId,
                        date: moment().toDate()
                    };
                    Price.update({_id: foundPrice._id}, updatedPrice).then(resolve).catch(reject);
                } else {
                    resolve(null); // price is actual
                }
            } else { // has not found
                const addPrice = {
                    price: priceObj.price,
                    priceText: priceObj.priceText,
                    application: appId,
                    date: moment().toDate()
                };
                new Price(addPrice).save().then(resolve).catch(reject);
            }
        }).catch(reject);
    });
}

const addOrUpdate = (appData, foundId, prevPicUrl = ''): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (foundId) {
            const picIsTheSame = appData.pictue === prevPicUrl;
            uploadPicture(appData.picture, appData.appid, picIsTheSame).then(localPicurl => {
                if (localPicurl) {
                    appData.localPicture = localPicurl;
                }
                Application.update({_id: foundId}, appData).then(resolve).catch(reject);
            }).catch(reject);
        } else {
            uploadPicture(appData.picture, appData.title, appData.appid).then(localPicurl => {
                appData.localPicture = localPicurl;
                new Application(appData).save().then(resolve).catch(reject);
            }).catch(reject);
        }
    });
};
