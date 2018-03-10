import {IApplication, Application} from '../models/application/application';
import {ICategory, Category} from '../models/category/category';
import {IPrice, Price} from '../models/price/price';
import {SiteJSON} from './site-json';

export const addAppDb = (json: SiteJSON): Promise<any> => {
    return new Promise((resolve, reject) => {
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
            category: null,
            releaseDate: new Date(json.data.attributes.releaseDate),
            hasInAppPurchases: json.data.attributes.hasInAppPurchases,
            picture: null,
            lastUpdateSoft: new Date(),
        };

        let _id = app.appid;
        delete app.appid;
        Application.update({appid: _id}, app, {
            upsert: true,
            setDefaultsOnInsert: true
        }).then(done => {
            console.log(done);
            resolve(done);
        }).catch(reject);
    });
}