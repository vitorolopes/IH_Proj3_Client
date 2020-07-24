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

import GoogleLogo from '../../GoogleLogo.png'


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
  // if (!this.state.username || !this.state.password) {
  //     errors.username = "You must provide a valid Username and Password"
  //     toast.error(`${errors.username}`, {
  //       position: toast.POSITION.TOP_LEFT      });
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
    .catch( error => toast(`${error}`))  // modifiquei este catch error para o toastify ir buscar as msgs do BE
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(

      // <Card style={{ width: '28rem' }}>
      //         <Card.Img variant="top" src={logo} />
      //         <Card.Body>
      //           <Card.Title>Travelgram</Card.Title>
      //               <form onSubmit={this.handleFormSubmit}>
      //                     <Form.Group controlId="formBasicUsername">
      //                       <Form.Label>Username</Form.Label>
      //                       <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={ e => this.handleChange(e)} />
      //                     </Form.Group>

      //                     <Form.Group controlId="formBasicPassword">
      //                       <Form.Label>Password</Form.Label>
      //                       <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
      //                     </Form.Group>
                      
      //                     <hr></hr>

      //                     <Button variant="primary" type="submit">
      //                       Login
      //                     </Button> 
      //               </form>

      //               <br></br>

                 
      //         <Link to="/login-google" style={{color: "red"}}>Login using Google</Link>
                    
 

      //         </Card.Body>  
      //         <p>Don't have account? 
      //              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
      //         </p>
      //   </Card>
      

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

                                      <Button variant="primary" type="submit"  block>
                                        Login
                                      </Button> 
                                </form>
                             </div>      
                          </Card.Body>
                    </Card>
                  
                      {/* <Button style={{color: "red", marginTop:"10px", backgroundImage: `url(${GoogleLogo})`}}> NÃO APAGAR*/}
                      <Button style={{marginTop:"20px"}}>
                        <Link to="/login-google" style={{color: "white"}}>  <img className="google-img" src={GoogleLogo}></img>  Login with Google</Link>
                      </Button>
                        

                      <br></br>
                  
                  
                      <Card style={{ width: '24rem' }}>
                        <div className="signup-rightdowndiv">
                          <p style={{marginBottom:"1px"}}>Don't have an account? </p>
                          <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </div> 
                      </Card> 
                  
                 
                </div>
                  
            </div> 
        {/* </Card> */}
     </div>
    )
  }
}

export default Login;
