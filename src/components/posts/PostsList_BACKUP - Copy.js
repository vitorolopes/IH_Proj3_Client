import React, { Component } from 'react'
import axios from 'axios'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

import { FaHeart } from 'react-icons/fa';

import { Container, Row, Col } from "react-bootstrap";

class PostsList extends Component {
    state = {
        listOfPosts: [],
        likes:[],
        // unlikes:[],
        backColor_like: "gray",
        // backColor_unlike: "gray"
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
        const { params } = this.props.match; 
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
               <h2 style={{color:"#27AEFC"}}>All Posts from the DB</h2>

               <Container>
                  <Row>
                    {this.state.listOfPosts.map(post=> {
                        return(
                            <div key={post._id}> 
                             <Col xs="3">
                                <Card className="cardpost-postlist" style={{ width: '20rem' }}>       
                                            <Card.Body>
                                                <Card.Title >
                                                Posted By:
                                                    <Nav.Link as={Link} to={`otherusersprofile/${post.postedBy._id}`}>
                                                         {post.postedBy.username}
                                                    </Nav.Link>
                                                </Card.Title> 
                                                <Card.Title>
                                                    Created: {post.createdAt.substring(0,10)}
                                                </Card.Title>
                                            </Card.Body> 
                                            
                                            {post.likes.includes(post.postedBy._id)
                                            ?
                                                <Button  
                                                    onClick={()=>{this.unlikePost(post._id, post.postedBy)}} 
                                                    style={{width:"fit-content" }}
                                                >
                                                    RemoveLike <FaHeart style={{color: "gray"}} />
                                                </Button>
                                            :
                                                <Button 
                                                    onClick={()=>{this.likePost(post._id, post.postedBy)}}
                                                    style={{width:"fit-content" }}
                                                >
                                                    Like  <FaHeart style={{color: "red"}} />
                                                </Button>
                                            } 

                                            {!post.likes.includes(post.postedBy._id)
                                            ?
                                                <Button  
                                                    onClick={()=>{this.unlikePost(post._id, post.postedBy)}}
                                                    style={{width:"fit-content" }}
                                                >
                                                    RemoveLike <FaHeart style={{color: "gray"}} />
                                                </Button>
                                            :
                                                <Button 
                                                    onClick={()=>{this.likePost(post._id, post.postedBy)}}
                                                    style={{width:"fit-content" }}
                                                >
                                                    Like  <FaHeart style={{color: "red"}} />
                                                </Button>
                                            } 
                                            
                                            <h6>{post.likes.length} likes</h6>
                                            {/* <h6>{post.unlikes.length} unlikes</h6> */}
                                            <Card.Img className="cardimg-postlist" variant="top" src={post.imageUrl} />

                                            <Card.Body>
                                                 <Card.Title style={{color: "red"}}>Comments</Card.Title> 
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