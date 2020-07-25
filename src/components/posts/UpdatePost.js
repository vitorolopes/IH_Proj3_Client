import React, { Component } from 'react';
import axios from 'axios';
import EditPost from './EditPost'

//! CHANGE Project to Post
//! -------->>>>>>>>>>>>
class UpdatePost extends Component {
    state = {

    };

    componentDidMount(){
        this.getSinglePost();
    }
   
    getSinglePost = () => {
        const { params } = this.props.match;
        axios.get(`https://ih-proj3-be.herokuapp.com/api/posts/${params.id}`)
        .then( responseFromApi =>{
            const thePost = responseFromApi.data;
            this.setState(thePost);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
                                     
    renderEditForm = () => {
        // if(!this.state.title){
        //     this.getSinglePost();
        //   } else {
        //                                                    {...props} => so we can have 'this.props.history' in Edit.js
        //                                                                                          ^
        //                                                                                          |
        return <EditPost thePost={this.state} getThePost={this.getSinglePost} deleteThePost={this.deletePost} {...this.props} />
      }
    // }
 
 // DELETE POST:
    deletePost = () => {
        const { params } = this.props.match;
        console.log(this.props)
        console.log(params)
        axios.delete(`https://ih-proj3-be.herokuapp.com/api/deletepost/${params.id}`)
        .then( () =>{
            this.props.history.push('/myprofile');         
        })
        .catch((err)=>{
            console.log(err)
        })
    }


  render(){
    return (
    <div>
         <div>{this.renderEditForm()} </div>  

         {/* <button onClick={() => this.deletePost()}>Delete post</button>   */}
    </div>
)}}
export default UpdatePost