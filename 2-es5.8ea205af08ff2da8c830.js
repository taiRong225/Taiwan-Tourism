function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,i){if(e){if("string"==typeof e)return _arrayLikeToArray(e,i);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,i):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,i){(null==i||i>e.length)&&(i=e.length);for(var t=0,s=new Array(i);t<i;t++)s[t]=e[t];return s}function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,i){for(var t=0;t<i.length;t++){var s=i[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,i,t){return i&&_defineProperties(e.prototype,i),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"1i8C":function(e,i,t){"use strict";t.d(i,"a",(function(){return l}));var s=t("AytR"),n=t("fXoL"),r=t("tk/3"),l=function(){var e=function(){function e(i){_classCallCheck(this,e),this.http=i,this.baseURL=s.a.baseURLv3+"/Map"}return _createClass(e,[{key:"getCities",value:function(){return this.http.get(this.baseURL+"/Basic/City")}}]),e}();return e.\u0275fac=function(i){return new(i||e)(n.Qb(r.b))},e.\u0275prov=n.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},LYaK:function(e,i,t){"use strict";t.d(i,"a",(function(){return S})),t.d(i,"b",(function(){return _})),t.d(i,"c",(function(){return x}));var s,n=t("fXoL"),r="undefined"!=typeof window&&window||{},l=function(){function e(){_classCallCheck(this,e),this.length=0,this.asArray=[]}return _createClass(e,[{key:"get",value:function(e){if(!(0===this.length||e<0||e>=this.length)){for(var i=this.head,t=0;t<e;t++)i=i.next;return i.value}}},{key:"add",value:function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.length;if(i<0||i>this.length)throw new Error("Position is out of the list");var t={value:e,next:void 0,previous:void 0};if(0===this.length)this.head=t,this.tail=t,this.current=t;else if(0===i)t.next=this.head,this.head.previous=t,this.head=t;else if(i===this.length)this.tail.next=t,t.previous=this.tail,this.tail=t;else{var s=this.getNode(i-1),n=s.next;s.next=t,n.previous=t,t.previous=s,t.next=n}this.length++,this.createInternalArrayRepresentation()}},{key:"remove",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(0===this.length||e<0||e>=this.length)throw new Error("Position is out of the list");if(0===e)this.head=this.head.next,this.head?this.head.previous=void 0:this.tail=void 0;else if(e===this.length-1)this.tail=this.tail.previous,this.tail.next=void 0;else{var i=this.getNode(e);i.next.previous=i.previous,i.previous.next=i.next}this.length--,this.createInternalArrayRepresentation()}},{key:"set",value:function(e,i){if(0===this.length||e<0||e>=this.length)throw new Error("Position is out of the list");this.getNode(e).value=i,this.createInternalArrayRepresentation()}},{key:"toArray",value:function(){return this.asArray}},{key:"findAll",value:function(e){for(var i=this.head,t=[],s=0;s<this.length;s++)e(i.value,s)&&t.push({index:s,value:i.value}),i=i.next;return t}},{key:"push",value:function(){for(var e=this,i=arguments.length,t=new Array(i),s=0;s<i;s++)t[s]=arguments[s];return t.forEach((function(i){e.add(i)})),this.length}},{key:"pop",value:function(){if(0!==this.length){var e=this.tail;return this.remove(this.length-1),e.value}}},{key:"unshift",value:function(){for(var e=this,i=arguments.length,t=new Array(i),s=0;s<i;s++)t[s]=arguments[s];return t.reverse(),t.forEach((function(i){e.add(i,0)})),this.length}},{key:"shift",value:function(){if(0!==this.length){var e=this.head.value;return this.remove(),e}}},{key:"forEach",value:function(e){for(var i=this.head,t=0;t<this.length;t++)e(i.value,t),i=i.next}},{key:"indexOf",value:function(e){for(var i=this.head,t=0,s=0;s<this.length;s++){if(i.value===e){t=s;break}i=i.next}return t}},{key:"some",value:function(e){for(var i=this.head,t=!1;i&&!t;){if(e(i.value)){t=!0;break}i=i.next}return t}},{key:"every",value:function(e){for(var i=this.head,t=!0;i&&t;)e(i.value)||(t=!1),i=i.next;return t}},{key:"toString",value:function(){return"[Linked List]"}},{key:"find",value:function(e){for(var i,t=this.head,s=0;s<this.length;s++){if(e(t.value,s)){i=t.value;break}t=t.next}return i}},{key:"findIndex",value:function(e){for(var i,t=this.head,s=0;s<this.length;s++){if(e(t.value,s)){i=s;break}t=t.next}return i}},{key:"getNode",value:function(e){if(0===this.length||e<0||e>=this.length)throw new Error("Position is out of the list");for(var i=this.head,t=0;t<e;t++)i=i.next;return i}},{key:"createInternalArrayRepresentation",value:function(){for(var e=[],i=this.head;i;)e.push(i.value),i=i.next;this.asArray=e}}]),e}();"undefined"==typeof console||console;var a=t("ofXK");function o(e,i){if(1&e){var t=n.Nb();n.Mb(0,"li",7),n.Ub("click",(function(){n.fc(t);var e=i.index;return n.Wb(2).selectSlide(e)})),n.Lb()}2&e&&n.Bb("active",!0===i.$implicit.active)}function h(e,i){if(1&e&&(n.Mb(0,"ol",5),n.kc(1,o,1,2,"li",6),n.Lb()),2&e){var t=n.Wb();n.zb(1),n.bc("ngForOf",t.indicatorsSlides())}}function u(e,i){1&e&&(n.Mb(0,"span",11),n.lc(1,"Previous"),n.Lb())}function d(e,i){if(1&e){var t=n.Nb();n.Mb(0,"a",8),n.Ub("click",(function(){return n.fc(t),n.Wb().previousSlide()})),n.Kb(1,"span",9),n.kc(2,u,2,0,"span",10),n.Lb()}if(2&e){var s=n.Wb();n.Bb("disabled",0===s.activeSlide&&s.noWrap),n.zb(2),n.bc("ngIf",s.isBs4)}}function c(e,i){if(1&e){var t=n.Nb();n.Mb(0,"a",12),n.Ub("click",(function(){return n.fc(t),n.Wb().nextSlide()})),n.Kb(1,"span",13),n.Mb(2,"span",11),n.lc(3,"Next"),n.Lb(),n.Lb()}if(2&e){var s=n.Wb();n.Bb("disabled",s.isLast(s.activeSlide)&&s.noWrap)}}var f,v,g,y,b=function(e){return{display:e}},m=["*"],p=((f=function e(){_classCallCheck(this,e),this.interval=5e3,this.noPause=!1,this.noWrap=!1,this.showIndicators=!0,this.pauseOnFocus=!1,this.indicatorsByChunk=!1,this.itemsPerSlide=1,this.singleSlideOffset=!1}).\u0275fac=function(e){return new(e||f)},f.\u0275prov=Object(n.Fb)({factory:function(){return new f},token:f,providedIn:"root"}),f),k=function(){var e={UNKNOWN:0,NEXT:1,PREV:2};return e[e.UNKNOWN]="UNKNOWN",e[e.NEXT]="NEXT",e[e.PREV]="PREV",e}(),S=((y=function(){function e(i,t){_classCallCheck(this,e),this.ngZone=t,this.indicatorsByChunk=!1,this.itemsPerSlide=1,this.singleSlideOffset=!1,this.isAnimated=!1,this.activeSlideChange=new n.n(!1),this.slideRangeChange=new n.n,this.startFromIndex=0,this._slides=new l,this._currentVisibleSlidesIndex=0,this.destroyed=!1,this.getActive=function(e){return e.active},this.makeSlidesConsistent=function(e){e.forEach((function(e,i){return e.item.order=i}))},Object.assign(this,i)}return _createClass(e,[{key:"activeSlide",get:function(){return this._currentActiveSlide},set:function(e){this.multilist||this._slides.length&&e!==this._currentActiveSlide&&this._select(e)}},{key:"interval",get:function(){return this._interval},set:function(e){this._interval=e,this.restartTimer()}},{key:"slides",get:function(){return this._slides.toArray()}},{key:"isBs4",get:function(){return!(void 0===r||(void 0===r.__theme?(s||(s=function(){if("undefined"==typeof document)return null;var e=document.createElement("span");e.innerText="test bs version",document.body.appendChild(e),e.classList.add("d-none");var i=e.getBoundingClientRect();return document.body.removeChild(e),i&&0===i.top?"bs4":"bs3"}()),"bs3"===s):"bs4"!==r.__theme))}},{key:"ngAfterViewInit",value:function(){var e=this;setTimeout((function(){e.singleSlideOffset&&(e.indicatorsByChunk=!1),e.multilist&&(e._chunkedSlides=function(e,i){for(var t=[],s=Math.ceil(e.length/i),n=0;n<s;){var r=e.splice(0,n===s-1&&i<e.length?e.length:i);t.push(r),n++}return t}(e.mapSlidesAndIndexes(),e.itemsPerSlide),e.selectInitialSlides())}),0)}},{key:"ngOnDestroy",value:function(){this.destroyed=!0}},{key:"addSlide",value:function(e){this._slides.add(e),this.multilist&&this._slides.length<=this.itemsPerSlide&&(e.active=!0),!this.multilist&&this.isAnimated&&(e.isAnimated=!0),this.multilist||1!==this._slides.length||(this._currentActiveSlide=void 0,this.activeSlide=0,this.play()),this.multilist&&this._slides.length>this.itemsPerSlide&&this.play()}},{key:"removeSlide",value:function(e){var i=this,t=this._slides.indexOf(e);if(this._currentActiveSlide===t){var s=void 0;this._slides.length>1&&(s=this.isLast(t)?this.noWrap?t-1:0:t),this._slides.remove(t),setTimeout((function(){i._select(s)}),0)}else{this._slides.remove(t);var n=this.getCurrentSlideIndex();setTimeout((function(){i._currentActiveSlide=n,i.activeSlideChange.emit(i._currentActiveSlide)}),0)}}},{key:"nextSlideFromInterval",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.move(k.NEXT,e)}},{key:"nextSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isPlaying&&this.restartTimer(),this.move(k.NEXT,e)}},{key:"previousSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.isPlaying&&this.restartTimer(),this.move(k.PREV,e)}},{key:"getFirstVisibleIndex",value:function(){return this.slides.findIndex(this.getActive)}},{key:"getLastVisibleIndex",value:function(){return function(e,i){for(var t=e.length;t--;)if(i(e[t],t,e))return t;return-1}(this.slides,this.getActive)}},{key:"move",value:function(e){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=this.getFirstVisibleIndex(),s=this.getLastVisibleIndex();this.noWrap&&(e===k.NEXT&&this.isLast(s)||e===k.PREV&&0===t)||(this.multilist?this.moveMultilist(e):this.activeSlide=this.findNextSlideIndex(e,i))}},{key:"keydownPress",value:function(e){if(13===e.keyCode||"Enter"===e.key||32===e.keyCode||"Space"===e.key)return this.nextSlide(),void e.preventDefault();37!==e.keyCode&&"LeftArrow"!==e.key?39!==e.keyCode&&"RightArrow"!==e.key||this.nextSlide():this.previousSlide()}},{key:"onMouseLeave",value:function(){this.pauseOnFocus||this.play()}},{key:"onMouseUp",value:function(){this.pauseOnFocus||this.play()}},{key:"pauseFocusIn",value:function(){this.pauseOnFocus&&(this.isPlaying=!1,this.resetTimer())}},{key:"pauseFocusOut",value:function(){this.play()}},{key:"selectSlide",value:function(e){this.isPlaying&&this.restartTimer(),this.multilist?this.selectSlideRange(this.indicatorsByChunk?e*this.itemsPerSlide:e):this.activeSlide=this.indicatorsByChunk?e*this.itemsPerSlide:e}},{key:"play",value:function(){this.isPlaying||(this.isPlaying=!0,this.restartTimer())}},{key:"pause",value:function(){this.noPause||(this.isPlaying=!1,this.resetTimer())}},{key:"getCurrentSlideIndex",value:function(){return this._slides.findIndex(this.getActive)}},{key:"isLast",value:function(e){return e+1>=this._slides.length}},{key:"isFirst",value:function(e){return 0===e}},{key:"indicatorsSlides",value:function(){var e=this;return this.slides.filter((function(i,t){return!e.indicatorsByChunk||t%e.itemsPerSlide==0}))}},{key:"selectInitialSlides",value:function(){var e=this.startFromIndex<=this._slides.length?this.startFromIndex:0;if(this.hideSlides(),this.singleSlideOffset){if(this._slidesWithIndexes=this.mapSlidesAndIndexes(),this._slides.length-e<this.itemsPerSlide){var i=this._slidesWithIndexes.slice(0,e);this._slidesWithIndexes=[].concat(_toConsumableArray(this._slidesWithIndexes),_toConsumableArray(i)).slice(i.length).slice(0,this.itemsPerSlide)}else this._slidesWithIndexes=this._slidesWithIndexes.slice(e,e+this.itemsPerSlide);this._slidesWithIndexes.forEach((function(e){return e.item.active=!0})),this.makeSlidesConsistent(this._slidesWithIndexes)}else this.selectRangeByNestedIndex(e);this.slideRangeChange.emit(this.getVisibleIndexes())}},{key:"findNextSlideIndex",value:function(e,i){var t=0;if(i||!this.isLast(this.activeSlide)||e===k.PREV||!this.noWrap){switch(e){case k.NEXT:t=this.isLast(this._currentActiveSlide)?!i&&this.noWrap?this._currentActiveSlide:0:this._currentActiveSlide+1;break;case k.PREV:t=this._currentActiveSlide>0?this._currentActiveSlide-1:!i&&this.noWrap?this._currentActiveSlide:this._slides.length-1;break;default:throw new Error("Unknown direction")}return t}}},{key:"mapSlidesAndIndexes",value:function(){return this.slides.slice().map((function(e,i){return{index:i,item:e}}))}},{key:"selectSlideRange",value:function(e){if(!this.isIndexInRange(e)){if(this.hideSlides(),this.singleSlideOffset){var i=this.isIndexOnTheEdges(e)?e:e-this.itemsPerSlide+1,t=this.isIndexOnTheEdges(e)?e+this.itemsPerSlide:e+1;this._slidesWithIndexes=this.mapSlidesAndIndexes().slice(i,t),this.makeSlidesConsistent(this._slidesWithIndexes),this._slidesWithIndexes.forEach((function(e){return e.item.active=!0}))}else this.selectRangeByNestedIndex(e);this.slideRangeChange.emit(this.getVisibleIndexes())}}},{key:"selectRangeByNestedIndex",value:function(e){var i=this._chunkedSlides.map((function(e,i){return{index:i,list:e}})).find((function(i){return void 0!==i.list.find((function(i){return i.index===e}))}));this._currentVisibleSlidesIndex=i.index,this._chunkedSlides[i.index].forEach((function(e){e.item.active=!0}))}},{key:"isIndexOnTheEdges",value:function(e){return e+1-this.itemsPerSlide<=0||e+this.itemsPerSlide<=this._slides.length}},{key:"isIndexInRange",value:function(e){return this.singleSlideOffset?this._slidesWithIndexes.map((function(e){return e.index})).indexOf(e)>=0:e<=this.getLastVisibleIndex()&&e>=this.getFirstVisibleIndex()}},{key:"hideSlides",value:function(){this.slides.forEach((function(e){return e.active=!1}))}},{key:"isVisibleSlideListLast",value:function(){return this._currentVisibleSlidesIndex===this._chunkedSlides.length-1}},{key:"isVisibleSlideListFirst",value:function(){return 0===this._currentVisibleSlidesIndex}},{key:"moveSliderByOneItem",value:function(e){var i,t,s,n;if(this.noWrap){i=this.getFirstVisibleIndex(),t=this.getLastVisibleIndex(),s=e===k.NEXT?i:t,n=e!==k.NEXT?i-1:this.isLast(t)?0:t+1,this._slides.get(s).active=!1,this._slides.get(n).active=!0;var r=this.mapSlidesAndIndexes().filter((function(e){return e.item.active}));this.makeSlidesConsistent(r),this.slideRangeChange.emit(this.getVisibleIndexes())}else{var l;i=this._slidesWithIndexes[0].index,t=this._slidesWithIndexes[this._slidesWithIndexes.length-1].index,e===k.NEXT?(this._slidesWithIndexes.shift(),l=this.isLast(t)?0:t+1,this._slidesWithIndexes.push({index:l,item:this._slides.get(l)})):(this._slidesWithIndexes.pop(),l=this.isFirst(i)?this._slides.length-1:i-1,this._slidesWithIndexes=[{index:l,item:this._slides.get(l)}].concat(_toConsumableArray(this._slidesWithIndexes))),this.hideSlides(),this._slidesWithIndexes.forEach((function(e){return e.item.active=!0})),this.makeSlidesConsistent(this._slidesWithIndexes),this.slideRangeChange.emit(this._slidesWithIndexes.map((function(e){return e.index})))}}},{key:"moveMultilist",value:function(e){this.singleSlideOffset?this.moveSliderByOneItem(e):(this.hideSlides(),this._currentVisibleSlidesIndex=this.noWrap?e===k.NEXT?this._currentVisibleSlidesIndex+1:this._currentVisibleSlidesIndex-1:e===k.NEXT?this.isVisibleSlideListLast()?0:this._currentVisibleSlidesIndex+1:this.isVisibleSlideListFirst()?this._chunkedSlides.length-1:this._currentVisibleSlidesIndex-1,this._chunkedSlides[this._currentVisibleSlidesIndex].forEach((function(e){return e.item.active=!0})),this.slideRangeChange.emit(this.getVisibleIndexes()))}},{key:"getVisibleIndexes",value:function(){return this.singleSlideOffset?this._slidesWithIndexes.map((function(e){return e.index})):this._chunkedSlides[this._currentVisibleSlidesIndex].map((function(e){return e.index}))}},{key:"_select",value:function(e){if(isNaN(e))this.pause();else{if(!this.multilist){var i=this._slides.get(this._currentActiveSlide);i&&(i.active=!1)}var t=this._slides.get(e);t&&(this._currentActiveSlide=e,t.active=!0,this.activeSlide=e,this.activeSlideChange.emit(e))}}},{key:"restartTimer",value:function(){var e=this;this.resetTimer();var i=+this.interval;!isNaN(i)&&i>0&&(this.currentInterval=this.ngZone.runOutsideAngular((function(){return setInterval((function(){var i=+e.interval;e.ngZone.run((function(){e.isPlaying&&!isNaN(e.interval)&&i>0&&e.slides.length?e.nextSlideFromInterval():e.pause()}))}),i)})))}},{key:"multilist",get:function(){return this.itemsPerSlide>1}},{key:"resetTimer",value:function(){this.currentInterval&&(clearInterval(this.currentInterval),this.currentInterval=void 0)}}]),e}()).\u0275fac=function(e){return new(e||y)(n.Jb(p),n.Jb(n.z))},y.\u0275cmp=n.Db({type:y,selectors:[["carousel"]],inputs:{indicatorsByChunk:"indicatorsByChunk",itemsPerSlide:"itemsPerSlide",singleSlideOffset:"singleSlideOffset",isAnimated:"isAnimated",startFromIndex:"startFromIndex",activeSlide:"activeSlide",interval:"interval",noWrap:"noWrap",noPause:"noPause",showIndicators:"showIndicators",pauseOnFocus:"pauseOnFocus"},outputs:{activeSlideChange:"activeSlideChange",slideRangeChange:"slideRangeChange"},ngContentSelectors:m,decls:6,vars:6,consts:[["tabindex","0",1,"carousel","slide",3,"mouseenter","mouseleave","mouseup","keydown","focusin","focusout"],["class","carousel-indicators",4,"ngIf"],[1,"carousel-inner",3,"ngStyle"],["class","left carousel-control carousel-control-prev","tabindex","0","role","button",3,"disabled","click",4,"ngIf"],["class","right carousel-control carousel-control-next","tabindex","0","role","button",3,"disabled","click",4,"ngIf"],[1,"carousel-indicators"],[3,"active","click",4,"ngFor","ngForOf"],[3,"click"],["tabindex","0","role","button",1,"left","carousel-control","carousel-control-prev",3,"click"],["aria-hidden","true",1,"icon-prev","carousel-control-prev-icon"],["class","sr-only",4,"ngIf"],[1,"sr-only"],["tabindex","0","role","button",1,"right","carousel-control","carousel-control-next",3,"click"],["aria-hidden","true",1,"icon-next","carousel-control-next-icon"]],template:function(e,i){1&e&&(n.ac(),n.Mb(0,"div",0),n.Ub("mouseenter",(function(){return i.pause()}))("mouseleave",(function(){return i.onMouseLeave()}))("mouseup",(function(){return i.onMouseUp()}))("keydown",(function(e){return i.keydownPress(e)}))("focusin",(function(){return i.pauseFocusIn()}))("focusout",(function(){return i.pauseFocusOut()})),n.kc(1,h,2,1,"ol",1),n.Mb(2,"div",2),n.Zb(3),n.Lb(),n.kc(4,d,3,3,"a",3),n.kc(5,c,4,2,"a",4),n.Lb()),2&e&&(n.zb(1),n.bc("ngIf",i.showIndicators&&i.slides.length>1),n.zb(1),n.bc("ngStyle",n.dc(4,b,i.multilist?"flex":"block")),n.zb(2),n.bc("ngIf",i.slides.length>1),n.zb(1),n.bc("ngIf",i.slides.length>1))},directives:[a.j,a.k,a.i],encapsulation:2}),y),x=((g=function(){function e(i){_classCallCheck(this,e),this.itemWidth="100%",this.order=0,this.addClass=!0,this.carousel=i}return _createClass(e,[{key:"ngOnInit",value:function(){this.carousel.addSlide(this),this.itemWidth=100/this.carousel.itemsPerSlide+"%"}},{key:"ngOnDestroy",value:function(){this.carousel.removeSlide(this)}}]),e}()).\u0275fac=function(e){return new(e||g)(n.Jb(S))},g.\u0275cmp=n.Db({type:g,selectors:[["slide"]],hostVars:13,hostBindings:function(e,i){2&e&&(n.Ab("aria-hidden",!i.active),n.jc("width",i.itemWidth)("order",i.order),n.Bb("item",i.addClass)("carousel-item",i.addClass)("active",i.active)("carousel-animation",i.isAnimated))},inputs:{active:"active"},ngContentSelectors:m,decls:2,vars:2,consts:[[1,"item"]],template:function(e,i){1&e&&(n.ac(),n.Mb(0,"div",0),n.Zb(1),n.Lb()),2&e&&n.Bb("active",i.active)},styles:[".carousel-animation[_nghost-%COMP%] {\n       transition: opacity 0.6s ease, visibility 0.6s ease;\n       float: left;\n    }\n    .carousel-animation.active[_nghost-%COMP%] {\n      opacity: 1;\n      visibility: visible;\n    }\n    .carousel-animation[_nghost-%COMP%]:not(.active) {\n      display: block;\n      position: absolute;\n      opacity: 0;\n      visibility: hidden;\n    }"]}),g),_=((v=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"forRoot",value:function(){return{ngModule:e,providers:[]}}}]),e}()).\u0275mod=n.Hb({type:v}),v.\u0275inj=n.Gb({factory:function(e){return new(e||v)},imports:[[a.b]]}),v)}}]);