import React, { Component } from 'react'
import axios from 'axios'

import Card from 'react-bootstrap/Card';


class PostsList extends Component {
    state = {
        listOfPosts: []
    }

    getAllPosts = () => {
        axios.get("http://localhost:5000/api/allposts")
                    .then(responseFromAPI => {
                        this.setState ({
                            listOfPosts: responseFromAPI.data
                        })
                        console.log(responseFromAPI)
                    })
    }

    componentDidMount() {
      this.getAllPosts()  
    }

    render() {
        return(
            <div>
                    {this.state.listOfPosts.map(post=> {
                        console.log(post)
                        return(
                            <div key={post._id}> 
                                <Card style={{ width: '28rem' }}>       
                                            <Card.Body>
                                            <Card.Title style={{color: "blue"}}> Posted By: {post.postedBy.username}</Card.Title> 
                                            </Card.Body>  

                                            <Card.Img variant="top" src={post.imageUrl} />

                                            <Card.Body>
                                                 <Card.Title style={{color: "red"}}>Like_Unlike</Card.Title> 
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