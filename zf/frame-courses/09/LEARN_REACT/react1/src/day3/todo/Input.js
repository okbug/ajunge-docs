function Input(props) {
  return <div>
    <input
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={(e) => {
        if (e.keyCode == 13) {
          props.onSubmit()
        }
      }}
    />
  </div>
}
export default Input