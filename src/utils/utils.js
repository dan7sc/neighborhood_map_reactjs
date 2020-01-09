
exports.createMapScriptTag = function(KEY) {
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
}

