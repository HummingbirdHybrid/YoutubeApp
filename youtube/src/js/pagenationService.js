const ItemCreation = require('./videoService');

class Paging{
    constructor(container){
        this.container = container;
        this.paging = null;
        this.pages = 0;
        this.activePage = 0;
        this.swipe = container.swipe;
        this.firstVisibleItem = container.firstVisibleItem;
    };
    initPaging(){
        this.paging = this.paging || this.createPaging();
        this.createPages();
    };
    createPaging(){
        var footer = document.querySelector('footer');
        footer.innerHTML = "";
        var wrap = document.createElement('div');
        wrap.className = "paging-container";
        wrap.innerHTML = '<ul class="paging" id="paging"></ul>';
        footer.appendChild(wrap);
        return wrap.firstChild;
    };
    createPages(){
        var n = this.container.blocksOnPageCount();
        this.pages = Math.ceil(this.container.items.length/n);
        this.paging.innerHTML = "";
        for( var i = 0; i < this.pages; i++ ){
            var li = new ItemCreation.PageCreation(i);
            li.li.innerHTML = '<p class="tooltip">'+i+'</p>';
            li.li.addEventListener('click',function(event){
                var element = event.target;
                this.activePage = element.getAttribute('id');
                this.firstVisibleItem = this.swipe.move(this.activePage);
                this.showActivePage();
            }.bind(this));
            this.paging.appendChild(li.li);
        }
        this.showActivePage();
    };
    showActivePage() {
        this.findActivePage();
        for (var i = 0; i < this.pages; i++) {
            if( i == this.activePage){
                if(!this.paging.children[i].classList.contains('active')){
                    this.paging.children[i].classList.remove('non-active');
                    this.paging.children[i].classList.add('active');

                }
            } else{
                if(this.paging.children[i].classList.contains('active')){
                    this.paging.children[i].classList.remove('active');
                    this.paging.children[i].classList.add('non-active');
                }
            }
        }
    };
    updateActivePage(firstItem){
        this.firstVisibleItem = firstItem;
        this.showActivePage();
    };
    findActivePage (){
        var count = this.paging.children.length;
        var n = this.container.blocksOnPageCount();
        var k = Math.ceil(this.firstVisibleItem/n);
        if(count === k){
            k -= 1;
        }
        this.activePage = k;
    };
}

module.exports = Paging;
