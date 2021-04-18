import React, { Component, useState, useEffect } from 'react';
import './ResponsePost.css';
import { Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ExpandMoreOutlined } from '@material-ui/icons';
import HelpIcon from '@material-ui/icons/Help'
import db, {storageRef} from '../firebase';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import StarIcon from '@material-ui/icons/Star';

// This is the upper part of the of the response section which shows the post title, description, and image
function ResponsePost({id, profilePic, image, username, timestamp, message, title }) {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(message))))

    return (
        <div className="Responsepost" key={id}>
            <div className='post__top__wrapper'>
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
    )
}

export default ResponsePost