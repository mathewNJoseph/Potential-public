import React, {Component, useState} from 'react';
import { useStateValue } from '../StateProvider';
import db from '../firebase';
import firebase from 'firebase';
import CreaterTextfield from './CreaterTextfield'
import CreaterEditor from './createrEditor'
import HomeApp from '../Home/HomeApp';
import CreatePostHeader from "../CreatePost/CreatePostHeader"
import { useHistory } from 'react-router';



function CreaterApp() {
    const [{user}, dispath] = useStateValue()
    const history = useHistory()

    const routeToFeed = () => {
        let path = '/Feed/FeedApp'
        history.push(path)
    }

    return (
        <div className="createrApp">
            { !user ? (
                <HomeApp />
            ) : (
                <>
                <div>
                    <CreatePostHeader />
                </div>
                <div>
                    <CreaterEditor 
                    id={user.id}
                    profilePic={user.photoURL}
                    username = {user.displayName}
                    routeToFeed={routeToFeed}
                    />
                </div>
                </>
            )}
        </div>
    )

}

export default CreaterApp