import React, { Component } from "react";
 
// import the service file since we need it to send (and get) the data to(from) server
import axios from 'axios';

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from "react-bootstrap/FormControl";
 
class CreatePost extends Component {
    state = {
        title: "",
        description: "",
        imageUrl: "",
        feedbackMessage: "",
        chars_left: 100
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
                    this.props.history.push('/myprofile');   //-->>> Redirect to /myprofile
                })
            })
            
    }  
    
    handleWordCount = event => {
        const charCount = event.target.value.length;
        const maxChar = this.state.chars_left;
        const charLength = maxChar - charCount;
        this.setState({ chars_left: charLength });
      }

    render() {
        return (
          <div style={{marginTop:"200px"}}>
            <h2 style={{textAlign: "center", color:"blue"}}>New POST</h2>
            <Card>
                <Card.Body>
                  <form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicTitle" style={{color:"blue"}}>  
                        Title
                        <FormControl
                            type="text" 
                            name="title" 
                            value={ this.state.title } 
                            onChange={this.handleChange} >
                        </FormControl>
                    </Form.Group>
                        
                    <Form.Group controlId="formBasicTitle" style={{color:"blue"}}>        
                        Description
                        <FormControl
                            as="textarea" 
                            rows={10} maxLength='100' type='text' required onChange={this.handleWordCount}
                            name="description" 
                            value={ this.state.description } 
                            onChange={this.handleChange} >
                        </FormControl>
                    </Form.Group>
                        
                        <input type="file" onChange={this.handleFileChange} /> 
                        <Button variant="primary" type="submit">Submit post</Button>
                        
                 </form>
                    <div>{this.state.feedbackMessage}</div>
                </Card.Body>
            </Card>
           
          </div>
        );
    }
}

 
export default CreatePost;