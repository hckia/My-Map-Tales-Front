//import _ from 'lodash';
import React from 'react'
import { connect } from 'react-redux';
import SearchBar from './searchBar'
import './style/appHeader.css'
import { searchStories } from '../actions'

class AppHeader extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			story: ''
		}
		this.storySearch = this.storySearch.bind(this)
		//this.props.searchStories
	}

	storySearch(term){
		//this is where I need to put searchStories
		this.props.searchStories(term);
		this.setState({
			story: `Search Results for: ${term}`
		})
	}

	render(){
		return (
			<div className="header-container">
				<h1 className="app-header">App Header Component</h1>
				<SearchBar onSearchTermChange={this.storySearch}/>
				<p>{this.state.story}</p>
				<a href="/login">login</a>
				<a href="/signup">signup</a>
			</div>
        );
	}

}

/* 
Lets create a navbar component so that our links have more control over their position.
*/

function mapStateToProps(state) {
	//console.log("state " + JSON.stringify(state))
	return { stories: state.stories };
}

export default connect(mapStateToProps, { searchStories })(AppHeader);