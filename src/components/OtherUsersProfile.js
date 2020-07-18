import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import AuthService from './auth/Auth-service';

import axios from 'axios';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom'
import OtherUsersPosts from './OtherUsersPosts'



class OtherUsersProfile extends Component {
    constructor(props){
      super(props);
      this.state = { 
        // loggedInUser: this.props.userInSession,
          listOfUserPosts: [],
          personalDetails: {}
      };
      // this.service = new AuthService();
    }
  

    getUser = () => {
        const { params } = this.props.match;
            axios.get(`http://localhost:5000/api/otherusersprofile/${params.id}`)  // id do User
                .then(responseFromAPI => {
                    this.setState ({
                        personalDetails: responseFromAPI.data
                    })
                    console.log("personalDetails", responseFromAPI)
                    console.log("personalDetails.data", responseFromAPI.data)
                    console.log("personalDetails.data", responseFromAPI.data.username)
                })         
    }

    componentDidMount() {
         this.getUser()  
         this.getOtherUserPosts()  
    }

    getOtherUserPosts = () => {
        const { params } = this.props.match;
            axios.get(`http://localhost:5000/api/otherusersposts/${params.id}`)  // id do User
                .then((responseFromAPI_2) => {
                    this.setState ({
                        listOfUserPosts: responseFromAPI_2.data
                    })
                    console.log("posts", responseFromAPI_2.data)
                })         
    }

//     componentDidMount() {
//         this.getOtherUserPosts()  
//    }


    // goAndGetPosts = () => {
    //      return <OtherUsersPosts theUser={this.state} {...this.props} />
    // }

    render() {
        return(
          <div>
              <div>
                    <h1>  User Personal details: </h1>
                    <h1>  Username:  {this.state.personalDetails.username} </h1>
                    <img src={this.state.personalDetails.userimage} style={{width:"20rem", height: "20rem"}} />
                    <hr></hr>
                    <br></br>
              </div> 
          
              {/* <div>{this.goAndGetPosts()} </div>   */}
               <h1 style={{color: "red"}}>  User POSTs </h1>
              
              <div>
                     {this.state.listOfUserPosts.map(post=> {
                       console.log("post", this.state.listOfUserPosts)
                        return(
                            <div key={post._id}> 
                                <Card style={{ width: '28rem' }}>       
                                            <Card.Body>
                                                <Card.Title style={{color: "blue"}}> Posted By: {post.postedBy}</Card.Title> 
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
          </div>   
        )}}  

export default OtherUsersProfile;