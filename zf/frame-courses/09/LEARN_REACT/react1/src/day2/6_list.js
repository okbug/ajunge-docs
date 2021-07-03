function List(props) {
  let { data, children, render123 } = props;
  //  children 类似于vue的插槽 slot
  console.log(props)
  let title = [], footer = [];
  if (Array.isArray(children)) {
    children.forEach(item => {
      if (item.props.slot == 'title') {
        title.push(item)
      } else {
        footer.push(item)
      }
    })
  } else {
    if (children.props.slot == 'title') {
      title.push(children)
    } else {
      footer.push(children)
    }
  }
  return <>
    {title}
    <ul>
      {
        data.map(item => <li key={item}>
          {render123 ? render123(item) : item}
        </li>)
      }
    </ul>
    {footer}
  </>
}
export default List