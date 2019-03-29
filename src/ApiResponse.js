
function ApiResponse(contentType) {
    return function decorator(target, name, descriptor) {
        if (!descriptor.value.apiFunction){
            descriptor.value.apiFunction = {};
        }

        descriptor.value.apiFunction = { ...descriptor.value.apiFunction, responseType: contentType };
        return descriptor;
    };
}

function JsonResponse() {
    return new ApiResponse('json');
}

function BinaryResponse() {
    return new ApiResponse('blob');
}

export { ApiResponse, JsonResponse, BinaryResponse }