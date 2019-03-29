
/**
 * Allows for interception of the request and response of an API call.
 */
export default class ApiCallHandler{
    constructor(){
        if (this.constructor === ApiCallHandler) {
            throw new Error('Cannot instantiate ApiCallHandler directly.'); 
        }
    }

    async invoke(request, next){
        throw new Error('ApiCallHandler::invoke is not implemented.');
    }

}