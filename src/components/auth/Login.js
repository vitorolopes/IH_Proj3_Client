// auth/Login.js
import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.jpg';

import {toast} from 'react-toastify';    //! -------------->>>>>>>>>>>>>>> 
// https://medium.com/kirsten-werner/displaying-notifications-on-a-react-app-form-bfafe2d3b33e


class Login extends Component {
  constructor(props){
    super(props);
    // this.state = { username: '', password: '' };
    this.state = { username: '', password: ''};  
    this.service = new AuthService();
  }
                                                               //! -------------->>>>>>>>>>>>>>> Inicio
  validateLogin = () => {
    let errors = {}
    let formIsValid = true
  if (!this.state.username || !this.state.password) {
      errors.username = "You must provide a Username and a Password"
      toast.error(`${errors.username}`, {
        position: toast.POSITION.TOP_LEFT      });
      formIsValid = false
    }
  // if (!this.state.password || this.state.password.length < 5) {
  //     errors.password = `C'mon, your pass should be at least 4 chars!`
  //     toast.error(`${errors.password}`);
  //     formIsValid = false
  //   }
  // if (!this.state.email || this.state.email.length < 3) {
  //     errors.email_1 = 'Your email address has got to have at least 3 characters.'
  //     toast.error(`${errors.email_1}`);
  //     formIsValid = false
  //   }
  // let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  // if (!pattern.test(this.state.email)) {
  //     errors.email_2 = 'Email addresses need an @ and a .com'
  //     toast.error(`${errors.email_2}`);
  //     formIsValid = false
  //   }
  this.setState({
      errors: errors
    })
  }
                                                               //! -------------->>>>>>>>>>>>>>> Fim


  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.validateLogin()                                       //! -------------->>>>>>>>>>>>>>>
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
