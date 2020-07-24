// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './Auth-service';
import { Link } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.jpg';
import axios from 'axios';

import {toast} from 'react-toastify';    //! -------------->>>>>>>>>>>>>>> 

// how to deal with Bootstrap Forms and the properties of regular HTML forms
// https://stackoverflow.com/questions/37239799/can-not-submit-form-react-bootstrap

class Signup extends Component { 
  constructor(props) {
      super(props)
      this.state = { username: '', password: '', email:''};
      this.service = new AuthService();
  }

                                    //! -------------->>>>>>>>>>>>>>> Inicio
  validateSignup = () => {
    let errors = {}
    let formIsValid = true
  // if (!this.state.username) {
  //     errors.username = "You must provide a username"
  //     toast.error(`${errors.username}`, {
  //       position: toast.POSITION.TOP_LEFT      });
  //     formIsValid = false
  //   }
  // if (!this.state.password || this.state.password.length < 5) {
  //     errors.password = `You must provide a password at least 5 characters long!`
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
  //     errors.email_2 = 'Please provide a valid Email addresses need an @ and a .com'
  //     toast.error(`${errors.email_2}`);
  //     formIsValid = false
  //   }
  this.setState({
      errors: errors
    })
  }
                                    //! -------------->>>>>>>>>>>>>>> Fim



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
        this.validateSignup()                                       //! -------------->>>>>>>>>>>>>>>
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
        .catch( error => toast(`${error}`))  // modifiquei este catch error para o toastify ir buscar as msgs do BE
    }

  
                                             
  render(){
    return(
     
      <div className='main-container' >
         <img src={logo}  style={{maxHeight:'30rem'}}/>
     

        {/* <Card className="card" style={{ width: '38rem' }}> */}
           <div className="main-rightcontainer">           
               <div className="signup-rightdiv">
                 
                   <Card style={{ width: '24rem' }}>
                    
                          <Card.Body>
                             <div className="signup-rightupdiv">
                            <Card.Title style={{color: "blue"}}>Travelgram</Card.Title>
                                <form onSubmit={this.handleFormSubmit} style={{width:"18rem"}}>
                                      <Form.Group controlId="formBasicUsername">
                                        <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={ e => this.handleChange(e)} />
                                      </Form.Group>

                                      <Form.Group controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
                                      </Form.Group>

                                      <Form.Group controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
                                      </Form.Group>

                                      <Button variant="primary" type="submit"  block>
                                        Signup
                                      </Button> 
                                </form>
                             </div>      
                          </Card.Body>
                    </Card>
                 

                      <br></br>
                  
                  
                      <Card style={{ width: '24rem' }}>
                        <div className="signup-rightdowndiv">
                          <p style={{marginBottom:"1px"}}>Already have an account? </p>
                          <Nav.Link as={Link} to="/">Login</Nav.Link>
                        </div> 
                      </Card> 
                  
                 
                </div>
                  
            </div> 
        {/* </Card> */}
     </div>
    )
  }
}

export default Signup;
