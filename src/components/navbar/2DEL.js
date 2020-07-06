// components/navbar/Navbar.js
...

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {}

  logoutUser = () =>{}

  render(){
    if(this.state.loggedInUser){
      return(
            <Link to='/projects'>Projects</Link>
            <Link to='/'><button onClick={() => this.logoutUser()}>Logout</button></Link>
      )
    } else {
      return ( 
            <li><Link to='/' >Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
      ) }}}

export default Navbar;


//!!  --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// components/auth/Login.js

...

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {}
    
  handleChange = (event) => {}
    
  render(){
    return(
 
      
          <label>Username:</label>
         
          <label>Password:</label>
  
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
    )}}


//!!  --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



// auth/Signup.js                                      
  render(){
    return(        
        <label>Username:</label>
        <label>Password:</label>
            <p>Already have account? 
                <Link to={"/"}> Login</Link>
            </p>
   )}


//!!  --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    render() {
        return(
            <div>
                <div style= {{width:'60%', float:'left'}}>
                    {this.state.listOfProjects.map(project=> {
                        return(
                            <div key={project._id}> 
                                {/* go to /projects/123456 */}
                                <Link to={ `/projects/${project._id}`} >
                                     <h3>{project.title}</h3>
                                </Link>
                                {/* SNIPPET INSERIDO PARA LISTAR AS "TASKS" POR BAIXO DE CADA PROJETO    (COMEÇA) */}
                               {/* <ListTasks eachTask = {this.getEachTask(project)} /> */}
                                 {this.getEachTask(project)}
                                 <h3>{this.tarefa}</h3> 
                                 {console.log(this.tarefa)}
                                {/* SNIPPET INSERIDO PARA LISTAR AS "TASKS" POR BAIXO DE CADA PROJETO    (ACABA) */}
                            </div>
                        )
                    })}
                </div>
                <div style= {{width:'40%', float:'right'}}>
                    {/* <AddProject /> */}
                    <AddProject refreshProjects={this.getAllProjects} />
                </div>
            </div>
        )
    }
}


//!!  --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// components/projects/ProjectDetails.js
   
    getSingleProject = () => {
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/api/projects/${params.id}`)
        .then( responseFromApi =>{
            const theProject = responseFromApi.data;
            this.setState(theProject);
        }) 

    renderEditForm = () => {                                                                           
            return <EditProject />
    }                                   
    // DELETE PROJECT:
    deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/projects/${params.id}`)


   renderAddTaskForm = () => {
             return <AddTask/>
    }
                                         
  render(){
    return (
     
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>

            {... && this.state.tasks.map( (task, index) => {
                    return(
                                <Link to={`/tasks/${task._id}`}>
                                    {task.title}
                                </Link>
                    )})}
                                                                                             
            <div>{this.renderEditForm()} </div>   
            
            <button onClick={() => this.deleteProject()}>Delete project</button>             
        
            <div>{this.renderAddTaskForm()}</div>
            
            <Link to={'/projects'}>Back to projects</Link>
      
    )
}


//!!  --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// UPDATE/EDIT PROJECT:
// components/projects/EditProject.js

   axios.put(`http://localhost:5000/api/projects/${this.props.theProject._id}`, { title, description })

  render(){
    return (
      
        <h3>Edit form</h3>
          <label>Title:</label>
          <label>Description:</label>
    )}}


//!!  --------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    axios.post("http://localhost:5000/api/tasks", {title, description, project})

    showAddTaskForm = () => {

                    <h3>Add Task</h3>
                    <label>Title:</label>
                    <label>Description:</label>       
            )}}

    render() {
        return(
            <div>
                <hr/>
                {this.showAddTaskForm()}
        )}}


