import React, { Component } from 'react'
import { connect } from 'react-redux';
import './style/nav.css'
import {logout} from '../actions/auth';
import {Redirect, Link, withRouter } from 'react-router-dom';

class Nav extends Component{
	constructor(props){
		super(props);
		this.state = {
			logOutClicked: false
		}
		this.signOut = this.signOut.bind(this);
	}

	signOut(event){
		console.log("event fired");
		event.preventDefault();
		this.props.logout();
		this.setState({
			logOutClicked: true
		});
	}

render(){
	if(!this.props.loggedIn){
		return(
		<div className="nav-container">
			<Link to="/login">Login</Link>
			<Link to="/signup">Signup</Link>
		</div>
		);
	}
    else if(this.state.logOutClicked){
    	return(
		<div className="nav-container">
			<Link to="/login">Login</Link>
			<Link to="/signup">Signup</Link>
			<Redirect to="/" />
		</div>
		);
    }
    return(
	    <div className="nav-container">
			<Link to="/login" onClick={this.signOut}>Logout</Link>
			<Link to="/create">Create a Story</Link>
			<Link to="/dashboard">Dashboard</Link>
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

export default connect(MapStateToProps, {logout})(Nav);