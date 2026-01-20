export const JWT_KEY = "WAOOAO"

export enum ResponseCodes {
    Success = 200,        // OK
    BadRequest = 400,     // Client-side input error
    Unauthorized = 401,   // Authentication required
    Forbidden = 403,      // User not allowed
    NotFound = 404,       // Resource not found
    InternalError = 500   // Server-side error
}
