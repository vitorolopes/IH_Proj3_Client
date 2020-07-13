import React, { Component } from 'react';


import axios from 'axios';
import Card from 'react-bootstrap/Card';

class UpdateProfile extends Component {
    constructor(props){
        super(props);
        this.state = { 
          loggedInUser: this.props.userInSession,
          file: "",
          feedbackMessage: ""
        };
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
                
                axios.post('http://localhost:5000/api/updateprofile', {  // -->>>> MUDAR ISTO PARA  updateuser
                   // name: this.state.name,
                   // description: this.state.description,
                    userimage: response.data.imageUrl
                },{withCredentials: true})   //  -------->>>>>>>>>>>>> é aqui q é passado o Id do User  <<<<<<<<<<<<------------
                .then((response) => {
                    console.log('image created', response);
                    this.setState({ file: '', feedbackMessage: 'Image uploaded sucessfully'});
                })
            })
    }  

    render () {
    return(
        <div>
            <h1>Lets update your profile</h1>
            <h2>New Image</h2>
            <form onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleFileChange} /> 
                <button type="submit">Save new image</button>
            </form>
            <div>{this.state.feedbackMessage}</div>
        </div>
            

    )
  }   
}

export default UpdateProfile  
