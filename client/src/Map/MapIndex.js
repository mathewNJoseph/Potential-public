import React, { useState } from "react";
import ReactDOM from "react-dom";
import Map from "./Map";
import db from '../firebase';
import "./styles.css";
import {useEffect} from "react"
import { useHistory } from "react-router";
import { useStateValue } from '../StateProvider';


const data = [
  {
    name: "University of California Santa Cruz",
    lat: 36.9881,
    lng: -122.0582,
  },
  {
    name: "Santa Cruz",
    lat: 36.974117,
    lng: -122.030792,
    
  },
  
];

function MapApp({selectedFunc}) {
  const history = useHistory()

  const [localData, setLocalData] = useState([])
  var counter = 0

  const [{ user }, dispatch] = useStateValue();


  return ( <Map places={localData} center={{ lat: -24.9923319, lng: 135.2252427 }} inputHistory={history} userVar={user} selectedFunc={selectedFunc}/> )
}

export default MapApp