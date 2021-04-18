import React, { useState, useEffect } from 'react';
import './ResponseBody.css';

import ResponsePost from './ResponsePost';
import db from '../firebase';

function ResponseBody({post}) {
    const [posts, setPosts] = useState([]);
    return (
        <div className="feed">
                <ResponsePost
                key={post.id}
                profilePic={post.profilePic}
                message={post.message}
                timestamp={post.timestamp}
                username={post.username}
                image={post.image} 
                title={post.title}
                />
                
        </div>
    )
}

export default ResponseBody;