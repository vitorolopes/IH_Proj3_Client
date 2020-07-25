// auth/Auth-service.js
import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      // baseURL: 'http://localhost:5000/api',
      baseURL: 'https://ih-proj3-be.herokuapp.com/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password, email, userimage) => {
  return this.service.post('/signup', {username, password, email, userimage})
  .then(response => response.data)
  .catch(error=> {   // adicionei este catch error para o toastify ir buscar as msgs do BE
    return Promise.reject(error.response.data.message)
  })
  }
  
  loggedin = () => {
  return this.service.get('/loggedin')
  .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
    .catch(error=> {   // adicionei este catch error para o toastify ir buscar as msgs do BE
      return Promise.reject(error.response.data.message)
    })
  }

  logout = () => {
    return this.service.post('/logout')
    .then(response => response.data)
  }
}
export default AuthService;
