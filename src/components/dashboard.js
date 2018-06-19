import _ from 'lodash';
import './style/dashboard.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions'
import Map from './map';

class MyMapTalesDescription extends Component {
	componentDidMount(){
		// This Component lifecycle method will run after a component is rendered on the screen
		// this is an asynchronus operation.
		// if you want to fetch data before the component renders, you can use another lifecycle
		// method called componentWillMount
		// console.log(JSON.stringify(this.props.fetchStories()))
		this.props.fetchStories();
	}

	renderStories() {
		return _.map(this.props.stories, story => {
			return (
				<div className="list-group-item" key={story.id} name={story.id}>
					<h2>{story.title}</h2>
					<h3>Story Teller: {story.author}</h3>
					<Map location={story.location}/>
					<h3>Location: {story.location}</h3>
					<p>{story.body}</p>
				</div>
			);
		});
	}

	render(){
		return (
				<div className="dashboard-container">
					<h3>Stories</h3>
					<ul onChange={this.renderStories}>
						{this.renderStories()}
					</ul>
				</div>
			);
	}
}

//<Map location={story.location}/>

function mapStateToProps(state) {
	//console.log("state " + JSON.stringify(state))
	return { stories: state.stories };
}

export default connect(mapStateToProps, { fetchStories })(MyMapTalesDescription);