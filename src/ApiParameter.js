import ApiParameterType from './ApiParameterType'

export default class ApiParameter{
    constructor(args = {
        name: null, 
        type: null, 
        contentType: null }){
        this.name = args.name;
        this.type = args.type;
        this.contentType = args.contentType;
    }

    /**
     * Binds an object parameter to the body using json serialization.
     */
    static json(){
        return new ApiParameter({ type: ApiParameterType.Body, contentType: 'application/json' });
    };

    /**
     * Binds a binary blob parameter to the body.
     */
    static binary(){
        return new ApiParameter({ type: ApiParameterType.Body, contentType: 'application/octet-stream' });
    };
    
    /**
     * Binds a binary blob parameter to the body.
     */
    static form(){
        return new ApiParameter({ type: ApiParameterType.Body, contentType: 'application/x-www-form-urlencoded' });
    };

    /**
     * Binds a function parameter to a query string value.
     * @param name The name of the query string value.
     */
    static query(name){
        return new ApiParameter({ type: ApiParameterType.Query, name: name});        
    };

    /**
     * Binds the properties of an object parameter to the query string.
     */
    static queryMap(){
        return new ApiParameter({ type: ApiParameterType.QueryMap });
    };

    /**
     * Binds a function parameter to a template path parameter.
     * @param name The name of the template parameter.
     */
    static path(name){        
        return new ApiParameter({ type: ApiParameterType.Path, name: name });
    }

    /**
    * Binds a function parameter to a request header.
    * @param name The name of the header.
    */    
    static header(name){        
        return new ApiParameter({ type: ApiParameterType.Header, name: name });
    }

    /**
     * Binds a function parameter to the If-None-Match header.
     */
    static ifNoneMatch(){
        return ApiParameter.header('If-None-Match');
    }

    /**
     * Binds a function parameter to the If-Match header.
     */
    static ifMatch(){
        return ApiParameter.header('If-Match');
    }

    /**
     * Allows caller to specify axios configuration.
     */
    static config() {
        return new ApiParameter({ type: ApiParameterType.Config });
    }
}