import React, { useState, useEffect } from 'react';
import './Feed.css';
import MessageSender from './MessageSender';
import Post from './Post';
import db from '../firebase';
import {useHistory} from 'react-router-dom'
import {useStateValue} from '../StateProvider';

function Feed({ communityInput }) {
    const [posts, setPosts] = useState([]);
    const [starPosts, setStarPosts] = useState([])
    const [{ user }, dispatch] = useStateValue();

    var community = communityInput

    useEffect(() => {
        db.collection("Communities").doc(community).collection("Posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            var copyOfPosts = []
            var copyOfStarPosts = []
            snapshot.forEach( specificPost => { 
                var addToStarPosts = false
                specificPost.data().starred.forEach( StarID =>{
                    if ( StarID == user.uid){
                        addToStarPosts = true
                    } 
                })
                if (addToStarPosts) {
                    // make a JSON of specific post in this format { id: doc.id, data: doc.data() }
                    var postJSONforStar = {
                        id: specificPost.id,
                        data: specificPost.data()
                    }
                    // add that JSON to the end of the copy 
                    copyOfStarPosts[copyOfStarPosts.length] = postJSONforStar
                    // set the copy into star posts
                } else {
                    var postJSONforPost = {
                        id: specificPost.id,
                        data: specificPost.data()
                    }
                    copyOfPosts.push(postJSONforPost)
                }
             })   
             setPosts(copyOfPosts)
             setStarPosts(copyOfStarPosts)
        })
        
        // go to firestore and fill starPosts
    }, []);

    const history = useHistory()

    const routeChange = (postDetail) => { 
        let path = '/Response/ResponseApp'; 
        history.push({
            pathname: path,
            state: {postDetail}
        });
      }

    
    return (
        <div className="feed">
           
            
            <MessageSender />
            { starPosts.map((post) => (
                <Post
                key={post.id}
                id={post.id}
                profilePic={post.data.profile_pic}
                message={post.data.message}
                timestamp={post.data.timestamp}
                username={post.data.username}
                image={post.data.image}
                onPostClick={routeChange}
                title={post.data.title}
                community = {communityInput}
                setStarPosts={setStarPosts}
                setPosts={setPosts}
                starPosts={starPosts}
                posts={posts}
                starMarked = {true}
                
                //starred = {''}
                
                />
            )) }
            { posts.map((post) => (
                <Post
                key={post.id}
                id={post.id}
                profilePic={post.data.profile_pic}
                message={post.data.message}
                timestamp={post.data.timestamp}
                username={post.data.username}
                image={post.data.image}
                onPostClick={routeChange}
                title={post.data.title}
                community = {communityInput}
                setStarPosts={setStarPosts}
                setPosts={setPosts}
                starPosts={starPosts}
                posts={posts}
                starMarked = {false}
                
                />
            )) }
        </div>
    )
}

export default Feed;