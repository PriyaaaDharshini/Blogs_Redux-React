import { ADD_POST, 
    ADD_POST_ERROR,
    ADD_POST_LOADING,
    EDIT_POST,       
    EDIT_POST_ERROR,
    EDIT_POST_LOADING,  
    DELETE_POST,
    DELETE_POST_ERROR,
    DELETE_POST_LOADING,
    FETCH_POSTS,     
    FETCH_POSTS_ERROR,
    FETCH_POSTS_LOADING
        } from '../actions/types';

const defaultState = {
    posts: [],
    errors: null,
    isLoading: true,
};

const postReducer = (state = defaultState, action) => {    
    switch(action.type) {
        case ADD_POST:            
            return { ...state, errors: null, posts: [ ...state.posts, action.payload ]};
        case ADD_POST_ERROR:
            return { ...state, errors: action.payload };            
        case EDIT_POST:            
            const updatedPosts = state.posts.filter(post => post.id != action.payload.id);    
            return { ...state, errors: null, posts: [...updatedPosts, action.payload ]};   
        case EDIT_POST_ERROR:
            return { ...state, errors: action.payload }; 
        case DELETE_POST:
            const filteredPosts = state.posts.filter(post => post.id != action.payload.id);
            return { ...state, posts: filteredPosts };
        case DELETE_POST_ERROR:
            return { ...state, errors: action.payload }
        case FETCH_POSTS:  
            return { ...state, posts: action.payload }
        case FETCH_POSTS_ERROR:            
            return { ...state, errors: action.payload }
        case FETCH_POSTS_LOADING:
            return { ...state, isLoading: action.payload }
    //     case 'EDIT_A_POST':
    //         return state.map((post)=>post.id === action.id ? {...post,editing:!post.editing}:post)
    //     case 'UPDATE':
    //         return state.map((post)=>{
    //     if(post.id === action.id) {
    //         return {
    //          ...post,
    //          title:action.data.newTitle,
    //          content:action.data.newMessage,
    //          ageGroup:action.AgeGroup,
    //          editing: !post.editing
    //       }
    //     } else return post;
    //   })
        default:
            return state;
    }
};

export default postReducer;