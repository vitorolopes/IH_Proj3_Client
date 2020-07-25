import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import AuthService from './auth/Auth-service';

import axios from 'axios';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom'



class OtherUsersProfile extends Component {
    constructor(props){
      super(props);
      this.state = { 
        // loggedInUser: this.props.userInSession,
          listOfOtherUserPosts: []
      };
      // this.service = new AuthService();
    }
  

   

    getOtherUserPosts = () => {
        // const { params } = this.props.match;
            axios.get(`https://ih-proj3-be.herokuapp.com/api/otherusersposts/${this.props.theUser._id}`)  // id do User
                .then(responseFromAPI => {
                    this.setState ({
                        listOfOtherUserPosts: responseFromAPI
                    })
                    console.log("personalDetails", responseFromAPI)
                })         
    }

 
    render() {
        return(
          <div>
                    {this.state.listOfOtherUserPosts.map(post=> {
                       console.log(post)
                        return(
                            <div key={post._id}> 
                                <Card style={{ width: '28rem' }}>       
                                            <Card.Body>
                                                <Card.Title style={{color: "blue"}}> Posted By: {post.postedBy.username}</Card.Title> 
                                            </Card.Body>  
                                                
                                            <Card.Img variant="top" src={post.imageUrl} />

                                            <Card.Body>
                                                 <Card.Text>{post.description}</Card.Text>     
                                            </Card.Body>     
                                </Card>
                            </div>
                        )
                    })}
          </div>   
        )}}  

export default OtherUsersProfile;