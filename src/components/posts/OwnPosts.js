import React, { Component } from 'react'
import axios from 'axios'

import Card from 'react-bootstrap/Card';

class OwnPosts extends Component {
    state = {
        listOfPosts: []
    }

    getOwnPosts = () => {
        axios.get("https://ih-proj3-be.herokuapp.com/api/ownposts")
                    .then(responseFromAPI => {
                        this.setState ({
                            listOfPosts: responseFromAPI.data
                        })
                        console.log(responseFromAPI)
                    })
    }

    componentDidMount() {
      this.getOwnPosts()  
    }

    render() {
        return(
            <div>
                    {this.state.listOfPosts.map(post=> {
                        return(
                            <div key={post._id}> 
                                <Card style={{ width: '28rem' }}>        
                                            <Card.Img variant="top" src={post.photo} />

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
export default OwnPosts;