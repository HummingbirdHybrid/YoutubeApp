module.exports = (function () {
    var $ = function (DOM) {
        if(DOM.nodeName) return new JQ([DOM]);
        return new JQ(document.querySelectorAll(DOM));
    };

    function type(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

    class JQ {
        constructor(DOM){
            this.DOM = DOM;
        }

        addClass(input) {
            if(type(input) == 'String' && input!='') return this.each(function(){
                var classes = this.className.split(/\s/);
                if (classes.indexOf(input) > -1) return;
                if (classes.length === 0) this.className = input;
                this.className += " " + input;
            });
            if(type(input) == 'Function')
                return this.each(function (index) {
                    $(this).addClass(input.call(this, index,this.getAttribute( "class" )));
                })
        };

        append(element){
            if(type(element)=="String") return this.each(function () {
                this.innerHTML+=element;
            });
            if(element.nodeName) return this.each(function () {
                let node=document.createElement(element.tagName);
                node.innerHTML=element.innerHTML;
                this.appendChild(node);
            });
        }

        html(htmlString){
            if(!htmlString) return this.DOM[0].innerHTML;
            if(type(htmlString)=='String') this.each(function () {
                this.innerHTML = htmlString;
            })
        }

        attr(attributeName, value ){
            return value
                ? this.each(x=>this.DOM[x].setAttribute(attributeName,value))
                : this.DOM[0].getAttribute(attributeName);
        }

        children(selector){
            return selector
                ? this.DOM[0].querySelectorAll(selector)
                : this.DOM[0].children;
        }

        css(property, value){
            if(type(property)=='String' && value) return this.each(function () {
                    this.style[property]=value.toString();
                }
            );
            if(type(property)=='String') return getComputedStyle(this.DOM[0])[property];
            if(type(property)=='Object') return this.each(function () {
                for(let i in property){
                    this.style[i]=property[i];
                }
            })
        }

        data(key,value){
            if(type(key)=='Object') return this.each(function () {
                for(let i in key){
                    this.dataset[i]=key[i];
                }
            })
            if(key && value) return this.each(function () {
                this.dataset[key]=value;
            })
            if(!key) return this.DOM[0].dataset;
            else return this.DOM[0].dataset[key];
        }

        on(event,value,callback){
            if(type(value)=='Function'){
                return this.each(function () {
                    this.addEventListener(event,value);
                })
            }
            if(type(value)=='String') {
                this.DOM[0].addEventListener(event, (e, ...args) => {
                    if (Array.from($(value).DOM).indexOf(e.target)!=-1){
                        callback(...args);
                    }
                });
                return this;
            }

        }

        one(event,callback){
            const that = this;
            function clickOnce(...args) {
                callback(...args);
                that.DOM[0].removeEventListener(event, clickOnce);
            }
            this.DOM[0].addEventListener(event, clickOnce);
            return this;
        }

        each(callback) {
            for (var i = 0; i < this.DOM.length; i++) {
                if (callback.call(this.DOM[i], i,this.DOM[i])===false) return false;
            }
            return this;
        }
    }
    return $;
}());
