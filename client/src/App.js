import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import ResponseApp from './Response/ResponseApp';
import FeedApp from './Feed/FeedApp';
import Profile from './Profile';
import HomeApp from './Home/HomeApp';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditorSection from './Response/EditorSection'
import CreaterApp from './CreatePost/CreaterApp';
import {auth} from "./firebase";
import {useStateValue} from './StateProvider';
import {actionTypes} from "./reducer";
import MapApp from "./Map/MapIndex";
import SlackButton from './SlackButton/SlackButton'

// This function manages all the routing for the website
function App() {
  require('dotenv').config()
  
  const [,dispatch] = useStateValue()

  useEffect(() => {
  
    auth.onAuthStateChanged(function(result) {
      if (result) {
        dispatch({
          type: actionTypes.SET_USER,
          user: result
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        });
      }
    })
  }, [dispatch])


  /* render all pages on one page - A <Switch> looks through its children <Route>s and
  renders the first one that matches the current URL. */
  return (
    
    <Router>
      <div>
         <Switch>
           <Route exact path='/slack'>
             <SlackButton />
           </Route>
           <Route exact path='/Creater'>
              <CreaterApp />
           </Route>
           <Route exact path='/Map/MapIndex'>
            <MapApp />
           </Route>
           <Route exact path='/Editor'>
             <EditorSection />
           </Route>
          <Route exact path='/'>
            <HomeApp/>
          </Route>
          <Route exact path='/Response/ResponseApp'>
            <ResponseApp />
          </Route>
          <Route exact path='/Feed/FeedApp'>
            <FeedApp/>
          </Route>
          <Route exact path='/Profile'>
            <Profile />
          </Route>
          <Route exact path='/Home/HomeApp'>
            <HomeApp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;