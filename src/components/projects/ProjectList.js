import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
// import ListTasks from '../tasks/ListTasks'

class ProjectList extends Component {
    state = {
        listOfProjects: []
    }

    getAllProjects = () => {
         // Get list of projects from the API we just built
        axios.get("http://localhost:5000/api/projects")
                    .then(responseFromAPI => {
          //  debugger;
                        this.setState ({
                            listOfProjects: responseFromAPI.data
                        })
                        
                        // this.setState({countries: response.data})
                        console.log(responseFromAPI)
                    })
    }

    componentDidMount() {
      this.getAllProjects()  
    }

    //  SNIPPET INSERIDO PARA LISTAR AS "TASKS" POR BAIXO DE CADA PROJETO    (COMEÇA)
    getEachTask = (project) => {
        let tarefa, descricao
        (project.tasks.map(task=>{
            return(
            (axios.get(`http://localhost:5000/api/tasks/${task}`))
            .then(respostaDaAPI =>{
                                            //  <h3>{responseFromAPI.title}</h3>
            // {console.log(respostaDaAPI)}
            tarefa = respostaDaAPI.data.title
            descricao = respostaDaAPI.data.description
            console.log(tarefa)
            console.log(descricao)
            return(tarefa)
            })    
            )
           
        }))
    }
    // SNIPPET INSERIDO PARA LISTAR AS "TASKS" POR BAIXO DE CADA PROJETO    (COMEÇA) 

    // componentDidMount() {
    //           this.getEachTask()  
    //         }
        

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
export default ProjectList;