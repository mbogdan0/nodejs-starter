
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
    releaseDate: string;
    url: string;
    size: number;
    subtitle: string;
    versionHistory: VersionHistory[];
}
interface Data {
    id: string;
    attributes: Attributes;
}
interface IncludeAttributes {
    price: number;
    priceFormatted: String;
}
interface Included {
    attributes: IncludeAttributes[];
}

export interface SiteJSON {
    data: Data;
    included: Included;
}

