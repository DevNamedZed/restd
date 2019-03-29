# RESTD - Declarative REST Client

A very simple declarative rest client using js decorators. 

## Getting started

Install the npm package and follow example and documentation below

```
npm i restd --save
```

## Example

Create a class and use methods of that class to declare methods of the API

```
import { ApiGet, ApiPost, ApiDelete, ApiPut, ApiParameter } from "restd";

export default class UserApi {
    @ApiGet(
        "users/{userId}",
        ApiParameter.path('userId'),
        ApiParameter.query('includeDeleted'),
        ApiParameter.ifNoneMatch())
    getUser(userId, includeDeleted, etag) { }

    @ApiGet(
        "users",
        ApiParameter.queryMap(),
        ApiParameter.queryMap(),
        ApiParameter.queryMap())
    searchUsers(query, sort, pagingInfo){ }
    
    @BinaryResponse()
    @ApiGet(
        "users/{userId}/images/avatar",
        ApiParameter.path('userId'),
        ApiParameter.ifMatch())
    getUserImage(userId, etag) { }   
}
```

Instantiate the ApiClient and the create factory method to create the implemenation for the API.

```
const apiClient = new ApiClient({
    endpoint: 'http://myhost',
    callHandlers: [  ]
});

const userApi = apiClient.create(new UserApi)
```

Call your api

```
const user = await userApi.getUser('userId')
```

## Documentation

### Api Decorators
Methods in the API declaration class must be decorated with an API decorated. These are used to specify the http method, uri template and parameter binding. Four decorators are exposed to handle the standard http methods. 

- ApiGet
- ApiPost
- ApiPut 
- ApiDelete

The first parameter of the standard decorators is the uri template. The next parameter is an array of parameter bindings. 

The ApiFunction decorator can be used for a custom http method.  The ApiFunction decorate differs for the others as it requires the http method name to be passed in as the first parameter.

```
export default class Api {
    @ApiFunction(
        'TRACE'
        "myapi")
    callApi(customer) { }
}
```

### Parameter Binding

Method parameters can be bound to path values, query strings, request body, and header values. The ApiParameter class exposes several static methods to map parameters.

#### json
The ApiParameter.json method is used to map a parameter to the body and will serialize the parameter using json

```
export default class CustomerApi {
    @ApiPost(
        "customers",
        ApiParameter.json())
    createCustomer(customer) { }
}
```

#### binary
The ApiParameter.binary method is used to map a binary parameter to the body of a request.

```
export default class CustomerApi {
    @ApiPost(
        "uploadImage",
        ApiParameter.binary())
    uploadImage(image) { }
}
```

#### form
The ApiParameter.form method is used to map a parameter to the body and will serialize the parameter using x-www-form-urlencoded.

```
export default class CustomerApi {
    @ApiPost(
        "customers",
        ApiParameter.form())
    createCustomer(customer) { }
}
```

#### query
The ApiParameter.query method is used to map a method parameter to a query string value. The name of the query string must be provided.

```
export default class CustomerApi {
    @ApiGet(
        "customers",
        ApiParameter.query('pageToken'))
    searchCustomer(pageToken) { }
}
```

#### queryMap
The ApiParameter.queryMap method is used to map a javascript object method parameter to several query string value. The javascript object will be expanded and its properties included in the query string.

```
export default class CustomerApi {
    @ApiGet(
        "customers",
        ApiParameter.queryMap())
    searchCustomer(searchQuery) { }
}
```

#### path
The ApiParameter.path method is used to bind a parameter with a template path value. 

```
export default class CustomerApi {
    @ApiGet(
        "customers/{customerId}",
        ApiParameter.path('customerId'))
    getCustomer(customerId) { }
}
```

#### header
The ApiParameter.header method is used to map a method parameter with a header value. The name of the header must be specified.

```
export default class CustomerApi {
    @ApiGet(
        "customers/{customerId}",
        ApiParameter.path('customerId'),
        ApiParameter.header('x-request-id'))
    getCustomer(customerId, requestId) { }
}
```

#### ifNoneMatch
The ApiParameter.ifNoneMatch method is used to map a method parameter with a If-None-Match header value. This is equivalent to ApiParameter.header('If-None-Match')

```
export default class CustomerApi {
    @ApiGet(
        "customers/{customerId}",
        ApiParameter.path('customerId'),
        ApiParameter.ifNoneMatch())
    getCustomer(customerId, etag) { }
}
```

#### ifMatch
The ApiParameter.ifMatch method is used to map a method parameter with a If-Match header value. This is equivalent to ApiParameter.header('If-Match')

```
export default class CustomerApi {
    @ApiPut(
        "customers/{customerId}",
        ApiParameter.path('customerId'),
        ApiParameter.json(),
        ApiParameter.ifMatch())
    updateCustomer(customerId, customer, etag) { }
}
```

### Response Type

By default the expected response type is JSON. To specify binary or another response type, decorate the API method with an ApiResponse or BinaryResponse decorator.

```
    @BinaryResponse()
    @ApiGet("myapi/bin")
    getBinary() { }   
```

### Interception

Call handlers can be used to intercept API calls before and after invocation. These allow for both the request and resposne to be modified. Common use cases are authenication and logging.

Create a class that extends the ApiCallHandler and provide implementation for the invoke method.

```
export default class ApiKeyCallHandler extends ApiCallHandler{
    constructor(apiKey){
        super();
        this.apiKey = apiKey;
    }

    async invoke(request, next){
        request.params["key"] = this.apiKey;
        return await next(request);
    }
}
```

Pass the call handler into the ApiConfiguration.

```
const client new ApiClient({
    endpoint: 'https://maps.googleapis.com/maps/api',
    callHandlers: [ new ApiKeyCallHandler('[KEY]') ]
});
```


### Notes
decorators are experimental, make sure to configure required babel plugins to enable
