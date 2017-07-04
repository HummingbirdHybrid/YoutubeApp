const $ = require ('./jquery');
const OAUTH2_API_KEY = 'AIzaSyBLhjGs-fTY64swcHFsyQgxcpWj4r3-zDA';
class VideoSearch {
    constructor(textRequest,itemsContainer){
        this.MAX_RESULTS = 15;
        this.searchStr = textRequest;
        this.nextPage = "";
        this.videoList = [];
        this.videoId = [];
        this.container = itemsContainer;
        this.order = "relevance";
        itemsContainer.search = this;
    }
     searchRequest(){
        $('#progress-bar').DOM[0].style.width = '1%';
        var request = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + this.searchStr;
        if(this.nextPage){
            request = request+"&type=video&pageToken="+this.nextPage;
        }
        request = request + "&type=video&order="+this.order+"&maxResults="+this.MAX_RESULTS+"&key="+OAUTH2_API_KEY;
       fetch(request,{
            method: 'GET'
        }).then(function (response) {
           if(response.ok) {
               return response.json();
           }
           $('#msg-board').DOM[0].innerHTML='<h2> ERROR:' + response.ok+ '<h2>';
       }).then(function (result) {
                if (result.items.length == 0) {
                    $('#msg-board').DOM[0].innerHTML = '<h2>'+ this.searchStr+' not found.</h2>';
                } else {
                    $('#progress-bar').DOM[0].style.width = '25%';
                    this.videoId = [];
                    this.nextPage = result.nextPageToken;
                    var i = this.videoList.length;
                    this.parseYoutubeResponse(result);
                    $('#progress-bar').DOM[0].style.width = '35%';
                    for (i; i < this.videoList.length; i++) {
                        this.videoId.push(this.videoList[i].id);
                    }
                    this.loadStatistics(this.videoId);
                    $('#progress-bar').DOM[0].style.width = '55%';
                    $('#msg-board').DOM[0].innerText = '';
                }

        }.bind(this)).catch(function (error) {
           $('#msg-board').DOM[0].innerHTML='<h2>NETWORK ERROR:' + error.message+ '<h2>';
       });

    };
    loadStatistics(videoId){
        var idsStr = videoId.join(',');
        var request = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + idsStr + '&maxResults=1&key='+OAUTH2_API_KEY;
        fetch(request,{
            method: 'GET'
        }).then(function (response) {
            if(response.ok) {
                return response.json();
            }
            $('#msg-board').DOM[0].innerHTML='<h2>ERROR:' + response.ok+ '<h2>';
        }).then(function (result) {
            {
            if (result.items.length == 0) {
                $('#msg-board').DOM[0].innerHTML='<h2>No result for' + this.searchStr + '<h2>';
            } else {
                this.parseStatistics(result);
                $('#progress-bar').DOM[0].style.width = '75%';
                this.container.contentCreation(this.videoList);
                $('#progress-bar').DOM[0].style.width = '100%';
                setTimeout(()=>  $('#progress-bar').DOM[0].style.transition = '0s',300);
                setTimeout(()=>
                {
                    $('#progress-bar').DOM[0].style.width = '0';
                    setTimeout(()=>$('#progress-bar').DOM[0].style.transition = '0.9s',300)

                },1111);
            }

        }}.bind(this)).catch(function (error) {
            $('#msg-board').DOM[0].innerHTML='<h2>NETWORK ERROR:' + error.message+ '<h2>';
        })

    };
    parseYoutubeResponse(data){
        var items = data.items;
        if(!items.length){
            $('#msg-board').DOM[0].innerHTML = '<h2>BAD REUQEST </h2>'
        } else {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var date = new Date(Date.parse(item.snippet.publishedAt));
                this.videoList.push({
                    id: item.id.videoId,
                    youtubeLink: "http://www.youtube.com/watch?v=" + item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high.url,
                    description: item.snippet.description,
                    author: item.snippet.channelTitle,
                    publishDate: date.getDate() + '.' + (1 + date.getMonth()) + '.' + date.getFullYear(),
                    viewCount: '',
                    likeCount: '',
                    dislikeCount: ''
                });
            }
        }
    };
    parseStatistics(data){
        var items = data.items;
        if(!items.length){
            $('#msg-board').DOM[0].innerHTML = '<h2>BAD REQUEST</h2>'
        } else {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                this.videoList[i].viewCount = item.statistics.viewCount;
                this.videoList[i].likeCount = item.statistics.likeCount;
                this.videoList[i].dislikeCount = item.statistics.dislikeCount;
            }
        }
    };
};

module.exports = VideoSearch;
