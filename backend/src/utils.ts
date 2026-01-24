export interface SignBodyType {
    username: string,
    password: string
}

export interface JWTType{
    id: string
}

export interface DelContentType{
    contentId? : string
}

export interface ContentBodyType{
    link:string,
    type:string,
    title:string,
    tags:string[],
    userId: string
}

export interface ShareType{
    share : boolean
}

export interface ShareLinkType{
    shareLink : string
}

export enum ResponseCodes {
    Success = 200,        // OK
    BadRequest = 400,     // Client-side input error
    Unauthorized = 401,   // Authentication required
    Forbidden = 403,      // User not allowed
    NotFound = 404,       // Resource not found
    InternalError = 500   // Server-side error
}
