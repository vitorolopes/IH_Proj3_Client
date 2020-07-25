import React, { Component } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
// import Input from 'react-bootstrap/Input';
// import Label from 'react-bootstrap/Label';

class EditPost extends Component {
    state = {
        title: this.props.thePost.title, 
        description: this.props.thePost.description,
        char_left: 100
    }

  handleFormSubmit = (event) => {
    const {title, description} = this.state

    event.preventDefault();

    axios.put(`https://ih-proj3-be.herokuapp.com/api/updatepost/${this.props.thePost._id}`, 
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

  handleWordCount = event => {
    const charCount = event.target.value.length;
    const maxChar = this.state.chars_left;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
  }


  render(){
    return (
      <div>
        {/* <h3 style={{color:"red"}}>Add Update Photo Functionality</h3> */}
        {/* <h3 style={{color:"red"}}>Check if delete button is working after changes</h3> */}


               <Card >
                 <div className="editpostcardmaindiv">
                   <div>
                     <img src={this.props.thePost.imageUrl} className="editpostimg"></img>  
                   </div>
                    
                    <div>
                      <Card.Body>
                      <div className="editpostcardmaindiv">
                         <Card.Title style={{color: "blue"}}>Edit Post</Card.Title>
                           <form onSubmit={this.handleFormSubmit} style={{width:"18rem"}}>
                               <Form.Group controlId="formBasicTitle" style={{color:"blue"}}>
                                 New Title
                                 <Form.Control type="text" placeholder={this.props.thePost.title} name="title" value={this.state.title} onChange={ e => this.handleChange(e)} />
                               </Form.Group>

                               <Form.Group controlId="formBasicDescription" style={{color:"blue"}}>
                                 New Description
                                 <FormControl as="textarea" 
                                 rows={10} maxLength='100' type='text' required onChange={this.handleWordCount}
                                 placeholder={this.props.thePost.description} name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                               </Form.Group>

                               <Button variant="primary" type="submit"  block>
                                 Submit Changes
                               </Button> 
                             </form>
                        </div>  
                        <br></br>
                        {/* <button style={{backgroundColor:"red"}} onClick={() => this.deletePost()}>Delete post</button>    */}
                        <Button variant="primary" type="submit"  block onClick={() => this.props.deleteThePost()} style={{backgroundColor:"red"}}>
                                 Delete Post
                        </Button>   
                     </Card.Body>
                    </div>
                 </div>
                 </Card>
      </div>
    )
  }
}


export default EditPost;
