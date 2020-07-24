import React, { Component } from 'react'
import axios from 'axios'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { FaHeart } from 'react-icons/fa';

import { Container, Row, Col } from "react-bootstrap";


class PostsList extends Component {
    constructor(props) {
        super(props)
          this.state = {
                listOfPosts: [],
                likes:[],
                // unlikes:[],
                loggedInUser: this.props.userInSession,
                backColor_like: "gray",
        // backColor_unlike: "gray"
         }
    }
  

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
      }

    getAllPosts = () => {
        axios.get("http://localhost:5000/api/allposts")
                    .then(responseFromAPI => {
                        this.setState ({
                            listOfPosts: responseFromAPI.data
                        })
                        // console.log(responseFromAPI)
                    })
    }

    componentDidMount() {
      this.getAllPosts()  
    }

    forceUpdateHandler(){   // to update Likes and RemoveLikes without having to reload the page
        this.forceUpdate();
      };

    // componentDidUpdate(){
    //     this.getAllPosts()
    // }

    likePost = (idPost, idUser) => {
        // const { params } = this.props.match; 
           axios.put(`http://localhost:5000/api/likepost/${idPost}`, {likes: this.state.likes.push(idUser)}, {withCredentials: true})
           .then(responseFromAPI => {
            console.log("resposta?",responseFromAPI)
            // this.forceUpdateHandler()  
           /*  this.setState ({
                state: this.state
            }) */
            this.getAllPosts(); // to update Likes and RemoveLikes without having to reload the page
         })
        .catch((err)=>{
            console.log(err)
        })
    }

    unlikePost = (idPost, idUser) => {
           axios.put(`http://localhost:5000/api/unlikepost/${idPost}`, {likes: this.state.likes.push(idUser)}, {withCredentials: true})
           .then(responseFromAPI => {
            console.log(responseFromAPI)
            this.getAllPosts()  // to update Likes and RemoveLikes without having to reload the page
         })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {

        return(
            <div className="persDetailsPostContainer" >
               {/* <h2 style={{color:"#27AEFC"}}>All Posts from the DB</h2> */}

               <Container style={{marginLeft:'25px'}} >
                  <Row > 
                    {this.state.listOfPosts.map(post=> {
                        return(
                            <div key={post._id}> 
                             <Col xs="3">
                                <Card className="cardpost-postlist" style={{ width: '20rem', minHeight:'50rem'}}>  
                                          {(post.postedBy._id !== this.state.loggedInUser._id)
                                            ?
                                            <Card.Body>
                                                <Card.Title  style={{marginBottom:'0px'}} >
                                                Posted By:
                                                    <Nav.Link as={Link} to={`otherusersprofile/${post.postedBy._id}`} >
                                                         {post.postedBy.username}
                                                    </Nav.Link>
                                                </Card.Title> 
                                                
                                                <Card.Title  style={{marginTop:'0px', marginBottom:'0px'}} >
                                                    Created: 
                                                </Card.Title>
                                                <Card.Title style={{color:"#27AEFC", marginLeft:'15px', marginTop:'0px'}}>
                                                    {post.createdAt.substring(0,10)}
                                                </Card.Title>
                                            </Card.Body> 
                                            :
                                            <Card.Body>

                                                <Card.Title  style={{marginBottom:'0px'}} >
                                                Posted By:
                                                </Card.Title> 
                                                 <Card.Title style={{padding: '10px', marginBottom:'0px', color:'#0d6fa6'}}>
                                                       {/* {post.postedBy.username} */}
                                                       You
                                                 </Card.Title>
                                               

                                                 <Card.Title  style={{marginTop:'0px', marginBottom:'0px'}} >
                                                    Created: 
                                                </Card.Title>
                                                <Card.Title style={{color:"#27AEFC", marginLeft:'15px', marginTop:'0px'}}>
                                                    {post.createdAt.substring(0,10)}
                                                </Card.Title>
                                                
                                            </Card.Body>   

                                          }
                                         {post.postedBy._id !== this.state.loggedInUser._id && 
                                              
                                              (post.likes.includes(this.state.loggedInUser._id)
                                              ?
                                                  <Button  
                                                      onClick={()=>{this.unlikePost(post._id, this.state.loggedInUser._id)}} 
                                                      style={{width:"fit-content" }}
                                                  >
                                                      RemoveLike <FaHeart style={{color: "gray"}} />
                                                  </Button>
                                              :
                                                  <Button 
                                                      onClick={()=>{this.likePost(post._id, this.state.loggedInUser._id)}}
                                                      style={{width:"fit-content" }}
                                                  >
                                                      Like  <FaHeart style={{color: "red"}} />
                                                  </Button>
                                              )
                                          }
                                        
                                            <h6 style={{marginTop:'5px'}}>{post.likes.length} likes</h6>
                                    
                                            <Card.Img className="cardimg-postlist" variant="top" src={post.imageUrl} />

                                            <Card.Body className="cardbody">
                                                 {/* <Card.Title style={{color: "red"}}>Comments</Card.Title>  */}
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
        )
    }
}
export default PostsList;


 {/* { post.likes.includes(this.state.loggedInUser._id)
                                            ?
                                                <Button  
                                                    onClick={()=>{this.unlikePost(post._id, this.state.loggedInUser._id)}} 
                                                    style={{width:"fit-content" }}
                                                >
                                                    RemoveLike <FaHeart style={{color: "gray"}} />
                                                </Button>
                                            :
                                                <Button 
                                                    onClick={()=>{this.likePost(post._id, this.state.loggedInUser._id)}}
                                                    style={{width:"fit-content" }}
                                                >
                                                    Like  <FaHeart style={{color: "red"}} />
                                                </Button>
                                           } */}