import React, { Component } from 'react';
import HomePost from '../components/HomePost';
import { connect } from 'react-redux';
import './Posts.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
    }

   
    render() {      
        if (this.props.isLoading) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Data is loading...</span>
          </div>)
        } else if (this.props.errors) {
            return (<div className="alert alert-danger">{this.props.errors}</div>)
        } else {
            return (            
                <div>
                    
                    
                            {
                                this.props.posts.map((post) => {
                                    return (
                                        <HomePost key={post.id} 
                                            post={post} 
                                            
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



export default connect(mapStateToProps) (Home);