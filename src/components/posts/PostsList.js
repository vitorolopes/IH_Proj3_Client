import React, { Component } from 'react'
import axios from 'axios'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class PostsList extends Component {
    state = {
        listOfPosts: [],
        likes:[]
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

    likePost = (idPost, idUser) => {
        const { params } = this.props.match; //! params = {} PORQUÊ? Fiz de outra forma usei post._id como argumento de likePost no onClick
        console.log(this.props)
        // axios.put(`http://localhost:5000/api/likepost/${params.id}`, {withCredentials: true}) //! params = {} PORQUÊ? Fiz de outra forma usei post._id como argumento de likePost no onClick
        // axios.put(`http://localhost:5000/api/likepost/${idPost}`, {withCredentials: true})  //! BE error req.user not defined. It was not passing {withCredentials: true} because a second argument was missing-->{likes: ...}
           axios.put(`http://localhost:5000/api/likepost/${idPost}`, {likes: this.state.likes.push(idUser)}, {withCredentials: true})
        
         .then(responseFromAPI => {
            console.log(responseFromAPI)
         })
        .catch((err)=>{
            console.log(err)
        })
    }


   


    render() {
        return(
            <div>
                    {this.state.listOfPosts.map(post=> {
                        // console.log(post)
                        return(
                            <div key={post._id}> 
                                <Card style={{ width: '28rem' }}>       
                                            <Card.Body>
                                            <Card.Title style={{color: "blue"}}> Posted By: {post.postedBy.username}</Card.Title> 
                                            </Card.Body>  
                                            <Button  onClick={()=>{this.likePost(post._id, post.postedBy)}}>
                                                LikeThisPost
                                            </Button>
                                            <h6>{post.likes.length} likes</h6>
                                            <Card.Img variant="top" src={post.imageUrl} />

                                            <Card.Body>
                                                 
                                                 <Card.Title style={{color: "red"}}>Like_Unlike</Card.Title> 
                                                 <Card.Title style={{color: "red"}}>Comments</Card.Title> 
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
export default PostsList;