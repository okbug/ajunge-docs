import React from 'react';
class Focus extends React.Component {
  giveLi(num, index) {
    let ary = [];
    for (let i = 0; i < num; i++) {
      ary.push(<li key={i} className={i == index ? 'current' : ''}></li>)
    }
    return ary
  }
  render() {
    let { num, index } = this.props;
    if (index >= num) {
      index = 0
    }
    return <ul className='focus_box'>
      {
        this.giveLi(num, index)
      }
    </ul>;
  }
}
export default Focus