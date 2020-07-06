// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Link } from 'react-router-dom'; // ------->>>>>>>>>>
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.jpg';

// how to deal with Bootstrap Forms and the properties of regular HTML forms
// https://stackoverflow.com/questions/37239799/can-not-submit-form-react-bootstrap

class Signup extends Component { // NOTE: IN THE PLATFORM THERE WAS A CONSTRUCTOR HERE, I REMOVED IT
  constructor(props) {
      super(props)
      // this.state = { username: '', password: '' };
      this.state = { username: '', password: '', email:'', userimage:'' };
      this.service = new AuthService();
  }
    
  
    handleFormSubmit = (event) => {  
        event.preventDefault();
        // const username = this.state.username;
        // const password = this.state.password;
        const {username, password, email, userimage} = this.state
       
        this.service.signup(username, password)
        .then( response => {
            this.setState({
                username: "", 
                password: "",
                email:'', 
                userimage:'' 
            });
            //  Added/Uncommented this line when we introduced state in App.js
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
        //     <form onSubmit={this.handleFormSubmit}>
        //         <label>Username:</label>
        //         <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
                
        //         <label>Password:</label>
        //         <input type="text" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

        //         <label>email:</label>
        //         <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)} />
                
        //         <input type="submit" value="Signup" />
        //     </form>
    
        //     <button>Upload Image</button>

        //     <p>Already have account? 
        //         <Link to={"/"}> Login</Link>
        //     </p>
        // </div>

        //! ------------------------->>>>>>>>>>>>>>>>>>>>>>
      
        //  <form onSubmit={this.handleFormSubmit}>
        //           <Form.Group controlId="formBasicUsername">
        //             <Form.Label>Username</Form.Label>
        //             <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={ e => this.handleChange(e)} />
        //           </Form.Group>

        //           <Form.Group controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
        //           </Form.Group>

        //           <Form.Group controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
        //           </Form.Group>

        //           <Button variant="primary" type="submit">
        //             Upload photo
        //           </Button> 
              
        //           <hr></hr>

        //           <Button variant="primary" type="submit">
        //             Signup
        //           </Button> 
        // </form>


         //! ------------------------->>>>>>>>>>>>>>>>>>>>>>


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

                          <Button variant="primary" type="submit">
                            Upload photo
                          </Button> 
                      
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
