import React, { Component } from 'react'
import axios from 'axios'

class AddTask extends Component {
    state = {
        title: "",
        description: "",     
        isShowing: false   //             will help us to toggle add task form 
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const {title, description} = this.state
        const project  = this.props.theProject._id // <== we need to know to which project the created task belongs to, 
        // so we need to get its 'id'. It has to be the 'id' because we are referencing project 
        // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
        // { title, description, project } => this is 'req.body' that will be received on the server side in this route, 
        // so the names have to match
        axios.post("http://localhost:5000/api/tasks", {title, description, project})
            .then(() => {
                // after submitting the form, retrieve project one more time so the new task is displayed as well 
                //           |
            console.log(project)
            this.props.getTheProject()
            this.setState({title:"", description:""})
            }).catch((err) => {
                console.log(err)
            });
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({[name]:value})
    }
    
    toogleForm = () => {
        if(!this.state.isShowing) {
            this.setState({isShowing: true})
    }
        else {
            this.setState({isShowing: false})
        }
    }
    
    showAddTaskForm = () => {
        if(this.state.isShowing){
            return(
                <div>
                    <h3>Add Task</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Title:</label>
                        <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)} />
                        <label>Description:</label>
                        <textarea  name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                        <input type="submit" value="submit" />
                    </form>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                <hr/>
                <button onClick={()=> this.toogleForm()}>Show/Hide Add Task Form</button>
                {this.showAddTaskForm()}
            </div>
        )
    }
}
export default AddTask;
