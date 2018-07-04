import './style/map.css';
import React, { Component } from 'react';

const google = window.google;
var latLon;

export default class Map extends Component {
	componentDidMount(){
		var latLon;
		//console.log('location ', this.props.location.replace(/\s/g, "+"));
		//console.log('lat ', this.props.lat, 'lon ', this.props.lon);
		this.latLon = this.loadMap(this.props.location.replace(/\s/g, "+"));
		//console.log('LatLon: ',latLon);
	}

	loadMap(location){
		    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyB_p0OytywyCp2pvpBmGXrcXbmG7Le7S80`)
	        .then(res => {
	            if (!res.ok) {
	                return Promise.reject(res.statusText);
	            }
	            return res.json();
	        })
	        .then(results =>{
	            latLon = results.results[0].geometry.location
				new google.maps.Map(this.refs.map,{
							zoom: 11,
							center: latLon,
				            mapTypeControl: true
						})
	        })
	        .catch(err =>
	           console.log(err)
						 //if catch is thrown here - Create a map with the coordinates to Bermuda(sp??) Triangle.
						 //add Modal Box here telling the user to add a valid location. This would exist under the create story form
	        );
	}

	render(){
		return (
			<div ref='map' name={this.props.location} style={{height: '100%', width: '100%', float: 'left'}}>
				<p id="map-load">Loading Map...</p>
			</div>
		);
	}
}

/*
Add marker to map
potentially add custom markers when telling their story
*/
