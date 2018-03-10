
import {tryParse} from './parse';
import {getbody} from './request';
import {getLinks} from './list';
import {addAppDb} from './add-json-app';

export class AddDb {
    private links: string[];
    constructor() {
        this.loadLinks();
    }
    loadLinks() {
        getLinks().then(links => {
            this.links = links;
            this.fLink();
        }).catch(err => {
            console.error(err);
        });
    }
    fLink() {
        if (this.links.length > 0) {
            const currentLink = this.links.pop();
            this.getNextLink(currentLink);
        } else {
            console.log('Getting new links');
            this.loadLinks();
        }
    }
    getNextLink(url: string) {
        getbody(url).then((response: string) => {
            let jsonResponse;
            try {
                jsonResponse = tryParse(response);
                this.addJSON(jsonResponse);
            } catch (e) {
                console.log(e);
                this.fLink();
            }
        }).catch(err => {
            console.log(err);
            this.fLink();
        });
    }
    addJSON(json: any) {
        addAppDb(json).then(done => {
            console.log(done);
            this.fLink();
        }).catch(e => {
            console.log(e);
            this.fLink();
        });
    }

}


