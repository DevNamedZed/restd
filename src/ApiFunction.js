import HttpMethod from './HttpMethod'

function ApiFunction(httpMethod, template, parameters) {
    return function decorator(target, name, descriptor) {
        if (!descriptor.value.apiFunction){
            descriptor.value.apiFunction = {};
        }

        descriptor.value.apiFunction.httpMethod = httpMethod;
        descriptor.value.apiFunction.template = template;
        descriptor.value.apiFunction.parameters = parameters;
        
        return descriptor;
    };
}

function ApiGet(template, ...parameters) {
    return ApiFunction(HttpMethod.Get, template, parameters);
}

function ApiPost(template, ...parameters) {
    return ApiFunction(HttpMethod.Post, template, parameters);
}

function ApiPut(template, ...parameters) {
    return ApiFunction(HttpMethod.Put, template, parameters);
}

function ApiDelete(template, ...parameters) {
    return ApiFunction(HttpMethod.Delete, template, parameters);
}

export { ApiFunction, ApiGet, ApiPost, ApiPut, ApiDelete }