import React, {useEffect, useState} from 'react';
import './FeedApp.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import HomeApp from '../Home/HomeApp';
import { useStateValue } from '../StateProvider';
import { onAuthStateChanged } from 'firebase/firebase-auth';
import firebase from 'firebase';
import {useHistory, useLocation} from 'react-router-dom';
import db, {auth} from '../firebase';
import MapIndex from '../Map/MapIndex'

// Here is where all the components for the Feed come together. 
function FeedApp() {
  const location = useLocation()
  var {state} = location
  const history = useHistory()


  var communityValue = "Filler"
  if (window.localStorage.getItem("community") != null) {
    communityValue = window.localStorage.getItem("community")
  }

  const [community, setCommunity] = useState(communityValue)

  const [{ user }, dispatch] = useStateValue();

  // Conditional to either reroute the user to the home page if they are not signed in or display the feed if they are signed in 
  if (!user) {
    // pushes the user to the home page because they are signed out
    let path = "/"
    history.push(path)
    return ( 
      <h1>SIGNED OUT</h1>
    )
  } else {
    // user is signed in and will display the feed
    return (
      <>
        <Header/> 
        <div className="app__body">
          <div className="Sidebar">
            <Sidebar community={community}/>
          </div> 
          <div className="Feed">
            <Feed communityInput={community}/>
          </div> 
          <div className="Widgets">
            <Widgets />
          </div> 
        </div> 
      </>
    )
  }

}

export default FeedApp;
