// navbar/Navbar.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/Auth-service';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// changes made in Bootstrap's Nav.Link
// https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together


class Navigationbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }

  render(){
    if(this.state.loggedInUser){
      return(
        <nav >
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li><Link to='/projects' style={{ textDecoration: 'none' }}>Projects</Link></li>
            <li>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
      )
    } else {
      return ( 
        // <nav >
        //   <ul>
        //     <li><Link to='/' style={{ textDecoration: 'none' }}>Login</Link></li>
        //     <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
        //   </ul>
        // </nav>

       <Container>
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Travelgram</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link> 
              <Nav.Link as={Link} to="/">Login</Nav.Link>
            </Nav>
          </Navbar>
      </Container> 
       
      )
    }
  }
}

export default Navigationbar;
