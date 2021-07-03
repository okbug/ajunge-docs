import React from 'react';
class List extends React.Component {
  render() {
    let { data, render } = this.props;
    return <ul className=''>
      {
        data.map(item => {
          return <li key={item.id}>
            {render(item)}
          </li>
        })
      }
    </ul>;
  }
}
export default List