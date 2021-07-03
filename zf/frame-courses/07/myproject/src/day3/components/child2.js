import React from 'react';
class List extends React.Component {
  render() {
    let { data = [], children } = this.props;
    console.log(children)
    return <ul className=''>
      {children}
      {/* {
        // data.map(item => <li key={item.id}>姓名是{item.name}</li>)
        data.map(item => children)
      } */}
    </ul>;
  }
}
export default List