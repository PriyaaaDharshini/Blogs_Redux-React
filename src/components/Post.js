import React from 'react';
import './Post.css'
import { Image, Button} from 'antd';
import Meta from 'antd/lib/card/Meta';

const Post = ({post, onDelete, onEdit}) => {console.log(post.title)
    return (
        
        
        <div className="imageCard">
        
        <Meta
                style={{ fontSize: "150px"}}		
                title={post.title}
            />
        <hr></hr>
        
      
            
            <Image align="center" alt="Blog Image" src={post.image}></Image> 
          
            <p>Content: {post.content}</p>
            <h5>Email: {post.email}</h5>
            <h5>Age Group: {post.agegroup}</h5>
            <a href={post.link} style= {{align:"center", color:"#FF00FF"}} >Reference:{post.link} </a>
            <h5>Category: {post.categories}</h5>
            <Button type="primary" onClick={() => onEdit(post)} >Edit</Button>
            <Button type="primary" onClick={() => onDelete(post.id)} >Delete</Button>


            </div>
   
    );
}

export default Post;