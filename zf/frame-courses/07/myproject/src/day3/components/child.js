function Child(props) {
  let { age = 100, fn } = props;
  function changeName() {
    fn("zhufeng666")
  }
  return <div>
    hello {age}
    <button onClick={changeName}>改名字</button>
  </div>
}
export default Child