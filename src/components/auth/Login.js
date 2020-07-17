// auth/Login.js
import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.jpg';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
       //Set the whole application with the user that just logged in
        this.props.getUser(response);
        this.setState({ username: "", password: "" });
        // this.props.getUser(response)
        localStorage.setItem("loggedin", true);
        this.props.history.push('/projects');
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
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
                      
                          <hr></hr>

                          <Button variant="primary" type="submit">
                            Login
                          </Button> 
                    </form>

                    <br></br>

                 
              <Link to="/login-google" style={{color: "red"}}>Login using Google</Link>
                    
 

              </Card.Body>  
              <p>Don't have account? 
                   <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </p>
        </Card>
    )
  }
}

export default Login;
