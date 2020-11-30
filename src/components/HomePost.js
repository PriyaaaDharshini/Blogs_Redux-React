import React from 'react';
import './Post.css'
import { Image, Button} from 'antd';
import Meta from 'antd/lib/card/Meta';

const HomePost = ({post}) => {console.log(post.title)
    return (
        
       
        <div className="imageCard">
        
        <Meta
                style={{ fontSize: "150px"}}			
                title={post.title}
            />
        <hr></hr>
        
      
            
            <Image align="justify" alt="Blog Image" src={post.image}></Image> 
          
            <p>Content: {post.content}</p>
            <h5>Email: {post.email}</h5>
            <h5>Age Group: {post.agegroup}</h5>
            <a href={post.link} style= {{align:"justify", color:"#FF002F"}} > Reference </a>
            <h5>Category: {post.categories}</h5>
            

            </div>
   
    );
}

export default HomePost;