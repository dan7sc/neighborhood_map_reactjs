import $ from 'jquery';


const api = {};

// Function loads flickr data
api.getPhoto = function getPhoto(marker) {
    // Set flickr url
    const url = `https://api.flickr.com/services/rest/?` +
          `method=flickr.photos.search&` +
          `api_key=${process.env.REACT_APP_FLICKR_KEY}&` +
          `media=photos&privacy_filter=1&format=json& ` +
          `lat=${marker.position.lat()}&` +
          `lon=${marker.position.lng()}&` +
          `radius=.1&radius_units=mi`;

    const resolve = $.ajax({
        url: url,
        dataType: "jsonp",
        jsonp: "jsoncallback"
    }).done(function(response) {
        return response;
    });
    return resolve;
};

export default api;
