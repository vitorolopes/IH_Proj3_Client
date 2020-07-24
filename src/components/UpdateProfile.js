import React, { Component } from 'react';


import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateProfile extends Component {
    constructor(props){
        super(props);
        this.state = { 
          loggedInUser: this.props.userInSession,
          file: "",
          feedbackMessage: "",
          username: "",
          email: ""
        };
      }

      handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

      handleSubmit = (event) => {
        event.preventDefault();
        const {username, email} = this.state;
        const uploadData = new FormData();
        uploadData.append("imageUrl", this.state.file);
        console.log(this.state.file)
        axios.post('http://localhost:5000/api/upload', uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                axios.post('http://localhost:5000/api/updateprofile', {  // -->>>> MUDAR ISTO PARA  updateuser
                   username: this.state.username,
                   email: this.state.email,
                   userimage: response.data.imageUrl
                },{withCredentials: true})   //  -------->>>>>>>>>>>>> é aqui q é passado o Id do User  <<<<<<<<<<<<------------
                .then((response) => {
                    console.log('image created', response);
                    this.setState({ file: '', feedbackMessage: 'Image uploaded sucessfully'});
                    this.setState({ state: this.state });
                    this.props.history.push('/myprofile',{detail: 'this.state'});   //-->>> Redirect to /myprofile 
                    //! Wednesday added ,{detail: 'this.state'}
                })
            })
    }  

    
    handleChange(event) {  
        let {name, value} = event.target
        this.setState({[name]: value});
      }

    //! UPDATING /myprofile without having to reload the page
    //   forceUpdateHandler(){
    //     // this.forceUpdate();
    //     this.setState({ state: this.state });
    //   };



    render () {
    return(
        <div className="updateprofile">
            <h1>Update profile</h1>
            {/* <h1 style={{color:"red"}}> Render UPDATED user details without having to reload</h1>
            <h1 style={{color:"red"}}> Form VALIDATION</h1> */}
            {/* <Card style={{color:"12a0af", border: '1px solid #12a0af'}}> */}
            <Card className='cardupdateprofile' style={{border: '1px solid #12a0af'}} >
               <Card.Body>
        
                  <form onSubmit={this.handleSubmit} className='updateprofileform'>
                          <Form.Group controlId="formBasicUsername" style={{width: "80%"}}>
                              <Form.Control type="text" 
                              placeholder="Username" 
                              name="username" value={this.state.username}
                              onChange={ e => this.handleChange(e)} />
                          </Form.Group>
                  

                          <Form.Group controlId="formBasicPassword" style={{width: "80%"}}>
                              <Form.Control type="text" 
                              placeholder="Email" 
                              name="email" value={this.state.email} 
                              onChange={ e => this.handleChange(e)} />
                          </Form.Group>
                      <input type="file" onChange={this.handleFileChange} style={{padding: "10px"}} /> 
                      
                      <Button variant="danger" type="submit" block style={{margin: "10px"}}>
                                      Submit Changes
                      </Button> 
                  </form>
                  <div>{this.state.feedbackMessage}</div>
                </Card.Body>
            </Card> 
        </div>
    )
  }   
}

export default UpdateProfile  


