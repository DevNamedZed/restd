import qs from 'qs'
import ApiParameterType from './ApiParameterType'
import { createUriTemplate } from './UriTemplate';


/**
 *  Transforms a call to a function decorated with ApiFunction into a http request.  
 */
export default class ApiFunctionInvoker{

    constructor(name, httpMethod, template, apiParameters, responseType){
        this.name = name;
        this.httpMethod = httpMethod;
        this.template = createUriTemplate(template);
        this.apiParameters = apiParameters;
        this.responseType = responseType;
    }

    /**
     * Invokes the api.
     * @param {*} apiClient The api client that will be used to call the endpoint.
     * @param {*} args The arguments that were passed into the api function.
     */
    invoke(apiClient, args){
        let pathParameters =  {};
        let queryParameters = {};
        let headerParameters = {};
        let bodyParameter = null;
        let config = { };

        for (let index = 0; index < this.apiParameters.length; index++){
            let current = this.apiParameters[index];
            switch (current.type){
                case ApiParameterType.Path:
                    if (args.length < current.index){
                        throw new Error(`Missing required path parameter {current.name}.`);
                    }

                    pathParameters[current.name] = args[current.index];
                    break;
                
                case ApiParameterType.Query:
                    queryParameters[current.name] = args[current.index];
                    break;     
                
                case ApiParameterType.Header:
                    headerParameters[current.name] = args[current.index];
                    break;   
                    
                case ApiParameterType.Body:
                    if (args.length - 1 >= current.index){
                        bodyParameter = args[current.index];
                        if (current.contentType === 'application/x-www-form-urlencoded'){
                            bodyParameter = qs.stringify(bodyParameter);
                        }
                    }    
                                        
                    headerParameters['Content-Type'] = current.contentType;
                    break;               
                    

                case ApiParameterType.QueryMap:
                    var queryMapArg = args[current.index];
                    if (queryMapArg){
                        queryParameters = { ...queryParameters, ...queryMapArg };
                    }

                    break;

                case ApiParameterType.Config:
                    config = args[current.index];
                    break;

                default:
                    throw new Error(`Unknown api function parameter type.`)
            }
        }

        let path = this.template.build(pathParameters);
        return apiClient.callService(
            this.httpMethod, 
            path,
            queryParameters, 
            bodyParameter, 
            headerParameters,
            this.responseType,
            config);
    }
}