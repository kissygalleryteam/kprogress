## 综述

KProgress: 一个轻量的全局进度条, 适用于重ajax的网站.  
Inspired by [NProgress](http://ricostacruz.com/nprogress/)

* 版本：1.0
* 作者：幽零
* 标签：
* demo：[http://gallery.kissyui.com/kprogress/1.0/demo/index.html](http://gallery.kissyui.com/kprogress/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/kprogress/1.0/index', function (S, KProgress) {
        // KProgress.start()
        // KProgress.move(.6)
        // KProgress.done()
    })

## API说明


### KProgress.start()

显示进度条.



### KProgress.move([expectedPercentage])

移动指定或者随机(未指定参数)的一段距离.


**Arguments**

* expectedPercentage - 指定进度条的进度, 最大1.



### KProgress.done()

完成~
