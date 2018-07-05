import React, { Component } from 'react'
import { connect } from 'react-redux';
import './style/nav.css'
import {logout} from '../actions/auth';
import {Redirect, Link } from 'react-router-dom';

class Nav extends Component{
	constructor(props){
		super(props);
		this.state = {
			logOutClicked: false
		}
		this.signOut = this.signOut.bind(this);
	}

	signOut(event){
		//console.log("event fired");
		event.preventDefault();
		this.props.logout();
		this.setState({
			logOutClicked: true
		});
	}

render(){
	if(!this.props.loggedIn){
		return(
		<ul className="nav-container">
			<li><Link to="/login">Login</Link></li>
			<li><Link to="/signup">Signup</Link></li>
		</ul>
		);
	}
    else if(this.state.logOutClicked){
    	return(
		<ul className="nav-container">
			<li><Link to="/login">Login</Link></li>
			<li><Link to="/signup">Signup</Link></li>
			<Redirect to="/" />
		</ul>
		);
    }
    return(
	    <ul className="nav-container">
			<li><Link to="/dashboard">Dashboard</Link></li>
			<li><Link to="/create">Create a Story</Link></li>
			<li><Link to="/mystories">My Stories</Link></li>
			<li><Link to="/login" onClick={this.signOut}>Logout</Link></li>
		</ul>
    );
}

}

function MapStateToProps(state){
	//console.log("state " + JSON.stringify(state))
	return { //stories: state.stories,
		loggedIn: state.auth.loggedIn
	 };
}

export default connect(MapStateToProps, {logout})(Nav);
