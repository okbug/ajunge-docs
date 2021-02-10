import React from 'react';
class UserDetail extends React.Component{
    render(){
        let {id} = this.props.match.params;
        return (
            <div>
               <p>ID:{id}</p>
            </div>
        )
    }
}
export default UserDetail;