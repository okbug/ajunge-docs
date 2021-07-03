import React from 'react';
import { connect } from 'react-redux'
class User extends React.Component<any> {
  render() {

    return <div className=''>
      User{
        JSON.stringify(this.props.userInfo)
      }
    </div>;
  }
}
let User2 = connect((state: any) => {
  return {
    ...state
  }
})(User)
export default User2