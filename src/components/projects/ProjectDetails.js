// components/projects/ProjectDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import EditProject from './EditProject'; // ------------->>>>>>>>>>>>>> AA
import AddTask from '../tasks/AddTask'   // ------------->>>>>>>>>>>>>> CC

class ProjectDetails extends Component {
    state = {

    };
    
    componentDidMount(){
        this.getSingleProject();
    }
   
    getSingleProject = () => {
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/api/projects/${params.id}`)
        .then( responseFromApi =>{
            const theProject = responseFromApi.data;
            this.setState(theProject);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

                                            // ------------->>>>>>>>>>>>>> AA (COMEÇA)
    renderEditForm = () => {
        if(!this.state.title){
          this.getSingleProject();
        } else {
        //                                                    {...props} => so we can have 'this.props.history' in Edit.js
        //                                                                                          ^
        //                                                                                          |
          return <EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />
        }
      }
                                            // ------------->>>>>>>>>>>>>> AA (ACABA)


                                            // ------------->>>>>>>>>>>>>> BB (COMEÇA)
    // DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/projects/${params.id}`)
    .then( () =>{
        this.props.history.push('/projects');         
    })
    .catch((err)=>{
        console.log(err)
    })
  }
                                            // ------------->>>>>>>>>>>>>> BB (ACABA)


                                            // ------------->>>>>>>>>>>>>> CC (COMEÇA)
    renderAddTaskForm = () => {
        if(!this.state.title){
            this.getSingleProject()
            console.log("renderAddTaskForm IF")
        } else {
            // pass the project and method getSingleProject() as a props down to AddTask component
            console.log("renderAddTaskForm ELSE")
            return <AddTask theProject={this.state} getTheProject={this.getSingleProject}/>
        }
    }
                                            // ------------->>>>>>>>>>>>>> CC (ACABA)


  render(){
    return (
        <div>
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>

            {/* show the task heading only if there are tasks         ---->>>>>>>  CC    (COMEÇA)   */}
            {this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks</h3>}
                    {/* map through the array of tasks and... */}
            {this.state.tasks && this.state.tasks.map( (task, index) => {
                    return(
                        <div key = {index}>
                        {/* ... make each task's title a link that goes to the task details page */}
                                <Link to={`/tasks/${task._id}`}>
                                    {task.title}
                                </Link>
                        </div>
                    )
            }
            )}
            {/*                                                      ---->>>>>>>  CC    (ACABA)   */}

                                                    {/* ------------->>>>>>>>>>>>>>  AA   */}  
            <div>{this.renderEditForm()} </div>   
                                                    {/* ------------->>>>>>>>>>>>>>  BB   */} 
            <br/>
            <button onClick={() => this.deleteProject()}>Delete project</button>

            {/*                                                      ---->>>>>>>  CC    (COMEÇA)   */}
            <br/>
            <div>WTF</div>
            <div>{this.renderAddTaskForm()}</div>
            {console.log("In between WTF and Back to projects")}
            <br/><br/><br/><br/><br/>
            {/*                                                      ---->>>>>>>  CC    (ACABA)   */}

            <Link to={'/projects'}>Back to projects</Link>
      </div> 
    )
}
}
export default ProjectDetails;
