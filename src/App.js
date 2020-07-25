import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import TaskDetails from './components/tasks/TaskDetails'; 
// import ProjectList from './components/projects/ProjectList';
// import ProjectDetails from './components/projects/ProjectDetails';
import AuthService from './components/auth/Auth-service';
import PostsList from './components/posts/PostsList';
import CreatePost from './components/posts/CreatePost'
import MyProfile from './components/MyProfile';
import UpdateProfile from './components/UpdateProfile';
import UpdatePost from './components/posts/UpdatePost';


import Navigationbar from './components/navbar/Navigationbar';
import Signup from './components/auth/Signup'; 
import Login from './components/auth/Login';    // ------->>>>>>>>>>>

import 'bootstrap/dist/css/bootstrap.min.css'  // REACT-BOOTSTRAP
import OtherUsersProfile from './components/OtherUsersProfile';

import { ToastContainer } from 'react-toastify';
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoclose: 5000,
  draggable:false,
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
 
  // 1. save the user into the browser localstorage
  // OR
  // 2. check if the user is still loggedin by calling the backend
  fetchUser = () => {
    if(this.state.loggedInUser === null) {
      this.service.loggedin() 
        .then(response => {
          if (response._id) {
            this.getTheUser(response);
            localStorage.setItem("loggedin", true);
          } else {
            localStorage.clear();
          }
        })
    }
  }
 
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

 
  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navigationbar userInSession={this.state.loggedInUser}  getUser={this.getTheUser}/>
         
         <Switch>
            {/* <Route exact path="/myprofile" component={MyProfile}/> */}

            <Route exact path="/myprofile" render={() => <MyProfile userInSession={this.state.loggedInUser} />}/>
            {/* <Route exact path="/updateprofile" render={() => <UpdateProfile userInSession={this.state.loggedInUser} />}/> */}
            <Route exact path="/updateprofile" component={UpdateProfile} />
            <Route exact path="/updatepost/:id" component={UpdatePost} />

            <Route exact path="/createpost" component={CreatePost}/>
            
            {/* <Route exact path="/" component={PostsList}/> */}
            <Route exact path="/" render={() => <PostsList userInSession={this.state.loggedInUser} />}/>
            {/* <Route exact path="/likepost/:id"/> */}
            <Route exact path="/otherusersprofile/:id" component={OtherUsersProfile}/>
         </Switch>
         
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navigationbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <ToastContainer style={{backgroundColor: 'red'}}/>
          <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>             
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
              <Route path='/login-google' component={() => { window.location.href = 'https://ih-proj3-be.herokuapp.com/api/auth/google' }}/>
          </Switch>
        </div>
      );
    }
  }
}
export default App;