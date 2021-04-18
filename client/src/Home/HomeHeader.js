import React from 'react';
import './HomeHeader.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from '../StateProvider';
import { Button } from '@material-ui/core';
import db, { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import {useHistory} from 'react-router-dom'
import firebase from 'firebase';

function HomeHeader({signInFunc}) {
    // Sub-component for the home page.
    // Includes the "Sign In" button
    
    const history = useHistory()
    
    // Function to sign in the user using Firebase Authentification
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            db.collection("Users").doc(result.user.uid).get().then(snapshot => {
                if (snapshot.exists) {
                    window.localStorage.setItem("community", snapshot.data().selectedCommunity)
                    let path = "/Feed/FeedApp"
                    history.push({
                        pathname: path,
                        state: snapshot.data().selectedCommunity
                    })
                } else {
                    let path = "/Map/MapIndex"
                    history.push(path)
                }
            })
        }).catch(error => alert(error.message))
    };

    // reroutes the user to the home page
    const routeChangeHome = () => { 
        let path = `/Home/HomeApp`; 
        history.push(path);
    }
    
    return (
        <div className="header">
            <div className="header__left">
                <div className="Potential"onClick={routeChangeHome}>
                    <h1>P</h1>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-a7-XVOwU7kusXzXdZ49tn_IUmAQ_gcUXg&usqp=CAU"/>
                    <h1>tential</h1>
                </div>  
            </div>
            <div className="homeheader__right">
                <Button type="submit" onClick={signIn}>Sign In</Button>
            </div>  
        </div>
    )
}

export default HomeHeader
