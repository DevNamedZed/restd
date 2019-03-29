import { ApiClient } from 'restd'
import ApiKeyCallHandler from './ApiKeyCallHandler'
import GoogleMapsApi from './GoogleMapsApi'

function createApiClient(){
    return new ApiClient({
        endpoint: 'https://maps.googleapis.com/maps/api',
        callHandlers: [ new ApiKeyCallHandler('[KEY]') ]
    });
}

const apiClient = createApiClient();
const instance = apiClient.create(new GoogleMapsApi);

export default instance;
