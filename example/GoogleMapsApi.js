import { ApiGet, ApiPost, ApiDelete, ApiPut, ApiParameter } from "services/rest";

export default class GoogleMapsApi {
    @ApiPost(
        "directions/json",
        ApiParameter.query('origin'),
        ApiParameter.query('destination'),
        ApiParameter.query('waypoints'),
        ApiParameter.query('mode'))
    directions(origin, destination, waypoints, mode) { }
}