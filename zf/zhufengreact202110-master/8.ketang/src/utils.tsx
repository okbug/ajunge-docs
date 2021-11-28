
function loadMore(domElement: HTMLElement, callback: Function) {
    let lastTS = Date.now();
    function _loadMore() {
        console.log(Date.now() - lastTS);
        lastTS = Date.now();
        let clientHeight = domElement.clientHeight;//窗口高度 px 667px-110px=557
        let scrollTop = domElement.scrollTop;//向上卷去的高度
        let scrollHeight = domElement.scrollHeight;
        if (clientHeight + scrollTop + 10 >= scrollHeight) {
            callback();
        }
    }
    domElement.addEventListener('scroll', debounce(_loadMore, 500));
}

function debounce(fn: Function, wait: number) {
    let $timeout: any;
    return function () {
        if ($timeout) clearTimeout($timeout);
        $timeout = setTimeout(fn, wait);
    }
}
/**
 * 下拉刷新 
 */
function downRefresh(domElement: HTMLElement, callback: Function) {
    let startY: number;//存放开始下拉时的纵坐标
    let distance: number;//本次下拉的总距离 
    let originalTop: number = domElement.offsetTop;//最初的时候此元素距离顶部的距离? 50px
    let startTop: number;///开始下拉的top值 50px
    let backTimer: any;
    domElement.addEventListener('touchstart', function (event: TouchEvent) {
        let touchMove = throttle(_touchmove, 16);
        //&& domElement.offsetTop === originalTop
        if (domElement.scrollTop === 0) {//如果此前的元素没有向上滚动才会进行下拉的逻辑处理
            if (backTimer) {
                clearInterval(backTimer)
                backTimer = null;
            }
            startTop = domElement.offsetTop;//第一次的都是50px
            startY = event.touches[0].pageY;//先记录点击时的Y坐标
            domElement.addEventListener('touchmove', touchMove);
            domElement.addEventListener('touchend', touchend)
        }
        let lastTs: any;
        function _touchmove(event: TouchEvent) {
            let currentTs = Date.now();
            console.log(currentTs - lastTs);
            lastTs = currentTs;
            let pageY = event.touches[0].pageY;//获取最新的Y坐标
            if (pageY > startY) {//只处理下拉
                distance = pageY - startY;
                domElement.style.top = startTop + distance + 'px';
            } else {
                domElement.removeEventListener('touchmove', touchMove);
                domElement.removeEventListener('touchend', touchend)
            }
        }
        function touchend() {
            domElement.removeEventListener('touchmove', touchMove);
            domElement.removeEventListener('touchend', touchend);
            if (distance > 30) {
                callback();
            }
            backTimer = setInterval(() => {
                let currentTop = domElement.offsetTop;
                if (currentTop - originalTop >= 1) {
                    //如果距离最原始的顶部多于1个像素，回弹一个像素
                    domElement.style.top = currentTop - 1 + 'px';
                } else {
                    backTimer && clearInterval(backTimer)
                    domElement.style.top = originalTop + 'px';
                }
            }, 16);
            /*    function _back() {
                   let currentTop = domElement.offsetTop;
                   if (currentTop - originalTop >= 1) {
                       //如果距离最原始的顶部多于1个像素，回弹一个像素
                       domElement.style.top = currentTop - 1 + 'px';
                       requestAnimationFrame(_back);
                   } else {
                       domElement.style.top = originalTop + 'px';
                   }
               }
               requestAnimationFrame(_back); */
        }
    });
}

function throttle(func: any, delay: number) {
    let prev = Date.now();
    return function () {
        const context = this;
        let args = arguments;
        let now = Date.now();
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = now;
        }
    }
}


export {
    loadMore,
    debounce,
    downRefresh,
    throttle
}