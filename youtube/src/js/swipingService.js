
class Swipe{
    constructor(container) {
        this.container = container;
        this.divContainer = container.divContainer;
        this.wrap = container.wrap;
        this.items = container.items;
        this.firstVisibleItem = container.firstVisibleItem;
        this.defaultSwipeWidth = 160;
    }
    initSwipe (){
        this.divContainer.onmousedown = function (event) {
            event.preventDefault();
            var startMousePos = event.pageX;

            document.onmousemove = function(event){
                event.preventDefault();
                if(event.pageX - startMousePos > this.defaultSwipeWidth){
                    this.swipe('left');
                }else if(startMousePos - event.pageX > this.defaultSwipeWidth){
                    this.swipe('right');
                }else{
                    this.drag(startMousePos - event.pageX);
                }
            }.bind(this);

            document.onmouseup = function(event){
                if(Math.abs(startMousePos - event.pageX) < this.defaultSwipeWidth){
                    this.swipe('stay');
                }
                document.onmousemove = null;
            }.bind(this);
        }.bind(this);
    };
    initTouch(){
        var startMousePos = 0;

        this.divContainer.addEventListener('touchstart',function(event){
            event = event.changedTouches[0];
            startMousePos = event.pageX;

        }.bind(this));
        this.divContainer.addEventListener('touchend',function(event){
            event = event.changedTouches[0];
            if(event.pageX - startMousePos > 50){
                this.drag(-(event.pageX - startMousePos));
                this.swipe('left');
            }else if(startMousePos - event.pageX > 50) {
                this.swipe('right');
            }
        }.bind(this));
    };
    drag (dist) {
        var activePage = this.container.paging.activePage;
        var translate = -activePage*(parseInt(this.wrap.style.width));
        this.divContainer.style.webkitTransform = "translateX("+(translate-dist)+"px)";
        this.divContainer.style.transform = "translateX("+(translate-dist)+"px)";
    };
    swipe(direction){
        var activePage = this.container.paging.activePage;
        var page;
        if(direction === 'right'){
            var n = this.container.blocksOnPageCount();
            if(this.firstVisibleItem + n + 1 > this.container.items.length){
                this.container.search.searchRequest();
                page = this.move(activePage + 1);
                document.onmousemove = null;
                document.ontouchmove = null;
                this.container.paging.updateActivePage(page);
            }else {
                page = this.move(activePage + 1);
            }
        }else if(direction === 'left'){
            if(activePage === 0){
                page = this.move(activePage);
            }else {
                page = this.move(activePage - 1);
            }
        } else {
            page = this.move(activePage);
        }
        document.onmousemove = null;
        document.ontouchmove = null;
        this.container.paging.updateActivePage(page);
    };
    move(index){
        this.firstVisibleItem = index*this.container.blocksOnPageCount();
        var translate = -index*(parseInt(this.wrap.style.width));
        this.divContainer.style.transition = "all .5s";
        this.divContainer.style.webkitTransform = "translateX("+(translate)+"px)";
        this.divContainer.style.transform = "translateX("+(translate)+"px)";
        setTimeout(function(){
            this.divContainer.style.transition = "";
        }.bind(this),500);
        return this.firstVisibleItem;
    };

}
module.exports = Swipe;
