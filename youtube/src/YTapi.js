const $ = require('./jquery');

module.exports = (function () {
    var YT = {
        //prepare the request
        videoSearch:function (query) {
            let that = this;
            let request = gapi.client.youtube.search.list(
                {
                    part:'snippet',
                    type:'video',
                        q: encodeURIComponent( that['search'].value).replace(/%20/g,'+'),
                    maxResults:6,
                    order:"viewCount"
                }
            );
            var result;
            // execute the request
           request.execute(function (response) {
               console.log(response);
               $('#results').append(JSON.stringify(response));
            });

        }
    };
    return YT;
}());
