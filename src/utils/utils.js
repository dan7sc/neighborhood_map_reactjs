import fsapi from '../apis/four-square/api';


const utils = {};

utils.createMapScriptTag = function(KEY) {
    const URL = 'https://maps.googleapis.com/maps/api/js';
    const VERSION = '3';
    const mapScriptTag = document.createElement('script');
    mapScriptTag.type = 'text/javascript';
    mapScriptTag.src = `${URL}?key=${KEY}&v=${VERSION}`;
    mapScriptTag.async = true;
    mapScriptTag.defer = true;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(mapScriptTag, firstScriptTag);

    return mapScriptTag;
};

utils.requestFoursquareData = async function(marker) {
    const list = [];
    const request = fsapi.getLocation(marker);
    const resolve = await request.then(data => {
        const response = data.response.venues[0];
        // Get information about the marker
        const id = response.id;
        const address = response.location.formattedAddress[0];
        const city = response.location.formattedAddress[1];
        const country = response.location.formattedAddress[2];
        list.push(`<li key='address'>${address}</li>`);
        list.push(`<li key='city'>${city}</li>`);
        list.push(`<li key='country'>${country}</li>`);
        return id;
    }).then(async id => {
        const request = fsapi.getPhotoUrl(marker, id);
        const resolve = await request.then(data => {
            // Get the photo url;
            const response = data.response.photos.items[0];
            const photoUrl = response.prefix + '200x200' + response.suffix;
            // Set information in the page
            list.push(`<img key='photo' src=${photoUrl} alt="${marker.title}" height="170" width="200" />`);
        }).catch(() => {
            const msg = `<li key='dataError'>Four Square Photo Could Not Be Loaded</li>`;
            list.push(msg);
        });
    }).catch(() => {
        const msg = `<li key='photoError'>Four Square Data Could Not Be Loaded</li>`;
        list.push(msg);
    });
    return list;
};

export default utils;
