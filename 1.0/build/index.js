/*
combined files : 

gallery/kprogress/1.0/index

*/
/**
 * @fileoverview a light progress bar
 * @author 幽零<xinbin.xb@alibaba-inc.com>
 * @module kprogress
 **/
KISSY.add('gallery/kprogress/1.0/index',function (S, Node) {
    "use strict"
    var $ = Node.all


    // style layer
    var bar = (function () {
        var $bar = $('<div id="kprogress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1"></div>')

        // CSS3 transform detection
        var style = document.documentElement.style
        var prefix = 'transform' in style ? ''
            : 'WebkitTransform' in style ? '-webkit-'
            : 'MozTransform' in style ? '-moz-'
            : 'msTransform' in style ? '-ms-'
            : 'OTransform' in style ? '-o-'
            : false

        if ( typeof prefix === 'string' ) { // use transform
            $bar.css(prefix +'transform-style', 'preserve-3d') // init css

            var transitionendTypes = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd '
                                    .split(' ').join('.kprogress-transitionend ') // add namespace
            return {
                start: function () {
                    this.set(0)
                    $bar.detach('.kprogress-transitionend') // transitionend safeguard
                        .css('opacity', 1)
                        .css(prefix +'transition', prefix +'transform 1s ease, opacity 200ms linear') // smooth transition
                        .appendTo('body')
                    $bar[0].offsetWidth // force repaint to take transition effect
                },
                set: function (percent) {
                    $bar.attr('aria-valuenow', percent)
                        .css(prefix +'transform', 'translateX(' +( percent*100 - 100 ) +'%)')
                },
                done: function () {
                    $bar.css(prefix +'transition-duration', '300ms, 200ms') // quick transition to finish
                    this.set(1)

                    $bar.on(transitionendTypes, function fn() { // wait translate finish
                        $bar.detach('.kprogress-transitionend').on(transitionendTypes, function fn() { // wait fade finish
                            $bar.detach('.kprogress-transitionend').remove() // clear
                        }).css('opacity', 0)
                    })
                }
            }
        } else { // not support, use margin
            return {
                start: function () {
                    this.set(0)
                    $bar.appendTo('body')
                },
                set: function (percent) {
                    $bar.attr('aria-valuenow', percent)
                        .css('margin-left', ( percent*100 - 100 ) +'%')
                },
                done: function () {
                    this.set(1)
                    $bar.remove()
                }
            }
        }
    })()




    var started = false, current

    // translate bar with random amount repeatedly
    var t
    function ticker() { 
        clearTimeout(t)

        t = setTimeout(function () {
            current += Math.random()/160 + .002 // 0.2% ~ 0.8% increment
            if (current < .99) { // stop after 99%
                ticker()
            }
            bar.set(current)
        }, Math.random()*500 + 400)  // 0.4s ~ 0.9s delay
    }
  

    // API
    var KProgress =  {
        start : function () {
            if (started) return
            started = true
            bar.start()
            bar.set(current = .1) // start with 10%
            ticker() // start ticker
        },
        done : function () {
            if (!started) {
                bar.start()
            }
            clearTimeout(t) // stop ticker
            current = 0
            bar.done()
            started = false
        },
        move : function (percent) {
            if (!started) {
                started = true
                bar.start()
            }

            if (typeof percent === 'number') {
                // user input lager than 1, direct done()
                if (percent >= 1) return KProgress.done()
                // backwords not allowed
                if (percent > current) bar.set(current = percent)
            } else {
                // move random amount
                percent = current + Math.random()/64 + .02 // 2% ~ 3.5%
                if (percent < .99) bar.set(current = percent)
            }

            ticker() // reset ticker
        }
    }
    return KProgress
}, {requires:['node', './index.css']})




