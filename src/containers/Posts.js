import React, { Component } from 'react';
import Post from '../components/Post';
import { Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { deletePost } from '../actions/post.actions';
import './Posts.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
let loggedin=true;
class Posts extends Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        const tokendata = localStorage.getItem("token"); 
        console.log(tokendata);
        if(tokendata===null){
            loggedin = false;
        }
    }
    

    handleEdit(post) {
        this.props.onEdit(post);        
    }

    render() {      
        if (this.props.isLoading) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Data is loading...</span>
          </div>)
        } else if (this.props.errors) {
            return (<div className="alert alert-danger">{this.props.errors}</div>)
        }
        else if(!loggedin){
            alert("Unauthorised Access, Please Login and retry");
            return <Redirect to="/login" />
        }
         else {
            return (            
                <div>
                    <div className="btn-container clearfix">
                        <Link to="/create" className="btn btn-create btn-primary">Add New</Link>
                        <Link to="/" className="btn btn-create btn-primary" onClick={()=>(localStorage.removeItem("token"))}>Logout</Link>
                    </div>
                    
                            {
                                this.props.posts.map((post) => {
                                    return (
                                        
                                        <Post key={post.id} 
                                            post={post} 
                                            onEdit={this.handleEdit}
                                            onDelete={this.props.onDelete}
                                        />
                                    );
                                })
                                
                            }    
                     
                </div>
            );
        }    
    }
}

const mapStateToProps = state => {
    let status = '';
    let message = '';

    if (state.postsData.errors) {
        status = state.postsData.errors.status;
        
        switch (status) {
            case 404:
                message+= '404 Not found.';
                break;
            case 500: 
                message += '500 Server Error.';
                break;
            default:
                message += 'Error';
        }
    } else {

    }


    return {
        errors: message ? message: null,
        posts: state.postsData.posts,
        isLoading: state.postsData.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => {
            dispatch(deletePost(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Posts);