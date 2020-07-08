import React, { Component } from "react";
 
// import the service file since we need it to send (and get) the data to(from) server
import axios from 'axios';
 
class CreatePost extends Component {
    state = {
        title: "",
        description: "",
        photo: "",
        feedbackMessage: ""
    };
    
    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    handleFileChange = (event) => {
        this.setState({ photo: event.target.files[0]});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append("imageUrl", this.state.photo);
        axios.post('http://localhost:5000/api/upload', uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                axios.post('http://localhost:5000/api/images/create', {
                    name: this.state.title,
                    description: this.state.description,
                    imageUrl: response.data.imageUrl
                })
                .then((response) => {
                    console.log('image created', response);
                    this.setState({ title: '', description: '', photo: '', feedbackMessage: 'Image uploaded sucessfully'});
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
                <button type="submit">Save new image</button>
            </form>
            <div>{this.state.feedbackMessage}</div>
          </div>
        );
    }
}
 
export default CreatePost;