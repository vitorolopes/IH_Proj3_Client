import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import AuthService from './auth/Auth-service';

import axios from 'axios';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom'
import OtherUsersPosts from './OtherUsersPosts'
import Image from 'react-bootstrap/Image'

import { Container, Row, Col } from "react-bootstrap";



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
          <div className="persDetailsMainContainer">
              <div>
                <Card  style={{borderColor: '#12a0af', marginTop:'20px'}} >
                  <div className="persDetailsUpCard">
                    <h2> {this.state.personalDetails.username} Personal Details</h2>
                  </div>   
                </Card>
                <br></br>

                <div>
                {/* <h3>Bemvindo, {this.state.loggedInUser.username}</h3> */}
                <Card style={{borderColor: '#12a0af'}}>
                  <div className="img-email">
                    <div>
                        <Image src={this.state.personalDetails.userimage} roundedCircle fluid className="img-profile" />
                      </div>
                      <div>
                        <h3><b>Email:</b> {this.state.personalDetails.email}</h3>
                        <br></br>
                        <h3><b>Created:</b> {this.state.personalDetails.createdAt} </h3>
                      </div>
                  </div>  
                </Card>
                <br></br>
              </div>
                    
            </div> 
          
             
            
              
              <div className="persDetailsPostContainer">
                   <h2 style={{color:"#27AEFC"}}>   {this.state.personalDetails.username} Posts </h2>

                   <Container>
                    <Row>
                     {this.state.listOfUserPosts.map(post=> {
                    //    console.log("post", this.state.listOfUserPosts)
                        return(
                         <div key={post._id} className="card-div"> 
                             <Col xs="6" >
                                <Card className="cardpost" style={{minHeight:'40rem'}}>                 
                                            <Card.Img className="cardimg-myprofile" variant="top" src={post.imageUrl} />

                                            <Card.Body className="cardbody">
                                                 <Card.Title>{post.title}</Card.Title> 
                                                 <Card.Text className="cardtext">{post.description}</Card.Text>     
                                            </Card.Body>     
                                </Card>
                            </Col>
                         </div>
                        )
                    })} 
                 </Row>
               </Container>
              </div> 
          </div>   
        )}}  

export default OtherUsersProfile;