import './style/myMapTalesDescription.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppHeader from './appHeader';
import Menu from './menu';
import AppFooter from './appFooter';
import { fetchStories } from '../actions'
import {Redirect} from 'react-router-dom';
import Map from './map';

 class MyMapTalesDescription extends Component {
	render() {
		if(this.props.loggedIn){
			return <Redirect to="/dashboard" />
		}
		return (
			<div>
				<AppHeader term="" parentComp="story" />
				<Menu />
				<div className="description-container">
					<h2>This component will be a description of our app!</h2>
					<p>You'll put examples of your app here.</p>
				</div>
				<AppFooter />
			</div>
			);
	}
}

function MapStateToProps(state){
	//console.log("state " + JSON.stringify(state))
	return { //stories: state.stories,
		loggedIn: state.auth.loggedIn
	 };
}

export default connect(MapStateToProps, {fetchStories})(MyMapTalesDescription);