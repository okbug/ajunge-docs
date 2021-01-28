import React from './react';
import ReactDOM from './react-dom'
// var element = React.createElement('h1', {
//     className:'title',
//     style:{
//         color:'red',
//         fontSize:'20px'
//     }
// }, 'hello',React.createElement('span', null, 'world'))
// function Welcome(props) {
//     return React.createElement('h1', {
//         className:'title',
//         style:{
//             color:'red',
//             fontSize:'20px'
//         }
//     }, 'hello',React.createElement('span', {style:{fontSize:'20px'}}, 'world'))
// }
class Welcome extends React.Component {
    handleclick = () => {
        this.setState({age:this.state.age+ 1})
        
    }
    state = {
        name:'鳄鱼山',
        age:20
    }
    componentDidMount()  {
        console.log(this)
    }
    render() {
    return <h1 onClick={this.handleclick}>{this.state.name} 今年{this.state.age}岁</h1>

        
    }
}
console.log(1111,React.createElement(Welcome, {}))
let a = React.createElement('h1', {
    className:'title',
    style:{
        color:'red',
        fontSize:'20px'
    }
    }, 'hello',React.createElement('span', {style:{fontSize:'20px'}}, 'world'))
    console.log(a,'11')
ReactDOM.render(React.createElement(Welcome, {}), document.getElementById('app'))



// React.createElement('h1', {
// className:'title',
// style:{
//     color:'red',
//     fontSize:'20px'
// }
// }, 'hello',React.createElement('span', {style:{fontSize:'20px'}}, 'world'))
         