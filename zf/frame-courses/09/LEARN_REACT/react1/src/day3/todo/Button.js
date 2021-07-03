function Button(props) {
  return <button onClick={props.onClick}>
    {props.children || '按钮'}
  </button>
}
export default Button