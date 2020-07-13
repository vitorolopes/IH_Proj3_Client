import React, { Component } from 'react';
import axios from 'axios';

class EditPost extends Component {
    state = {
        title: this.props.thePost.title, 
        description: this.props.thePost.description
    }

  handleFormSubmit = (event) => {
    const {title, description} = this.state

    event.preventDefault();

    axios.put(`http://localhost:5000/api/updatepost/${this.props.thePost._id}`, 
                  { title, description })
    .then( () => {
         this.props.getThePost();
        // after submitting the form, redirect to '/projects'
         this.props.history.push('/myprofile');    
    })
    .catch( error => console.log(error) )
  }


handleChange(event) {  
    let {name, value} = event.target
    this.setState({[name]: value});
  }


  render(){
    return (
      <div>
        <hr />
        <h3>Edit Post</h3>
        <h5 style={{color:"blue"}}>Current title: {this.props.thePost.title}</h5>
        <h5 style={{color:"blue"}}>Current description: {this.props.thePost.description}</h5>
        <h5 style={{color:"blue"}}>Current Photo</h5>
        <img src={this.props.thePost.imageUrl}></img>
        <h3 style={{color:"red"}}>Style Post Details: Photo, Title, Description</h3>
        <h3 style={{color:"red"}}>Add Update Photo Functionality</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>New Title:</label>
          <input type="text" name="title" 
               value={this.state.title} onChange={(e) => this.handleChange(e)}/>
          <label>New Description:</label>
          <textarea name="description" 
                value={this.state.description} onChange={(e) => this.handleChange(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EditPost;
