// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Link } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.jpg';
import axios from 'axios';

// how to deal with Bootstrap Forms and the properties of regular HTML forms
// https://stackoverflow.com/questions/37239799/can-not-submit-form-react-bootstrap

class Signup extends Component { 
  constructor(props) {
      super(props)
      this.state = { username: '', password: '', email:''};
      this.service = new AuthService();
  }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

    handleFileChange = (event) => {
      console.log('image',  event.target.files[0]);
        this.setState({ userimage: event.target.files[0]});
      }
  
    handleFormSubmit = (event) => {  
        event.preventDefault();      
        const {username, password, email, userimage} = this.state
       console.log('will submit image', userimage)
        this.service.signup(username, password, email)
        .then( response => {
            this.setState({
                username: '', 
                password: '',
                email:'', 
            });
            this.props.getUser(response)
            localStorage.setItem("loggedin", true);
        })
        .catch( error => console.log(error) )
    }


    // handleFormSubmit = (event) => {  
    //   event.preventDefault();   
    //   const uploadData = new FormData();
    //   uploadData.append("userimage", this.state.userimage);
    //   const {username, password, email} = this.state

    //   axios.post('http://localhost:5000/api/upload', uploadData)
    //   .then((response) => {
    //       console.log('image uploaded', response);
          
    //       axios.post('http://localhost:5000/api/signup', {
    //           username: this.state.username,
    //           password: this.state.password,
    //           email: this.state.email,
    //           userimage: response.data.userimage
    //           })  
    //          this.service.signup(username, password, email, userimage)
    //           .then( response => {
    //                         this.setState({
    //                             username: '', 
    //                             password: '',
    //                             email:'', 
    //                             userimage:'' 
    //                         });
    //                         this.props.getUser(response)
    //                         localStorage.setItem("loggedin", true);
    //                     })
    //                     .catch( error => console.log(error) )
    //         })
    // }
                                             
  render(){
    return(

        <Card style={{ width: '28rem' }}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Travelgram</Card.Title>
                    <form onSubmit={this.handleFormSubmit}>
                          <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={ e => this.handleChange(e)} />
                          </Form.Group>

                          <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
                          </Form.Group>

                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
                          </Form.Group>

                          {/* <Button style={{color:"red"}} variant="primary" type="submit">
                            Upload photo
                          </Button>  */}

                {/* <input type="file" onChange={this.handleFileChange} />  */}
                {/* <button type="submit">Save new image</button> */}
                      
                          <hr></hr>

                          <Button variant="primary" type="submit">
                            Signup
                          </Button> 
                    </form>
              </Card.Body>
              
              <p>Already have account? 
                   <Nav.Link as={Link} to="/">Login</Nav.Link>
              </p>

        </Card>
    )
  }
}

export default Signup;
