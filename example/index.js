import GoogleMapsClient from './GoogleMapsApi'

const origin = {
    longitude: -81.3097258,
    latitude: 28.5247367
}

const destination = {
    longitude: -81.3775196,
    latitude: 28.5325707,
}

GoogleMapsClient.directions(
    `${origin.latitude},${origin.longitude}`, 
    `${destination.latitude},${destination.longitude}`)
.then(r => {
        console.log(r)
})
.error(e => {
    console.log(e)
})
