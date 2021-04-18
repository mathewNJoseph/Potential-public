import React, { Component, useState, useEffect } from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import db, { storageRef } from '../firebase';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from '../StateProvider';
import ChatIcon from '@material-ui/icons/Chat';
//import axios from 'axios';

// This is a post component
// Each post visualize in the feed is a implementation of this component
function Post({ profilePic, image, username, timestamp, message, onPostClick, id, title, community, setStarPosts, setPosts, starPosts, posts, starMarked }) {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(message))))

    const [{ user }, dispatch] = useStateValue();

    var counter = 0

    // function to toggle the star button
    function starButton() {
        var starbool = false;
        var occured = false
        db.collection("Communities").doc(community).collection("Posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            if (!occured) {
                counter = counter + 1
                snapshot.forEach(specificPost => {
                    if (specificPost.id == id) {
                        specificPost.data().starred.forEach(StarID => {
                            if (StarID == user.uid) {

                                starbool = true

                                var starredCopy = specificPost.data().starred
                                var starredCopy = starredCopy.filter((item) => item !== user.uid)
                                db.collection("Communities").doc(community).collection("Posts").doc(id).update({
                                    starred: starredCopy
                                })

                            }
                        })

                        if (starbool == false) {
                            //HERE YOU FOLLOWING A POST

                            var copyOfStarred = specificPost.data().starred.slice() // update databse to add the user id to the post
                            copyOfStarred.push(user.uid)
                            db.collection("Communities").doc(community).collection("Posts").doc(id).update({
                                starred: copyOfStarred
                            })
                        }

                    }
                })

                occured = true
            }

        })    // add uid to post.id.starred

    }

    let btn_class = starMarked ? "starMarked" : "post__option";

    return (
        <div className="post" key={id}>
            <div className="post__upperSection" onClick={() => onPostClick({ profilePic, image, username, timestamp, message, id, title })}>
                <div className="testingDiv">
                    <div className="post__top">
                        <Avatar src={profilePic}
                            className="post__avatar" />
                        <div className="post__topInfo">
                            <h3> {username} </h3>
                            <p> {new Date(timestamp?.toDate()).toLocaleTimeString()} </p>
                        </div>

                    </div>
                    <h2>{title}</h2>
                </div>

                <div className="post__bottom">
                    <Editor
                        editorState={editorState}
                        readOnly={true}
                    />
                </div>

                <div className="post__image">
                    <img src={image} alt="" />
                </div>
            </div>

            <div className="post__options">
                <div className={btn_class} onClick={starButton}>
                    <StarIcon />
                    <p>Star</p>
                </div>

                <div className="post__option" onClick={() => onPostClick({ profilePic, image, username, timestamp, message, id, title })}>
                    <ChatBubbleOutlineIcon />
                    <p>Contribute</p>
                </div>

                <div className="post__option" onClick={() => { }}>
                    <a href="https://join.slack.com/t/potentialcorp/shared_invite/zt-ogqzd8n5-BMk_bQxEyhmbXlagVZ3~lw" target="_blank"><ChatIcon />
                        <p>Slack</p>
                    </a>
                </div>

            </div>

        </div>
    )
}

export default Post