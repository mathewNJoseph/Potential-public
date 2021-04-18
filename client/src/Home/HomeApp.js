import React, {useEffect} from 'react';
import './HomeApp.css';
import firebase from 'firebase'
import { useStateValue } from '../StateProvider';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import Header from './HomeHeader';
import db from '../firebase';
import { useHistory } from 'react-router';
import Potentialgif from "./gifpotential.gif";

function HomeApp() {
    const [state, dispatch] = useStateValue();
    const history = useHistory()
    
    // This function is called if the user clicks 'Join Community"
    /*  
        The difference between 'Join Community' and 'Sign In' button is the user pathway. 
        If they click "Join Community" they will be presented with the map immedietly. 
        If they click "Sign In", it will check if we have a community preference stored.
        If there is, it will route them to that preffered community. If not, then it will present them with a map.
    */
   // Both "Sign In" and "Join Community" signs in the user using Firebase Authentification
    const signIn_joinCommunity = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            let path = "/Map/MapIndex"
            history.push(path)
        }).catch(error => alert(error.message))
    }

    // Displays the home page 
    // Containts the 'Header' sub-component, which is the top bar of the homepage
    return (
        <div className="login">
                
            <Header />
            <div className="Homeapp"></div> 

            <h1 class="Action">Help solve problems in your community</h1>
            <h2 class="Mission">Report local issues and collaborate with others to find a solution and take action.</h2>
            <div className="Join">
                <Button type="submit" onClick={signIn_joinCommunity} >Join the community</Button>
            </div>
            <div className="GIF">
                <img src={Potentialgif}/>
            </div>
                
         </div>
        
    )
}

export default HomeApp