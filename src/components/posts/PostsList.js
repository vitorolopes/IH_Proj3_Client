import React, { Component } from 'react'
import axios from 'axios'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class PostsList extends Component {
    state = {
        listOfPosts: [],
        likes:[]
        // unlikes:[],
        // backColor_like: "gray",
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

    likePost = (idPost, idUser) => {
        const { params } = this.props.match; //! params = {} PORQUÊ? Fiz de outra forma usei post._id como argumento de likePost no onClick
        //console.log(this.props)
        // axios.put(`http://localhost:5000/api/likepost/${params.id}`, {withCredentials: true}) //! params = {} PORQUÊ? Fiz de outra forma usei post._id como argumento de likePost no onClick
        // axios.put(`http://localhost:5000/api/likepost/${idPost}`, {withCredentials: true})  
           axios.put(`http://localhost:5000/api/likepost/${idPost}`, {likes: this.state.likes.push(idUser)}, {withCredentials: true})
           .then(responseFromAPI => {
            console.log(responseFromAPI)
            this.getAllPosts()  // to REFRESH  the page (update the number of LIKES). NOT WORKING.
         })
        .catch((err)=>{
            console.log(err)
        })
        this.setState({
            backColor_like: "blue"
        })
        
    }

    unlikePost = (idPost, idUser) => {
           axios.put(`http://localhost:5000/api/unlikepost/${idPost}`, {likes: this.state.likes.push(idUser)}, {withCredentials: true})
           .then(responseFromAPI => {
            console.log(responseFromAPI)
            this.getAllPosts()  // to REFRESH  the page (update the number of LIKES). NOT WORKING.
         })
        .catch((err)=>{
            console.log(err)
        })
        this.setState({
            backColor_unlike: "orange"
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

                                            {post.likes.includes(post.postedBy._id)
                                            ?
                                           <Button  
                                                 onClick={()=>{this.unlikePost(post._id, post.postedBy)}}
                                                //  style={{backgroundColor: this.state.backColor_unlike}}
                                            >
                                                RemoveLike
                                            </Button>
                                            :
                                            <Button 
                                            onClick={()=>{this.likePost(post._id, post.postedBy)}}
                                            //  style={{backgroundColor: this.state.backColor_like}}
                                            >
                                            LikeThisPost
                                            </Button>
                                            } 



                                            <h6>{post.likes.length} likes</h6>
                                            {/* <h6>{post.unlikes.length} unlikes</h6> */}
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