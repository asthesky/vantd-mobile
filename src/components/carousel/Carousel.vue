<template>
    <div class="v-carousel-wrap">
        <div class="v-carousel-inner">
            <!-- slides  -->
            <div class="v-carousel-slides">
                <slot></slot>
            </div>
            <!-- -arrows -->
            <template v-if="arrows">
                <transition name="carousel-arrow-prev">
                    <div class="v-carousel-arrow-prev" v-if="arrow">
                        <i></i>
                    </div>
                </transition>
                <transition name="carousel-arrow-next">
                    <div class="v-carousel-arrow-next" v-if="arrows">
                        <i></i>
                    </div>
                </transition>
            </template>
            <!-- indicators -->
            <ul class="v-carousel-dots" v-if="dots">
                <li class="v-carousel-dot" :class="clsDot(index)" v-for="(item, index) in items"></li>
            </ul>
        </div>
    
    </div>
</template>

<script>
export default {
    name: 'Carousel',

    data: function () {
        return {
            // 计算存在的项目
            items: [],
            // 计算项目相对移动的距离
            transList: [],
            // 当前项目序号
            activeIndex: -1,
            // 整体宽度
            containerWidth: 0,
            // 拖动信息
            swipeState: {},
            // 长宽信息
            rectState: {},
        }
    },

    props: {
        // 手动设置当前显示的索引
        selectedIndex: {
            type: Number,
            default: 0,
        },
        // 列表选中样式
        activeCls: {
            type: String,
            default: 'active',
        },
        // 是否显示面板箭头
        arrows: {
            type: Boolean,
            default: false,
        },
        // 箭头样式
        arrowCls: {
            type: String,
            default: '',
        },
        // 箭头激活样式
        arrowActiveCls: {
            type: String,
            default: 'active',
        },
        // 是否显示面板指示点
        dots: {
            type: Boolean,
            default: true,
        },
        // 指示点样式
        dotCls: {
            type: String,
            default: 'active',
        },
        // 指示点激活样式
        dotActiveCls: {
            type: String,
            default: 'active',
        },
        // 垂直显示
        vertical: {
            type: Boolean,
            default: false,
        },
        // 是否自动切换
        autoplay: {
            type: Boolean,
            default: false,
        },
        // 自动切换时间
        autoplayDuration: {
            type: Number,
            default: 3000,
        },
        // 是否循环播放
        infinite: {
            type: Boolean,
            default: false,
        },
        // 切换动画效果
        easing: {
            type: String,
            default: 'linear',
        },
        // 切换动画时间
        duration: {
            type: Number,
            default: 300,
        },
        // 是否可滑动
        swipeable: {
            type: Boolean,
            default: true,
        },
        // 滑动最小距离
        swipeRange: {
            type: Number,
            default: 5,
        },
        // 切换距离阀值
        swipeThreshold: {
            type: Number,
            default: 50,
        },
        // 滑动最小间隔
        swipeDuration: {
            type: Number,
            default: 300,
        }
    },

    watch: {
        activeIndex() {
            console.log(this.activeIndex)
        }
    },

    computed: {
        // infinite:{
        //     get: function(){
        //         if(this._infinite !== undefined){
        //             this._infinite = this.infinite
        //         }
        //         return this._infinite;
        //     },
        //     set: function(value){
        //         this._infinite = value;
        //         return this._infinite;
        //     }
        // }
    },

    methods: {

        // 
        clsDot(index) {
            var self = this;
            // 
            var list = [];
            if (index == self.activeIndex) {
                self.dotCls && list.push(self.dotCls)
            }
            // 
            return list;
        },

        /*======================================*/

        updateItems() {
            var self = this;
            var items = [];
            // 
            self.$children.forEach(function (child, index) {
                if (child.$options.name === 'CarouselItem') {
                    items.push(child);
                }
            });
            self.items = self.$children.filter(function (child) {
                if (child.$options.name === 'CarouselItem') return items.push(child);
            });
            // 一个元素不循环 (todo vue el error  )
            if (self.infinite &&  self.items.length <= 2) {
                self.infinite = false;
            }
        },

        // todo
        shimItems() {
            var self = this;
            var shimItems = [];
            self.items.forEach(function (elem) {
                shimItems.push(elem);
            })
            // 
            if (self.infinite && slides.length < 3) {
                var clsSlides = '.' + self.clsSlides.join('.'),
                    $container = self.$el.querySelector(clsSlides);
                // 
                $container.appendChild(items[0].$el);
                $container.appendChild(items[1].$el);
            }
            self.shimItems = shimItems;
        },

        /*=====================================*/


        startSlide() {
            var self = this,
                rectState = self.rectState,
                items = self.items,
                itemsLen = self.items.length,
                distance = rectState.itemWidth;

            items.forEach(function (value, index) {
                var el = value.$el;
                if (el) {
                    el.setAttribute('data-index', index);
                    if (index === 0) {
                        self.translate(index, 0, false);
                    } else {
                        if (self.infinite && index === (itemsLen - 1)) {
                            self.translate(index, -distance, false);
                        } else {
                            self.translate(index, distance, false);
                        }
                    }
                }
            });
            // 
            self.setActiveSlide(self.selectedIndex);
        },

        // 
        goSlide(index) {
            this.setActiveSlide(index);
        },

        nextSlide() {
            this.setActiveSlide(this.activeIndex + 1);
        },

        prevSlide() {
            this.setActiveSlide(this.activeIndex - 1);
        },

        // 设置当前slide
        setActiveSlide(index) {
            var self = this,
                swipeState = self.swipeState,
                rectState = self.rectState,
                activeIndex = self.activeIndex;
            // 
            var itemWidth = rectState.itemWidth;
            var realIndex = self.getIndex(index);
            var direction = Math.abs(activeIndex - index) / (activeIndex - index) || 0;
            //移除之间的位置
            if (realIndex !== activeIndex) {
                var indexGap = Math.abs(activeIndex - index) - 1, gapIndex;
                while (indexGap--) {
                    gapIndex = (index > activeIndex ? index : activeIndex) - indexGap - 1;
                    self.translate(gapIndex, direction * itemWidth, false);
                }
            }
            // 
            var forwardIndex, currentIndex, backwordIndex;
            var forwardFps = true, currentFps = true, backwordFps = false;
            // 
            if (!self.infinite && realIndex !== index) {
                index = realIndex;
                forwardFps = false;
            }
            // forward
            if (direction === -1) {
                forwardIndex = activeIndex;
                currentIndex = index;
                backwordIndex = index + 1;
                if (self.infinite) {
                    currentIndex = realIndex;
                    backwordIndex = self.getIndex(index + 1);
                }
                // backword
            } else if (direction === 1) {
                forwardIndex = activeIndex;
                currentIndex = index;
                backwordIndex = index - 1;
                if (self.infinite) {
                    currentIndex = realIndex;
                    backwordIndex = self.getIndex(index - 1);
                }
                // insitu
            } else {
                // !根据 swipeState.distance知晓实际方向
                direction = swipeState.distance > 0 ? -1 : 1;
                // 
                currentIndex = index;
                if (direction = -1) {
                    forwardIndex = index - 1;
                    backwordIndex = index + 1;
                } else {
                    forwardIndex = index + 1;
                    backwordIndex = index - 1;
                }
                // 
                if (self.infinite) {
                    forwardIndex = self.getIndex(forwardIndex);
                    backwordIndex = self.getIndex(backwordIndex);
                }
            }
            // 
            self.translate(forwardIndex, direction * itemWidth, forwardFps);
            self.translate(currentIndex, 0, currentFps);
            self.translate(backwordIndex, -direction * itemWidth, backwordFps);

            console.log('ttttt', direction, forwardIndex, currentIndex, backwordIndex);

            self.activeIndex = realIndex;
            self.setActiveCls(realIndex);
            // 
            // offloadFn(options.callback && options.callback(index, slides[index]));
            self.startAutoplay();
        },

        // 设置当前选择样式
        setActiveCls(activeIndex) {
            var self = this;
            self.items.forEach(function (child, index) {
                child.$el.classList.remove(self.activeCls);
                if (index === activeIndex) {
                    child.$el.classList.add(self.activeCls);
                }
            })
        },

        // 计算各个item移动距离
        getIndex(index) {
            var self = this,
                items = self.items;
            // 
            return (items.length + (index % items.length)) % items.length;
        },

        // 实际执行动画
        translate(index, distance, need) {
            var self = this,
                duration = self.duration,
                items = self.items;
            // 
            var slide = items[index];
            var style = slide && slide.$el && slide.$el.style;

            if (!style) return;
            // 
            var transition = 'none';
            if (need && duration) {
                transition = duration + 'ms';
            }
            var transform = `translate3d(${distance}px, 0, 0)`
            if (self.vertical) {
                transform = `translate3d(0, ${distance}px, 0)`
            }
            style.webkitTransform = transform;
            style.webkitTransition = transition;
        },


        /*=====================================*/

        // 设定长宽
        setRectState() {
            var self = this,
                wrapper = self.$el,
                rectState = self.rectState;
            // 
            rectState.mainWidth = wrapper.clientWidth;
            // 默认高度200
            if (!rectState.mainHeight) {
                if (self.mainHeight) {
                    rectState.mainHeight = parseInt(this.mainHeight);
                } else {
                    rectState.mainHeight = 200;
                }
            }
            // 
            if (!self.vertical) {
                rectState.itemWidth = rectState.mainWidth;
            } else {
                rectState.itemWidth = rectState.mainHeight;
            }
        },

        // 设定自动运行
        startAutoplay() {
            var self = this;
            if (!self.autoplay) return;
            // 
            self.autoplayId && self.stopAutoplay();
            // 
            self.autoplayId = setTimeout(function () {
                self.nextSlide();
            }, self.autoplayDuration);
        },

        // 停止自动运行
        stopAutoplay() {
            var self = this;
            self.autoplayId && clearTimeout(self.autoplayId);
        },

        /*==============相关事件=================*/

        // 绑定全局事件
        bindEvents() {
            var self = this,
                items = self.items;
            var wrapper = this.$el;
            // 
            if (!!window) {
                window.addEventListener('orientationchange', self.onResize, false);
                window.addEventListener('resize', self.onResize, false);
            }
            // 
            if (!!wrapper) {
                if (self.swipeable) {
                    wrapper.addEventListener('touchstart', self.onSwipeStart, false)
                    wrapper.addEventListener('touchmove', self.onSwipeMove, false)
                    wrapper.addEventListener('touchend', self.onSwipeEnd, false)
                }
                // 
            }
        },

        // 
        bindTransitionEnd(elem, callback, duration) {
            //transitionEnd的回调
            var called = false;
            var tsEndCallback = function () {
                if (!called) {
                    callback();
                    called = true;
                }
            };
            // 
            elem.addEventListener("webkitTransitionEnd", function () {
                tsEndCallback();
                //hack not trigger events 
                setTimeout(tEndCallback, duration + 10);
            }, false);
        },
        // 
        onResize() {
            // todo  use debouce
            this.setRectState();
            this.startSlide();
        },
        // 
        onSwipeStart(event) {
            var self = this,
                wrapper = self.$el,
                items = self.items,
                activeIndex = self.activeIndex,
                swipeState = self.swipeState;
            var etouches = event.touches[0];
            // 
            swipeState.swipeId = etouches.identifier;
            swipeState.startTime = new Date();
            swipeState.startX = etouches.pageX;
            swipeState.startY = etouches.pageY;
            // 
            self.stopAutoplay();
        },

        onSwipeMove(event) {
            var self = this,
                swipeState = self.swipeState,
                swipeRange = self.swipeRange;
            // ensure swiping with one touch and not pinching
            if (event.touches.length > 1 || event.scale && event.scale !== 1) {
                return false;
            }
            if (self.disableScroll) {
                event.preventDefault();
            }
            var etouches = event.touches[0];
            // 
            swipeState.nowX = etouches.pageX;
            swipeState.nowY = etouches.pageY;
            var distanceX = swipeState.nowX - swipeState.startX;
            var distanceY = swipeState.nowY - swipeState.startY;
            // 
            var distance = distanceX;
            let noScroller = Math.abs(distanceX) > Math.abs(distanceY);
            if (self.vertical) {
                distance = distanceY;
                noScroller = !noScroller;
            }
            if ((swipeRange || (swipeRange && Math.abs(distance) >= swipeRange)) && noScroller) {
                var activeIndex = self.activeIndex;
                var rectState = self.rectState;
                var prevIndex = self.getIndex(activeIndex - 1);
                var nextIndex = self.getIndex(activeIndex + 1);
                if (self.infinite) {
                    self.translate(prevIndex, distance - rectState.itemWidth, 0);
                    self.translate(activeIndex, distance, 0);
                    self.translate(nextIndex, distance + rectState.itemWidth, 0);

                } else {
                    self.translate(activeIndex - 1, distance - rectState.itemWidth, 0);
                    self.translate(activeIndex, distance, 0);
                    self.translate(activeIndex + 1, distance + rectState.itemWidth, 0);
                }
            }
        },

        onSwipeEnd(event) {
            var self = this,
                swipeState = self.swipeState,
                swipeDuration = self.swipeDuration,
                swipeThreshold = self.swipeThreshold;
            // 
            var _swipeDuration = new Date() - swipeState.startTime;
            var distanceX = swipeState.nowX - swipeState.startX;
            var distanceY = swipeState.nowY - swipeState.startY;
            // 
            var distance = distanceX;
            if (self.vertical) {
                distance = distanceY;
            }
            swipeState.distance = distance;
            // 当不循环时
            if (!(self.infinite && self.items.length >= 3)) {
                if (distance > 0 && this.activeIndex === 0) {
                    distance = 0
                } else if (distance < 0 && this.activeIndex === this.items.length - 1) {
                    distance = 0
                }
            }
            // 
            if (distance > swipeThreshold) {
                self.prevSlide();
            } else if (distance < -swipeThreshold) {
                self.nextSlide();
            } else {
                self.goSlide(self.activeIndex);
            }
        },
    },

    // created() { },

    mounted() {
        var self = this;
        self.$nextTick(() => {
            // debugger;
            self.setRectState();
            self.updateItems();
            self.bindEvents();
            self.startSlide();
        });
    },

    beforeDestroy() {
        this.stopAutoplay();
        if (!!window) {
            window.removeEventListener('orientationchange', this.onResize, false)
        }
    }

};
</script>