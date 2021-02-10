import React from 'react';
import {UserAPI} from '../utils';
class UserList extends React.Component{
   state = {user:{}}
   componentDidMount(){
       let user = this.props.location.state;
       if(!user){
          let id = this.props.match.params.id;
          user = UserAPI.find(id);
       }
       if(user){
           this.setState({user})
       } 
   }
   render(){
       console.log('this.props.location',this.props.location);
       let {user} = this.state;
       return (
           <div>
               <p>ID:{user.id}</p>
               <p>name:{user.name}</p>
           </div>
       )
   }
}
export default UserList;