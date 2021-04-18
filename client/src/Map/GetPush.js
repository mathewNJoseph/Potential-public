import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import db from '../firebase';
import "./GetPush.css"
import { Button } from '@material-ui/core';

function GetPush({onPostClick, inputHistory, userVar, selectedFunc}) {
      
  const history = useHistory();

  // once "Join Community" is clicked on the map, it will call the funciton
  // It will route them to the feed with the appropriate posts from the selected community
  // It also stores the selected community to the window.localStorage for other components to access this variable
  const routeChange = (postDetail, testHistory) => { 
    db.collection("Users").doc(userVar.uid).set({
      "selectedCommunity": postDetail.name
    })

    window.localStorage.setItem("community", postDetail.name)

    let path = '/Feed/FeedApp'; 
    testHistory.push({
        pathname: path,
        state2: {postDetail}
    });
  }
  
  return (
    <div className="push" onClick={()=>routeChange(onPostClick(), inputHistory)} >
      
      <Button type="submit" >Join Community!</Button>
      
    </div>
  )
}

export default GetPush
