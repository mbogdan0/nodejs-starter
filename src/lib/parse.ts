const parseJSON  = (json: string) => {
    let parsed;
    try {
        parsed = JSON.parse(json);
    } catch (e) {
        throw e;
    }
    return parsed;
};

const jsonOnPage = (data: string): string => {
    const f1 = data.split('id="shoebox-ember-data-store">');
    if (!f1 || f1.length < 2) {
        return null;
    }
    const splitted = f1[1];
    const f2 = splitted.split('</scr' + 'ipt>');
    if (!f2 || f2.length < 2) {
        return null;
    }
    return f2[0];
};

const tryParse = (data: string) => {
    const text = jsonOnPage(data);
    if (!text) {
        throw new Error('JSON Obj is null');
    }
    let json;
    try {
        json = parseJSON(text);
    } catch (e) {
        throw new Error(e);
    }
    return json;
}

export {tryParse, jsonOnPage, parseJSON};