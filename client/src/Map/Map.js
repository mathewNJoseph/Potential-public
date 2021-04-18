/* global google */
import React, {useState, Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";
import GetPush from "./GetPush"
import db from '../firebase';
import "./Map.css";
import config from '../config';

// Container to manage all the sub-components needed for the map
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: []
    };
  }

  // function called when a marker is clicked
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.place_,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  showDetails = place => {
    return (place);
  };

  // this funciton is called once the page is loaded
  // it displays all the available communities in the database
  componentDidMount() {
    db.collection("Communities").onSnapshot(snapshot => {
      snapshot.forEach(community => {
        var communityJSON = {
          name: community.id,
          lat: community.data().Location.latitude,
          lng: community.data().Location.longitude
        }
        
        var tempArray = this.state.places.slice()
        tempArray[tempArray.length] = communityJSON
        this.setState({places: tempArray})

      })
    })
  }
  
  // function to render the map
  render() {
    return (
        
      <div className="map-container">
        <Map
          google={this.props.google}
          className={"map"}
          zoom={13}
          initialCenter={
            {
                lat: 36.984117,
                lng: -122.030792
            }
            }
        >
          {this.state.places.map((place, i) => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                key={place.id}
                place_={place}
                position={{ lat: place.lat, lng: place.lng }}
              />
            );
          })}
          

          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
              <div className="GetPush">
              <GetPush
                
                onPostClick={this.showDetails.bind(this, this.state.selectedPlace)}

                inputHistory = {this.props.inputHistory}
                
                userVar={this.props.userVar}

                selectedFunc={this.props.selectedFunc}
                />
               </div>  
              
            </div>
          </InfoWindowEx>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.mapAPIKey,
})(MapContainer);
