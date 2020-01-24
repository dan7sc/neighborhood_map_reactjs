import $ from 'jquery';

const api = {};

api.getLocation = function getLocation(marker) {
    const url = `https:api.foursquare.com/v2/venues/search?` +
          `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
          `client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20180323&` +
          `ll=${marker.position.lat()},${marker.position.lng()}&limit=1`;

    const resolve = async () => $.getJSON(
        url,
        await function(data) {
            // Get the response
            const response = data.response.venues[0];
            return response;
        });
    return resolve;
};

api.getPhotoUrl = function getPhotoUrl(marker, id) {
    // Set foursquare photo url
    const foursquarePhotoUrl = `https://api.foursquare.com/v2/venues/${id}/photos?` +
          `client_id=${process.env.REACT_APP_CLIENT_ID}&` +
          `client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20180323&` +
          `ll=${marker.position.lat()},${marker.position.lng()}&limit=1`;

    const resolve = async () => $.getJSON(
        foursquarePhotoUrl,
        await function(data) {
            // Get response
            const response = data.response.photos.items[0];
            // Define photo path
            const photoUrl = `${response.prefix}200x200${response.suffix}`;
            return photoUrl;
        });
    return resolve;
};

export default api;
