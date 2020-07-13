import React, { Component } from 'react';


import axios from 'axios';
import Card from 'react-bootstrap/Card';

class UpdateProfile extends Component {
    constructor(props){
        super(props);
        this.state = { 
          title: "",
          description:"",
          loggedInUser: this.props.userInSession,
          file: "",
          feedbackMessage: ""
        };
      }


    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const uploadData = new FormData();
        uploadData.append("imageUrl", this.state.file);
        console.log(this.state.file)
        axios.post('http://localhost:5000/api/upload', uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                axios.put(`http://localhost:5000/api/updatepost/:id`, {
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

    render () {
    return(
        <div>
            <h1>Lets UPDATE that POST profile</h1>
            <h2>New POST Image</h2>

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



            <form onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleFileChange} /> 
                <button type="submit">Save new POST image</button>
            </form>
            <div>{this.state.feedbackMessage}</div>
        </div>
            

    )
  }   
}

export default UpdateProfile  
