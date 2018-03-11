import {getbody} from './request';
import * as cheerio from 'cheerio';

const u = 'https://itunes.apple.com/ru/genre/ios-%D0%B8%D0%B3%D1%80%D1%8B/id6014?mt=8';


class ManageLinks {}

const getLinks = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        getbody(u).then(html => {
            const $ = cheerio.load(html);
            const urls = [];
            $('#selectedcontent a').each(function() {
               urls.push($(this).attr('href'));
            });
            resolve(urls);
        }).catch(reject);
    });
}

export {getLinks};