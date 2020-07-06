// auth/Login.js
import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Link } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
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
        this.setState({ username: "", password: "" });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      // <div>
      //   <form onSubmit={this.handleFormSubmit}>
      //     <label>Username:</label>
      //     <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
      //     <label>Password:</label>
      //     <input name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
      //     <input type="submit" value="Login" />
      //   </form>
      //   <p>Don't have account? 
      //       <Link to={"/signup"}> Signup</Link>
      //   </p>
      // </div>

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
              </Card.Body>
              
              <p>Don't have account? 
                   <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </p>

        </Card>



    )
  }
}

export default Login;
