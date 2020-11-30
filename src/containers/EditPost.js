import React, { Component } from 'react';
import { createPost } from '../actions/post.actions';
import { connect } from 'react-redux';
import { BrowserRouter as  Link } from "react-router-dom";
import './CreatePost.css';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.post.id,
            title: props.post.title,
            content: props.post.content,
            categories: props.post.categories,
            link: props.post.link,
            image: props.post.image,
            agegroup: props.post.agegroup,
            errors: null,
        }; 
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state,);
        this.handleReset(e);        
    }

    handleValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({
            id: this.state.id,
            title: '',
            content: '',
            categories: this.state.categories,
            link: this.state.link,
            image: this.state.image,
            agegroup: '',
            errors: null,
        });
    }

    componentWillMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.post) {
            const post = this.props.location.state.post;

            this.setState({
                id: post.id,
                title: post.title,
                content: post.content,
                agegroup: post.agegroup,
                image: post.image,
                link: post.link,
                categories:post.categories,
                errors: null,
            });    
        }         
    }

    render() {
        return (
            <div>
              
                {this.props.errors && this.props.errors.message ? <div className="alert alert-danger">{this.props.errors.message}</div> : ''}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text" 
                                name="title"
                                className="form-control"    
                                placeholder={this.state.title}   
                                value={this.state.title}    
                                onChange={this.handleValueChange.bind(this)}                                           
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" 
                                name="content"
                                className="form-control"    
                                placeholder={this.state.content}
                                value={this.state.content}  
                                onChange={this.handleValueChange.bind(this)}                     
                        />
                    </div>
                    <div className="form-group">
                        <input type="number" 
                                name="agegroup"
                                className="form-control"   
                                placeholder={this.state.agegroup}
                                value={this.state.agegroup}  
                                onChange={this.handleValueChange.bind(this)}                       
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" 
                                className="btn btn-success">
                                {this.state.id ? 'Update': 'Add'}  
                        </button>
                        <button type="button" 
                                className="btn btn-default" 
                                onClick={this.handleReset.bind(this)}>Clear</button>
                    </div>                
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {        
    return {
        errors: state.postsData.errors,
        posts: state.postsData.posts,
        isLoading: state.postsData.isLoading,
    }
};


const mapDispatchToProps = dispatch => {
    return {
      onAdd: (post) => {
        dispatch(createPost(post));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);