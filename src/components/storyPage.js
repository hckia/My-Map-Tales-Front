import _ from 'lodash';
import './style/storyPage.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAStory } from '../actions';
import Map from './map';
import AppHeader from './appHeader';
import AppFooter from './appFooter';

class StoryPage extends Component {
  constructor(props) {
    super(props);
    //this.props.fetchAStory(this.props.match.params.story);
  }
  componentDidMount(){
      // console.log(JSON.stringify(this.props.fetchStories()))
      console.log('params ', this.props.match.params.story);
      this.props.fetchAStory(this.props.match.params.story);
      console.log('Our... story? ',this.props.ourStory);
      //this.findSelectedStory = this.findSelectedStory.bind(this);
  }

  // findSelectedStory(){
  //   //this existed in a previous version as a way to map through an array of objects and find a speciifc story.
  //   //i'm just using it now to try to find out what's going on.
  //   console.log("Story we are trying to find - this props.ourStory ", this.props.ourStory);
  //   return this.props.ourStory;
  // }

  render(){
    console.log("Story we are trying to find - this.props.ourStory ", this.props.ourStory);
    const storyResults = this.props.ourStory; // use to be this.findSelectedStory(); . need to uncomment in componentDidMount to revive.
    console.log('Story found ', storyResults)
    return(
    <div>
      <AppHeader term="" parentComp="form" />
    <div className="single-description-container">
      <div className="story-title-container">
      <h2>{storyResults.title}</h2>
      </div>
      <div className="story-group">
      <div className="story-left-container">
        <Map location={storyResults.location} />
      </div>
      <div className="story-right-container">
      <p className="story-label">A story by... </p>
      <p>{storyResults.author}</p>
      <p className="story-label">At... </p>
      <p>{storyResults.location}</p>
      </div>
      <div id="a-story-description"><p>{storyResults.description}</p><p id="story-date">Date: {storyResults.date}</p></div>
      </div>
      <div id="a-story-body"><p>{storyResults.body}</p></div>
    </div>
    <AppFooter />
  </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('from the state: ',state.storiesReducer.theStory);
  return { ourStory: state.storiesReducer.theStory };
}

export default connect(mapStateToProps, {fetchAStory})(StoryPage);
