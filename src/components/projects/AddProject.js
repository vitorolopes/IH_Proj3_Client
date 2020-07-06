import React, {Component} from 'react'
import axios from 'axios'


class AddProject extends Component {
    state = {
        title:'',
        description: ''
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const title = this.state.title
        const description = this.state.description
        axios.post('http://localhost:5000/api/projects', {title, description})
         .then(() => {
                // 1. Lift the state up and push the new project into the state that lives on ProjectList
                // 2. 
                this.props.refreshProjects()
                this.setState ({
                   title:'',
                   description:''
                })
        })
    }

    handleChange=(event) => {
        const {name,value} = event.target
        this.setState({[name]: value})
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title</label>
                    <input type='text' name='title' value={this.state.title} onChange= {this.handleChange}></input>
                    <label>Description</label>
                    <input type='text' name='description' value={this.state.description} onChange= {this.handleChange}></input>
                    <input type='submit' value="Submit" />
                </form>
            </div>
        )
    }
}

export default AddProject