(function () {
    window.$ = function (DOM) {
        if(DOM.nodeName) return new JQ([DOM]);
        return new JQ(document.querySelectorAll(DOM));

    };

    class JQ{
        constructor(DOM){
            this.DOM = DOM;
        }
        addClass(){
            return this;
        }
        append(){
            return this;
        }
        html(){
            return this;
        }
        attr(){
            return this;
        }
        children(){
            return this;
        }
        css(){
            return this;
        }
        data(){
            return this;
        }
        on(){
            return this;
        }
        one(){
            return this;
        }
        each(callback) {
            for (var i = 0; i < this.elements.length; i++) {
                callback.call(this.elements[i], i);
            }
            return this;
        }
        }
}());
