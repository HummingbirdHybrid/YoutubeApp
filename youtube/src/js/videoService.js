

class ItemCreation{
    constructor(data){
        var createItem = function(data) {
            var htmlItem = '<div class="video-info"><img src="'+data.thumbnail+'"></div>' +
                '<div class="info"><a href='+data.youtubeLink+' target="_blank"><p class="title">'+data.title+'</a></p>' +
                '<i class="fa fa-angle-down fa-2x place"></i><input type="checkbox">' +
                '<div class="info-view"><p><i class="fa fa-user"></i>'+data.author+'</p>' +
                '<p><i class="fa fa-eye"></i>'+data.viewCount+'</p>' +
                '<p><i class="fa fa-thumbs-up"></i>' + data.likeCount +
                '<i class="fa fa-thumbs-down"></i>'+data.dislikeCount + '</p>' +
                '</div><p class="calendar-holder"><i class="fa fa-calendar calendar"></i>' + data.publishDate+ '</p>' +
                '<div class="description">' + data.description +'</div></div>';

            var newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = htmlItem;
            return newItem;
        };
        this.item = createItem(data);
    }
    static PageCreation(data){
        var createPage = function(data){
            var li = document.createElement('li');
            li.id = "" + data;
            li.classList.add('non-active');
            li.innerHTML = '<div class="page-index"></div>';
            li.firstChild.innerHTML = '<span>'+ (data+1) +'</span>';
            return li;
        };
        this.li = createPage(data);
    };
};
module.exports = ItemCreation;
