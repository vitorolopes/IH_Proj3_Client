import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';




class MyProfile extends Component {     
    state = {
        listOfOwnPosts: []
    }

   


    getOwnPosts = () => {
        axios.get("http://localhost:5000/api/ownposts", {withCredentials: true}) //  -------->>>>>>>>>>>>> é aqui q é passado o Id do User  <<<<<<<<<<<<------------
                    .then(responseFromAPI => {
                        this.setState ({
                            listOfOwnPosts: responseFromAPI.data
                        })
                       // console.log(responseFromAPI)
                    })
    }

    componentDidMount() {
      this.getOwnPosts()  
    }

    render() {
        return (
            <div>
                <h1>My Personal details</h1>
                <hr></hr>
                <br></br>



                
                <h1>My Posts</h1>
                    {this.state.listOfOwnPosts.map(post=> {
                       // console.log(post)
                        return(
                            <div key={post._id}> 
                                <Card style={{ width: '28rem' }}>       
                                            <Card.Body>
                                            <Card.Title style={{color: "blue"}}> Posted By: {post.postedBy.username}</Card.Title> 
                                            </Card.Body>  

                                            <Card.Img variant="top" src={post.imageUrl} />

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

export default MyProfile;