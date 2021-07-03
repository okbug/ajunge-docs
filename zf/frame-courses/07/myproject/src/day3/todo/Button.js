function Button(props) {
  let { children, onClick } = props;
  return <button onClick={onClick}>{children}</button>
}
export default Button