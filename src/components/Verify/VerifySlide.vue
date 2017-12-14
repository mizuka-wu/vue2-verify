<template>
    <div style="position: relative;"
         @mouseover="showImage = (true && mode === 'pop')"
         @mouseout="showImage = false">
        <!-- puzzle的情况 -->
        <div v-if="type === '2'" class="verify-img-out"
             v-show="showImage"
             @mouseover="showImage = (true && mode === 'pop')"
             @mouseout="showImage = false"
             :style="{display: mode === 'pop'?'none':undefined,
                      position: mode === 'pop'?'absolute':'relative',
                      height: (parseInt(setSize.imgHeight) + vSpace) + 'px',
                      bottom: mode ==='pop'?'42px':undefined}">
            <div class="verify-img-panel" :style="{width: setSize.imgWidth,
                                                   height: setSize.imgHeight,
                                                   background: 'url(' + imgUrl + imgName[imgRand]+')',
                                                   'background-size' : setSize.imgWidth + ' '+ setSize.imgHeight}">
                <div class="verify-refresh" @click="refresh" v-show="showRefresh"><i class="iconfont icon-refresh"></i>
                </div>
                <div class="verify-gap"
                     :style="{'width': blockSize.width, 'height': blockSize.height, top: top, left: left}"></div>
            </div>
        </div>

        <!-- 公共部分 -->
        <div class="verify-bar-area" :style="{width: setSize.barWidth,
                                              height: barSize.height,
                                              'line-height':barSize.height}">
            <span class="verify-msg" v-text="text"></span>
            <div class="verify-left-bar"
                 :style="{width: (leftBarWidth!==undefined)?leftBarWidth: barSize.height, height: barSize.height, 'border-color': leftBarBorderColor}">
                <span class="verify-msg"></span>
                <div class="verify-move-block"
                     @touchstart="start"
                     @mousedown="start"
                     :style="{width: barSize.height, height: barSize.height, 'background-color': moveBlockBackgroundColor, left: moveBlockLeft}">
                    <i :class="['verify-icon iconfont', iconClass]"
                       :style="{color: iconColor}"></i>
                    <div v-if="type === '2'"
                         class="verify-sub-block"
                         :style="{'width': blockSize.width,
                                  'height': blockSize.height,
                                  'top': '-' + (parseInt(setSize.imgHeight) - top + vSpace) + 'px',
                                  'background-image': 'url(' + imgUrl + imgName[this.imgRand] + ')',
                                  'background-size': setSize.imgWidth + ' ' + setSize.imgHeight,
                                  'background-position-y': '-' + top + 'px',
                                  'background-position-x': '-' + left + 'px'}"
                         v-show="mode !== 'pop' && showImage"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    /**
     * VerifySlide
     * @description 滑块
     * */
    export default {
        name: 'VerifySlide',
        props: {
            type: {
                type: String,
                default: '1'
            },
            //弹出式pop，固定fixed
            mode: {
                type: String,
                default: 'fixed'
            },
            vOffset: {
                type: Number,
                default: 5
            },
            vSpace: {
                type: Number,
                default: 5
            },
            explain: {
                type: String,
                default: '向右滑动完成验证'
            },
            imgUrl: {
                type: String,
                default: 'images/'
            },
            imgName: {
                type: Array,
                default() {
                    return ['1.jpg', '2.jpg']
                }
            },
            imgSize: {
                type: Object,
                default() {
                    return {
                        width: '400px',
                        height: '200px'
                    }
                }
            },
            blockSize: {
                type: Object,
                default() {
                    return {
                        width: '50px',
                        height: '50px'
                    }
                }
            },
            barSize: {
                type: Object,
                default() {
                    return {
                        width: '400px',
                        height: '40px'
                    }
                }
            }
        },
        data() {
            return {
                imgRand: 0,
                text: '',
                setSize: {
                    imgHeight: 0,
                    imgWidth: 0,
                    barHeight: 0,
                    barWidth: 0
                },
                top: 0,
                left: 0,
                showImg: false,
                moveBlockLeft: undefined,
                leftBarWidth: undefined,
                // 移动中样式
                moveBlockBackgroundColor: undefined,
                leftBarBorderColor: '#ddd',
                iconColor: undefined,
                iconClass: 'icon-right',
                status: false,	//鼠标状态
                isEnd: false,		//是够验证完成
                showRefresh: true
            }
        },
        computed: {
            barArea() {
                return this.$el.querySelector('.verify-bar-area')
            }
        },
        methods: {
            init() {
                this.text = this.explain
                this.imgRand = Math.floor(Math.random() * this.imgName.length);			//随机的背景图片

                this.$nextTick(() => {
                    let setSize = this.resetSize(this)	//重新设置宽度高度
                    // 监听的问题
                    for (let key in setSize) {
                        this.$set(this.setSize, key, setSize[key])
                    }

                    this.randSet()

                    this.$parent.$emit('ready', this)
                })

                var _this = this

                window.removeEventListener("touchmove", function(e) {
                    _this.move(e);
                });
                window.removeEventListener("mousemove", function(e) {
                    _this.move(e);
                });

                //鼠标松开
                window.removeEventListener("touchend", function() {
                    _this.end();
                });
                window.removeEventListener("mouseup", function() {
                    _this.end();
                });

                window.addEventListener("touchmove", function(e) {
                    _this.move(e);
                });
                window.addEventListener("mousemove", function(e) {
                    _this.move(e);
                });

                //鼠标松开
                window.addEventListener("touchend", function() {
                    _this.end();
                });
                window.addEventListener("mouseup", function() {
                    _this.end();
                });

            },

            //鼠标按下
            start: function (e) {
                if (this.isEnd == false) {
                    this.text = ''
                    this.moveBlockBackgroundColor = '#337ab7'
                    this.leftBarBorderColor = '#337AB7'
                    this.iconColor = '#fff'
                    e.stopPropagation();
                    this.status = true;
                }
            },
            //鼠标移动
            move: function (e) {
                if (this.status && this.isEnd == false) {
                    if (this.mode == 'pop') {
                        this.showImage = true
                    }

                    if (!e.touches) {    //兼容移动端
                        var x = e.clientX;
                    } else {     //兼容PC端
                        var x = e.touches[0].pageX;
                    }
                    var bar_area_left = this.getLeft(this.barArea);
                    var move_block_left = x - bar_area_left //小方块相对于父元素的left值

                    if (this.type !== '1') {		//图片滑动
                        if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2) {
                            move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.blockSize.width) / 2) - 2;
                        }

                    } else {		//普通滑动
                        if (move_block_left >= this.barArea.offsetWidth - parseInt(parseInt(this.barSize.height) / 2) + 3) {
                            this.text = '松开验证'
                            move_block_left = this.barArea.offsetWidth - parseInt(parseInt(this.barSize.height) / 2) + 3;
                        } else {
                            this.text = ''
                        }
                    }

                    if (move_block_left <= 0) {
                        move_block_left = parseInt(parseInt(this.blockSize.width) / 2);
                    }

                    //拖动后小方块的left值
                    this.moveBlockLeft = (move_block_left - parseInt(parseInt(this.blockSize.width) / 2) ) + "px"
                    this.leftBarWidth = (move_block_left - parseInt(parseInt(this.blockSize.width) / 2)) + "px"
                }
            },

            //鼠标松开
            end: function () {
                var _this = this;

//                判断是否重合
                if (this.status && this.isEnd == false) {

                    if (this.type !== '1') {		//图片滑动

                        var vOffset = parseInt(this.vOffset)
//                        if (parseInt(this.htmlDoms.gap.css('left')) >= (parseInt(this.htmlDoms.move_block.css('left')) - vOffset) && parseInt(this.htmlDoms.gap.css('left')) <= (parseInt(this.htmlDoms.move_block.css('left')) + vOffset)) {
//                            this.htmlDoms.move_block.css('background-color', '#5cb85c');
//                            this.htmlDoms.left_bar.css({'border-color': '#5cb85c', 'background-color': '#fff'});
//                            this.htmlDoms.icon.css('color', '#fff');
//                            this.htmlDoms.icon.removeClass('icon-right');
//                            this.htmlDoms.icon.addClass('icon-check');
//                            this.htmlDoms.refresh.hide();
//                            this.isEnd = true;
//                            this.options.success(this);
//                        } else {
//                            this.htmlDoms.move_block.css('background-color', '#d9534f');
//                            this.htmlDoms.left_bar.css('border-color', '#d9534f');
//                            this.htmlDoms.icon.css('color', '#fff');
//                            this.htmlDoms.icon.removeClass('icon-right');
//                            this.htmlDoms.icon.addClass('icon-close');
//
//
//                            setTimeout(function () {
//                                _this.refresh();
//                            }, 400);
//
//                            this.options.error(this);
//                        }

                    } else {		//普通滑动

                        if (parseInt((this.moveBlockLeft || '').replace('px', '')) >= (parseInt(this.setSize.barWidth) - parseInt(this.barSize.height) - parseInt(this.vOffset))) {
                            this.moveBlockBackgroundColor = '#5cb85c'
//                            this.htmlDoms.left_bar.css({
//                                'color': '#4cae4c',
//                                'border-color': '#5cb85c',
//                                'background-color': '#fff'
//                            });
                            this.leftBarBorderColor = '#5cb85c'
                            this.iconColor = '#fff'
                            this.iconClass = 'icon-check'
                            this.showRefresh = false
                            this.text = '验证成功'
                            this.isEnd = true;
                            this.$parent.$emit('success', this)
                        } else {
                            this.text = ''
                            this.moveBlockBackgroundColor = '#d9534f'
                            this.leftBarBorderColor = '#d9534f'
                            this.iconColor = '#fff'
                            this.iconClass = 'icon-close'
                            this.isEnd = true;

                            setTimeout(function () {
                                _this.text = ''
                                _this.refresh()
                                _this.isEnd = false
                            }, 400);

                            this.$parent.$emit('error', this)
                        }
                    }

                    this.status = false;
                }
            },

            resetSize: function () {
                var img_width, img_height, bar_width, bar_height;	//图片的宽度、高度，移动条的宽度、高度

                var parentWidth = this.$el.parentNode.offsetWidth || window.offsetWidth
                var parentHeight = this.$el.parentNode.offsetHeight || window.offsetHeight

                if (this.imgSize.width.indexOf('%') != -1) {
                    img_width = parseInt(this.imgSize.width) / 100 * parentWidth + 'px';
                } else {
                    img_width = this.imgSize.width;
                }

                if (this.imgSize.height.indexOf('%') != -1) {
                    img_height = parseInt(this.imgSize.height) / 100 * parentHeight + 'px';
                } else {
                    img_height = this.imgSize.height;
                }

                if (this.barSize.width.indexOf('%') != -1) {
                    bar_width = parseInt(this.barSize.width) / 100 * parentWidth + 'px';
                } else {
                    bar_width = this.barSize.width;
                }

                if (this.barSize.height.indexOf('%') != -1) {
                    bar_height = parseInt(this.barSize.height) / 100 * parentHeight + 'px';
                } else {
                    bar_height = this.barSize.height;
                }

                return {imgWidth: img_width, imgHeight: img_height, barWidth: bar_width, barHeight: bar_height};
            },

            //随机出生点位
            randSet: function () {
                var rand1 = Math.floor(Math.random() * 9 + 1);
                var rand2 = Math.floor(Math.random() * 9 + 1);
                var top = rand1 * parseInt(this.setSize.imgHeight) / 15 + parseInt(this.setSize.imgHeight) * 0.1;
                var left = rand2 * parseInt(this.setSize.imgWidth) / 15 + parseInt(this.setSize.imgWidth) * 0.1;

                this.top = top
                this.left = left
            },

            refresh: function () {
                this.showRefresh = true
                this.text = ''
//                this.$element.find('.verify-msg:eq(1)').css('color', '#000');

//                this.htmlDoms.move_block.animate({'left':'0px'}, 'fast');
                this.moveBlockLeft = 0

//                this.htmlDoms.left_bar.animate({'width': '40px'}, 'fast');
                this.leftBarWidth = undefined

                this.leftBarBorderColor = '#ddd'
                this.moveBlockBackgroundColor = '#fff'
                this.iconColor = '#000'
                this.iconClass = 'icon-right'
                this.text = this.explain

                this.randSet()
                this.imgRand = Math.floor(Math.random() * this.imgName.length);			//随机的背景图片

                // @todo 检查重启
//                this.$element.find('.verify-img-panel').css({'background': 'url('+ this.options.imgUrl +this.options.imgName[this.img_rand]+')', 'background-size': this.setSize.img_width + ' '+ this.setSize.img_height});
//                this.$element.find('.verify-sub-block').css({'background-image': 'url('+ this.options.imgUrl +this.options.imgName[this.img_rand]+')', 'background-size': this.setSize.img_width + ' '+ this.setSize.img_height});
//
                this.isEnd = false
            },

            //获取left值
            getLeft: function (node) {
                let leftValue = 0;
                while (node) {
                    leftValue += node.offsetLeft;
                    node = node.offsetParent;
                }
                let finalvalue = leftValue;
                return finalvalue;
            }
        },
        watch: {
            // type变化则全面刷新
            type: {
                immediate: true,
                handler() {
                    this.init()
                }
            }
        },
        mounted() {
            // 禁止拖拽
            this.$el.onselectstart = function () {
                return false
            }
        },
        i18n: {
            messages: {
                'en-US': {},
                'zh-CN': {}
            }
        }
    }
</script>