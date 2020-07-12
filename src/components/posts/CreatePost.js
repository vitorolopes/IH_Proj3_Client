import React, { Component } from "react";
 
// import the service file since we need it to send (and get) the data to(from) server
import axios from 'axios';

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
 
class CreatePost extends Component {
    state = {
        title: "",
        description: "",
        imageUrl: "",
        feedbackMessage: ""
    };
    
    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    handleFileChange = (event) => {
        this.setState({ imageUrl: event.target.files[0]});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append("imageUrl", this.state.imageUrl);
        axios.post('http://localhost:5000/api/upload', uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                axios.post('http://localhost:5000/api/createpost', {
                    title: this.state.title,
                    description: this.state.description,
                    imageUrl: response.data.imageUrl
                }, {withCredentials: true})  //  -------->>>>>>>>>>>>> é aqui q é passado o Id do User  <<<<<<<<<<<<------------
                .then((response) => {
                    console.log('image created', response);
                    this.setState({ title: '', description: '', imageUrl: '', feedbackMessage: 'Image uploaded sucessfully'});
                })
            })
            
    }  
    
    render() {
        return (
          <div>
            <h2>New POST</h2>
            <form onSubmit={this.handleSubmit}>
                <label>Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={ this.state.title } 
                    onChange={this.handleChange} />

                <label>Description</label>
                <textarea 
                    type="text" 
                    name="description" 
                    value={ this.state.description } 
                    onChange={this.handleChange} />

                <input type="file" onChange={this.handleFileChange} /> 
                <button type="submit">Submit post</button>
                
            </form>
            <div>{this.state.feedbackMessage}</div>
          </div>
        );
    }
}

// render () {
//     return (
        
//         <Card style={{ width: '28rem' }}>                                                  
//                     <h1 style= {{ color: "blue"}}>Lets CREATE a POST</h1>      

//                 <form onSubmit={this.handleFormSubmit}>

//                     <Form.Group controlId="exampleForm.ControlInput1">
//                         <Form.Label>Title</Form.Label>
//                         <Form.Control type="text" placeholder="title" name='title' value={this.state.title} onChange= {this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="exampleForm.ControlTextarea1">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control as="textarea" rows="3" name='description' value={this.state.description} onChange= {this.handleChange} />
//                     </Form.Group>

//                      <Form.Group>
//                         <Form.File id="exampleFormControlFile1" label="Example file input" onChange= {this.handleFileChange} /> 
//                     </Form.Group>   

//                     <Button variant="primary" type="submit">
//                                         Submit Post
//                     </Button>
//                 </form>
//         </Card>


//     )
// }
// }
 
export default CreatePost;