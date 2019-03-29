# RESTD - Declaritive REST Client

A very simple declaritive rest client using js decorators

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