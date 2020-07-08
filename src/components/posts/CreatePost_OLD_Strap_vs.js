import React, {Component} from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePost extends Component {
    state = {
        title:'',
        description: ''
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const title = this.state.title
        const description = this.state.description
        const photo = this.state.photo

        axios.post('http://localhost:5000/api/createpost', {title, description, photo})
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
            // <div>
            //     <h1>Lets CREATE a POST</h1>
            //     <form onSubmit={this.handleFormSubmit}>
            //         <label>Title</label>
            //         <input type='text' name='title' value={this.state.title} onChange= {this.handleChange}></input>
            //         <label>Description</label>
            //         <input type='text' name='description' value={this.state.description} onChange= {this.handleChange}></input>
                  
            //         <label> Photo Upload</label>
            //         <input type='text' name='photo' value={this.state.photo} onChange= {this.handleChange}></input>

            //         <input type='submit' value="Submit" />

            //     </form>
            // </div>
            
            <Card style={{ width: '28rem' }}>                                                  
                        <h1 style= {{ color: "blue"}}>Lets CREATE a POST</h1>      
    
                    <form onSubmit={this.handleFormSubmit}>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="title" name='title' value={this.state.title} onChange= {this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" name='description' value={this.state.description} onChange= {this.handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Example file input" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                                            Submit Post
                        </Button> 
                        
                    </form>

            </Card>


        )
    }
}

export default CreatePost