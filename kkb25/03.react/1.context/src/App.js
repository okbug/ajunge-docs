import React from 'react'
let element = (
  <div id="mainApp">
    <h1 className={(function(){return 'hhh'})()}>哈哈哈</h1>
  </div>
)
console.log(JSON.stringify(element, null, 2))
class Test {
  age;
  constructor(name) {
    this.name = name
  }
}
let test = new Test('haha')
console.log(test)
for(let  i in test) {
  console.log(i, test.hasOwnProperty(i))
}
export default class App extends React.Component {
  render() {
    return (<>
      <h1>App</h1>
    </>)
  }
}