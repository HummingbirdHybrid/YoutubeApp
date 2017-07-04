const ItemCreation = require('./videoService');
const Swipe = require('./swipingService');
const Paging = require('./pagenationService');
const $ = require('./jquery');

class ItemsContainer{
    constructor(){
        this.divContainer = document.querySelector('.content-container');
        this.wrap = document.querySelector('.wrap');
        this.firstVisibleItem = 0;
        this.visibleItems = 0;
        this.items = [];
        this.swipe = null;
        this.paging = null;
        this.search = null;
    };
    addItem (data) {
        let newBlock = new ItemCreation(data);
        this.divContainer.appendChild(newBlock.item);
        this.items.push(newBlock.item);
    };
    blocksOnPageCount(){
        this.visibleItems = Math.floor((window.innerWidth) / 320);
        if (this.visibleItems === 0) {
            this.visibleItems = 1;
        }
        return this.visibleItems;
    };
    contentCreation (videoList){
        var i = this.items.length;
        for(i;i<videoList.length;i++){
            var newBlock = this.addItem(videoList[i]);
        }
        $('#progress-bar').DOM[0].style.width = '88%';
        this.defineWidth();
        this.paging.initPaging();
    };
    defineWidth (){
        var wrapWidth = this.blocksOnPageCount()*320;
        this.wrap.style.width = wrapWidth + 'px';
        var containerWidth = this.items.length * 320;
        this.divContainer.style.width = containerWidth + 'px';
    };
    initContainer(){
        this.divContainer.innerHTML = "";

        this.swipe = new Swipe(this);
        this.swipe.initSwipe();
        this.swipe.initTouch();

        this.paging = new Paging(this);
        this.paging.initPaging();

        window.addEventListener('resize', function () {
            this.update();
        }.bind(this));
    };
    update(){
        this.defineWidth();
        this.paging.initPaging();
    };

};

module.exports = ItemsContainer;
