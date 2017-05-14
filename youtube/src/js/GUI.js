const $ = require('./jquery');
const ItemsContainer = require('./itemsController');
const VideoSearch = require('./videoSearchController');

class GUI{
    constructor(){};
    static init(){
        document.body.innerHTML +=
            '<header class="header">' +
            '<div class="wrap">' +
            '<div class="logo"><h1> <span>Y</span>O<span>U</span>T<span>U</span>B<span>E</span><span></span><span></span></h1></div> '+
            '<input type="text" placeholder="Search for videos in youtube" id="text-search">' +
            '</header>'+
            '<div class="content-container"></div></div>'+
            '<div id="msg-board">You haven&#39;t searched for any video yet!</div>'+
             '<div id="progress-bar"></div>'+
            '<footer></footer>' ;

        var inputSearch = document.querySelector('#text-search');

        inputSearch.addEventListener('keypress', function(event){
            if(event.keyCode === 13){
                startSearch();
            }
        });

        function startSearch(){
            var searchSrc = inputSearch.value;
            var itemsContainer = new ItemsContainer(search);
            itemsContainer.initContainer();
            var search = new VideoSearch(searchSrc,itemsContainer);
            $('#msg-board').DOM[0].innerText = '';
            search.searchRequest();
        };
    }
}
module.exports = GUI;
