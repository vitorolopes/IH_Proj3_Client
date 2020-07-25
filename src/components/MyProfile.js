import React, { Component } from 'react';

import axios from 'axios';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { Container, Row, Col } from "react-bootstrap";




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
      axios.get("https://ih-proj3-be.herokuapp.com/api/ownposts", {withCredentials: true}) //  -------->>>>>>>>>>>>> é aqui q é passado o Id do User  <<<<<<<<<<<<------------
                  .then(responseFromAPI => {
                      this.setState ({
                          listOfOwnPosts: responseFromAPI.data
                      })
                     // console.log(responseFromAPI)
                     console.log(this.state)  //! Wednesday
                  })
  }


  componentDidMount() {
    this.getOwnPosts() 
  }



  //! UPDATING /myprofile without having to reload the page
  // forceUpdateHandler(){  
  //   // this.forceUpdate();
  //   this.setState({ state: this.state });
  // };


    render() {
        return(
          <div className="persDetailsMainContainer">
            <div>
                <Card  style={{borderColor: '#12a0af', marginTop:'20px'}} >
                  <div className="persDetailsUpCard">
                    <h2>My Personal Details</h2>
                    <Button href="/updateprofile" variant="info" size="lg">
                      Update profile
                    </Button>
                  </div>   
                </Card>

              <br></br>

              <div>
                {/* <h3>Bemvindo, {this.state.loggedInUser.username}</h3> */}
                <Card style={{borderColor: '#12a0af'}}>
                  <div className="img-email">
                    <div>
                        <Image src={this.state.loggedInUser.userimage} roundedCircle fluid className="img-profile" />
                      </div>
                      <div>
                        <h3><b>Email:</b> {this.state.loggedInUser.email}</h3>
                        <br></br>
                        <h3><b>Created:</b> {this.state.loggedInUser.createdAt.substring(0,10)} </h3>
                      </div>
                  </div>  
                </Card>
                <br></br>
              </div>
            </div>
               
              


            <div className="persDetailsPostContainer" >
               <h2 style={{color:"#27AEFC"}}>My Posts</h2>

               <Container>
                  <Row>
                    {this.state.listOfOwnPosts.map(post=> {
                      // console.log(post)
                        return(
                            <div key={post._id} className="card-div"> 
                              <Col xs="6" >
                                <Card className="cardpost" style={{minHeight:'40rem'}} >       
                                            <Card.Img className="cardimg-myprofile" variant="top" src={post.imageUrl} />
                                            <Card.Body className="cardbody">
                                                <Link to ={`/updatepost/${post._id}`}>
                                                   <Card.Title>{post.title}</Card.Title> 
                                                </Link>
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
            
        )
    }
}  

export default MyProfile;