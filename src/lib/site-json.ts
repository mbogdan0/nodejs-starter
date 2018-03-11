
interface UserRating {
    value: number;
    ratingCount: number;
    ratingCountList: number[];
    ariaLabelForRatings: string;
}
interface VersionHistory {
    releaseNotes: string;
    versionString: string;
    releaseDate: string;
}
interface Attributes {
    deviceFamilies: string[];
    userRating: UserRating;
    copyright: string;
    name: string;
    description: string;
    hasInAppPurchases: boolean;
    releaseDate: any;
    url: string;
    size: number;
    subtitle: string;
    versionHistory: any;
}
interface Data {
    id: string;
    attributes: Attributes;
}
interface IncludeAttributes1 {
    price: number;
    priceFormatted: String;
}

interface IncludeAttributes3 {
    attributes: {
        url: string
    };
}

interface Included {
    attributes: any;
}

export interface SiteJSON {
    data: Data;
    included: Included;
    category: any;
    picture: any;
}

