import ApiCallHandler from 'services/rest/ApiCallHandler'

export default class ApiKeyCallHandler extends ApiCallHandler{
    /**
     * Creates a new instance of ApiKeyCallHandler
     * @param {string} apiKey The api key.
     */
    constructor(apiKey){
        super();
        
        this.apiKey = apiKey;
    }

    async invoke(request, next){
        request.params["key"] = this.apiKey;
        return await next(request);
    }
}