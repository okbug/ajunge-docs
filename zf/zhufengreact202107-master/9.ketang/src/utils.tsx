

export function loadMore(element:HTMLElement,callback:Function){
    let last=Date.now();
    function _loadMore(){
        console.log(Date.now()-last);
        last=Date.now();
        let clientHeight = element.clientHeight;//容器高度
        let scrollTop = element.scrollTop;//向上卷去的高度
        let scrollHeight = element.scrollHeight;//内容的高度
        if(clientHeight + scrollTop+10  >= scrollHeight){
            callback();
        }
    }
    element.addEventListener('scroll',debounce(_loadMore,50));
}


//防抖还是节流?
//防抖  如果你连续触发的话，只在最后执行一次//160ms  10 1
//节流 如果你连接触发的各方面，会减少执行的频率 160 50ms 3
export function debounce(fn:Function,await:number){
  let timeout:any;
  return function(){
    let context = this;
    let args = Array.from(arguments);
    if(timeout){
        clearTimeout(timeout);
    }
    timeout = setTimeout(()=>fn.apply(context,args),await);
  }
}
//上拉加载用防抖
//下拉刷新要用节流

export function downRefresh(element:HTMLDivElement,callback:Function){
  let startY:number;///存放按下的时候 起始纵坐标
  let distance:number;//下次下拉的距离 
  let originalTop = element.offsetTop;//最初的时候此元素距离顶部的距离 100px
  let startTop:number;//开始的top值
  element.addEventListener('touchstart',(event:TouchEvent)=>{
    let touchMove = throttle(_touchMove,30);
    if(element.scrollTop === 0){
      startTop = element.offsetTop;//当前的top值
      startY = event.touches[0].pageY;//记录当前点击的给纵坐标
      element.addEventListener('touchmove',touchMove);
      element.addEventListener('touchend',touchEnd);
    }
    let last=Date.now();
    function _touchMove(event:TouchEvent){
      console.log(Date.now()-last);
      last  = Date.now()
      let pageY = event.touches[0].pageY;
      if(pageY>=startY){//新的纵坐标比老的大，才是下拉，才会处理
        distance = pageY-startY;//计算向下移动的距离 
        element.style.top = startTop+distance+'px';
      }else{
        element.removeEventListener('touchmove',touchMove);
        element.removeEventListener('touchend',touchEnd);
      }
    }
    function touchEnd(event:TouchEvent){
      element.removeEventListener('touchmove',touchMove);
      element.removeEventListener('touchend',touchEnd);
      if(distance>30){
        callback();
      }
      function _back(){
        let currentTop = element.offsetTop;
        if(currentTop - originalTop>=1){
          element.style.top = currentTop-1+'px';
          window.requestAnimationFrame(_back);
        }else{
          element.style.top = originalTop+'px';
        }
      }
      window.requestAnimationFrame(_back);
    }
  })
}

function throttle(func:Function,delay:number){
  let prev = Date.now();
  return function(){
    let context = this;
    let args = Array.from(arguments);
    let now = Date.now();
    if(now - prev >= delay){
      func.apply(context,args);
      prev= now;
    }
  }
}