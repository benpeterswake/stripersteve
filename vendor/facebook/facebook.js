$(document).ready(function () {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: '423491668471009',
            version: 'v2.7' // or v2.1, v2.2, v2.3, ...
        });
    });
});