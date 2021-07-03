function List(props) {
  let { data } = props;
  return <ul>
    {
      data.map(item => {
        return props.render ? <li key={item.id}> {props.render(item)}</li> : <li key={item.id}>{item.text}</li>
      })
    }
  </ul>
}

export default List