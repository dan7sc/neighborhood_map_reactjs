import fsapi from '../apis/four-square/api';
import flickrApi from '../apis/flickr/api';


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
        list.push(`<p key='address'>${address}</p>`);
        list.push(`<p key='city'>${city}</p>`);
        list.push(`<p key='country'>${country}</p>`);
        return id;
    }).then(async id => {
        const request = fsapi.getPhotoUrl(marker, id);
        const resolve = await request.then(data => {
            // Get the photo url;
            const response = data.response.photos.items[0];
            const photoUrl = response.prefix + '200x200' + response.suffix;
            // Set information in the page
            list.push(`<img key='photo' src=${photoUrl} alt="${marker.title}" height="170" width="200" />`);
        }).catch(async () => {
            // const msg = `<a key='dataError'>Four Square Photo Could Not Be Loaded</p>`;
            // list.push(msg);
            const fdata = await requestFlickrData(marker);
            list.push(fdata);
        });
    }).catch(() => {
        const msg = `<p key='photoError'>Four Square Data Could Not Be Loaded</p>`;
        list.push(msg);
    });
    return list;
};

async function requestFlickrData(marker) {
    const list = [];
    const request = flickrApi.getPhoto(marker);
    const resolve = await request.then(data => {
        // Choose random photo index
        const index = Math.round( (Math.random() * 100) % 10 );
        // Get response
        const response = data.photos.photo[index];
        // Get photo details
        const id = response.id;
        const secret = response.secret;
        const server = response.server;
        const farm = response.farm;
        const title = response.title;
        const size = 'm';
        // Set photo in the page
        const photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
        const photoView = `<img src=${photoUrl} alt="${title}" height="170" width="200" />`;
        list.push(photoView);
    }).catch(() => {
        const msg = `<p key='flickrError'>Flickr Photo Could Not Be Loaded</p>`;
        list.push(msg);
    });
    return list;
}

export default utils;
