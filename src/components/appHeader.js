//import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './searchBar';
import DropDown from './dropdown';
import './style/appHeader.css';
import { searchStories } from '../actions/';
import {logout} from '../actions/auth';
import { Link } from 'react-router-dom';

//import {logOut} from '../actions/auth';
//import { loadAuthToken } from '../reducers/local-storage';
//import { clearAuthToken } from '../reducers/local-storage';

class AppHeader extends React.Component {
	constructor(props){
		super(props);
		//this is just to make the application more interactive, may remove.
		this.state = {
			story: ''
			//logOutClicked: false
		}
		this.storySearch = this.storySearch.bind(this);
		//this.signOut = this.signOut.bind(this);
	}

	storySearch(term){
		//console.log('props.loggedIn? ', this.props.loggedIn);
		//this is where I need to put searchStories
		this.props.searchStories(term);
		// this.setState({
		// 	story: `Search Results for: ${term}`
		// })
		//					inside render<p>{this.state.story}</p>
	}
	render(){
		if(this.props.parentComp === "form"){
		return (
			<div className="header-container">
				<DropDown />
				<Link to="/"><h1 className="app-header">My Map Tales</h1></Link>
			</div>
        );
		}
		return (
			<div className="header-container">
				<DropDown />
				<Link to="/"><h1 className="app-header">My Map Tales</h1></Link>
				<SearchBar onSearchTermChange={this.storySearch}/>
			</div>
        );
	}

}

/*
Lets create a navbar component so that our links have more control over their position. This will also help with your current positioning of links issue
*/

function mapStateToProps(state) {
	//console.log("state " + JSON.stringify(state))
	return { //stories: state.stories,
		//loggedIn: state.auth.loggedIn
	 };
}

export default connect(mapStateToProps, { searchStories, logout })(AppHeader);
