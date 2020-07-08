import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import TaskDetails from './components/tasks/TaskDetails'; 
// import ProjectList from './components/projects/ProjectList';
// import ProjectDetails from './components/projects/ProjectDetails';
import AuthService from './components/auth/Auth-service';
import PostsList from './components/posts/PostsList';
import MyProfile from './components/MyProfile';
import CreatePost from './components/posts/CreatePost'

import Navigationbar from './components/navbar/Navigationbar';
import Signup from './components/auth/Signup'; 
import Login from './components/auth/Login';    // ------->>>>>>>>>>>

import 'bootstrap/dist/css/bootstrap.min.css'  // REACT-BOOTSTRAP
 

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
 
  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
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
            <Route exact path="/myprofile" component={MyProfile}/>
            <Route exact path="/createpost" component={CreatePost}/>
            <Route exact path="/" component={PostsList}/>
         </Switch>
         
         
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navigationbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>             
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
          </Switch>
        </div>
      );
    }
  }
}
export default App;