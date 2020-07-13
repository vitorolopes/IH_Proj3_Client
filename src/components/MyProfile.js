import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import AuthService from './auth/Auth-service';

import axios from 'axios';
import Card from 'react-bootstrap/Card';



class MyProfile extends Component {
    constructor(props){
      super(props);
      this.state = { 
        loggedInUser: this.props.userInSession,
        listOfOwnPosts: []
      };


      // this.service = new AuthService();
    }
  
    // componentWillReceiveProps(nextProps) {
    //   this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
    // }

    getOwnPosts = () => {
      axios.get("http://localhost:5000/api/ownposts", {withCredentials: true}) //  -------->>>>>>>>>>>>> é aqui q é passado o Id do User  <<<<<<<<<<<<------------
                  .then(responseFromAPI => {
                      this.setState ({
                          listOfOwnPosts: responseFromAPI.data
                      })
                     // console.log(responseFromAPI)
                  })
  }

  componentDidMount() {
    this.getOwnPosts()  
  }


    render() {
        return(
          <div>
              <h1>My Personal details</h1>
              
              <h3>Bemvindo, {this.state.loggedInUser.username}</h3>
              <h3>email: {this.state.loggedInUser.email}</h3>
              <img src={this.state.loggedInUser.userimage} style={{width:"20rem", height: "20rem"}} />
              <hr></hr>
              <br></br>
              <a href="/updateprofile" style={{color:"red", fontWeight:"bolder"}}>Update profile</a>


            




              <h1>My Posts</h1>
                    {this.state.listOfOwnPosts.map(post=> {
                       // console.log(post)
                        return(
                            <div key={post._id}> 
                                <Card style={{ width: '28rem' }}>       
                                            <Card.Body>
                                            <Card.Title style={{color: "blue"}}> Posted By: {post.postedBy.username}</Card.Title> 
                                            </Card.Body>  

                                            <Card.Img variant="top" src={post.imageUrl} />

                                            <Card.Body>
                                                
                                                 <Card.Title>{post.title}</Card.Title> 
                                                 <Card.Text>{post.description}</Card.Text> 
                                            </Card.Body>     
                                </Card>
                            </div>
                        )
                    })}
          </div>
            
        )
    }
}  

export default MyProfile;