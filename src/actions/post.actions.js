import { ADD_POST, 
        ADD_POST_ERROR,
        ADD_POST_LOADING,
        EDIT_POST,       
        EDIT_POST_ERROR,
        DELETE_POST,
        DELETE_POST_ERROR,
        FETCH_POSTS,     
        FETCH_POSTS_ERROR,
        FETCH_POSTS_LOADING,
      
    } from './types';
import axios from 'axios';
import { history } from '../index';

const url = 'https://5fb6896e36e2fa00166a5837.mockapi.io/api/data/blogdata';

export const createPost = (post) => {
     if (post.id) {
        const data = {
            ID: post.id,
            title: post.title,
            content: post.content,
            agegroup: post.agegroup,
                image: post.image,
                link: post.link,
                categories:post.categories,
        };

        return (dispatch) => {
            updatePost(dispatch, data);
        }

    } else {
        const data = {
            title: post.title,
            content: post.content,
            agegroup: post.agegroup,
        };
        let isLoading = true;

        return (dispatch) => {
            if (isLoading) {
                dispatch(createPostLoading(isLoading));
            }

            return axios.post(url, data)
                .then(response => {                
                    const id = response.data;

                    return axios.get(`${url}/${id}`).then(response => {
                        isLoading = false;
                        dispatch(createPostLoading(isLoading));     
                        dispatch(createPostSuccess(response.data));
                        history.push('/');
                    }).catch((error) => {
                        isLoading = false;
                        dispatch(createPostLoading(isLoading));     
                        // dispatch(createPostError(error));
                    });
                }).catch(error => { 
                    // dispatch(createPostError(error));
                });
        };
    }
};

export const createPostSuccess = (post) => {    
    return {
        type: ADD_POST,
        payload: {
            id: post.ID,
            title: post.title,
            agegroup:post.agegroup,
            content:post.content,
        }
    };
};

export const createPostError = (error) => {
    const errorPayload = {
        message: error.response.data.message,
        status: error.response.status,
    };

    return {
        type: ADD_POST_ERROR,
        payload: errorPayload,
    };
};

export const createPostLoading = (isLoading) => {
    return {
        type: ADD_POST_LOADING,
        payload: isLoading,
    };
};

export const updatePostError = (error) => {
    const errorPayload = {
        message: error.response.data.message ? error.response.data.message : error.response.data,
        status: error.response.status,
    };

    return {
        type: EDIT_POST_ERROR,
        payload: errorPayload,
    };
};

export const updatePostSuccess = (post) => {
    return {
        type: EDIT_POST,
        payload: {
            id: post.ID,
            title: post.title,
            agegroup:post.agegroup,
            content:post.content,
        },
    };
};

export const updatePost = (dispatch, data) => {
    const id = data.ID;
    console.log(data);
    return axios.put(`${url}/${id}`, data) 
        .then(response => {
            console.log(response.data);

            return axios.get(`${url}/${id}`).then(response => {
                    dispatch(updatePostSuccess(response.data));
                    history.push('/');
                }).catch(error => {
                    dispatch(updatePostError(error));
                })
        })
        .catch(error => {
            // dispatch(updatePostError(error));
        });
}

export const deletePost = (id) => {
    return (dispatch) => {
        return axios.delete(`${url}/${id}`).then(() => {
            dispatch(deletePostSuccess(id));
        }).catch(error => {
            dispatch(deletePostError(error));
        });
    }
};

export const deletePostSuccess = (id) => {
    return {
        type: DELETE_POST,
        payload: {
            id: id,
        },
    };
};

export const deletePostError = (error) => {
    const errorPayload = {
        message: error.response.data.message,
        status: error.response.status,        
    };

    return {
        type: DELETE_POST_ERROR,
        payload: errorPayload,
    }
};

export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS,
        payload: posts,
    };
};

const fetchAllPostsErrors = (error) => {
    const errorPayload = {
        message: error.response.data,
        status: error.response.status,        
    };

    return {
        type: FETCH_POSTS_ERROR,
        payload: errorPayload,
    };
};

const fetchAllPostsLoading = (isLoading) => {
    return {
        type: FETCH_POSTS_LOADING,
        payload: isLoading,
    };
};



export const fetchAllPosts = () => {
    let isLoading = true;    

    return async (dispatch) => {
        if (isLoading) {
            dispatch(fetchAllPostsLoading(isLoading));
        }

        try {
            const response = await axios.get(`${url}`);
            isLoading = false;
            dispatch(fetchAllPostsLoading(isLoading));
            const data = response.data;
            // console.log("Fetch all",response.data.id);
            dispatch(fetchPostsSuccess(data));
        } catch (error) {
            isLoading = false;
            dispatch(fetchAllPostsLoading(isLoading));
            dispatch(fetchAllPostsErrors(error));
        }
    };
};