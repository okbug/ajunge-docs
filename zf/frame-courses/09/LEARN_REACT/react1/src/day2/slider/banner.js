function Banner(props) {
  let { list, index, onSetIndex } = props;
  list = list.concat({ ...list[0], id: list.length + 1 })
  let sty = { width: list.length * 400 + 'px' };
  // 边界判断
  console.log(index)
  if (index >= list.length) {
    // 要展示白屏了， 这时我们要让他闪现到真正的第一张 紧接着向第二张运动
    Object.assign(sty, {
      transform: `translateX(-${0}px)`,
    })
    setTimeout(() => {
      onSetIndex(1)
    }, 20);
  } else if (index <= -1) {
    // 左边界  闪到最后一张  紧接着 像倒数第二张运动
    Object.assign(sty, {
      transform: `translateX(${-(list.length - 1) * 400}px)`,
    })
    setTimeout(() => {
      onSetIndex(list.length - 2)
    }, 20);
  } else {
    Object.assign(sty, {
      transform: `translateX(${-index * 400}px)`,
      transition: 'all 0.5s'
    })
  }






  console.log(sty)
  return <ul className='banner_box' style={sty}>
    {
      list.map(item => <li key={item.id}>{item.text}</li>)
    }
  </ul>
}

export default Banner