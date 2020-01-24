import $ from 'jquery';


const api = {};

api.getData = function getData(marker) {
    const title = marker.title.toString();
    const url = `http://en.wikipedia.org/w/api.php?action=opensearch&search=${title}&format=json`;

    // const resolve = async () => await $.ajax({
    const resolve = $.ajax({
        url: url,
        dataType: "jsonp",
        jsonp: "callback"
    });
    return resolve;
}

export default api;
