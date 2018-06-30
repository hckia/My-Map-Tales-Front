import _ from 'lodash';
import './style/storyPage.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions';
import Map from './map';
import AppHeader from './appHeader';
import AppFooter from './appFooter';

class StoryPage extends Component {
  constructor(props){
    super(props);
    console.log('params ', this.props.match.params.story);
    this.state = {
      id: this.props.match.params.story
    }
    //console.log('story array of objects (should be object)', this.props.stories);
  }
  componentDidMount(){
      // console.log(JSON.stringify(this.props.fetchStories()))
      this.props.fetchStories();
      this.findSelectedStory = this.findSelectedStory.bind(this);
  }

  findSelectedStory(){
    console.log("id we are trying to find ", this.state.id);
  //var storyFound = [];
  var storyFound = {}
  _.map(this.props.stories, story => {
    //console.log("current id: ", story._id);
      if(story._id === this.state.id){
        storyFound._id = story._id;
        storyFound.title = story.title;
        storyFound.description = story.description;
        storyFound.location = story.location;
        storyFound.author = story.author;
        storyFound.body = story.body;
        storyFound.date = story.date;
        // storyFound.push(story._id);
        // storyFound.push(story.title);
        // storyFound.push(story.description);
        // storyFound.push(story.location);
        // storyFound.push(story.author);
        // storyFound.push(story.body);
      }
    });
    console.log(storyFound);
    return storyFound;
  }

  render(){
    const storyResults = this.findSelectedStory();
    console.log('Story found ', storyResults)
    return(
    <div>
      <AppHeader term="" parentComp="form" />
    <div className="description-container">
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

/*
<p className="story-label">On... </p>
<p>{storyResults.date}</p>
*/

function mapStateToProps(state) {
  return {stories: state.stories};
}

export default connect(mapStateToProps, {fetchStories})(StoryPage);

/*
<div className="story-group">
  <div className="left-container">
    <Map location={storyFound.location}/>
  </div>
  <div className="right-container">
    <h2>{storyFound.title}</h2>
    <p>Story Teller: {storyFound.author}</p>
    <h3>Location: {storyFound.location}</h3>
    <p>Date: {storyFound.date}</p>
  </div>
  <div id="story-description">
    <p>{storyFound.description}</p>
  </div>
</div>

<div class="story-group">
<div class="title-container">
<h2>{storyFound.title}</h2>
</div>
<div class="left-container">

</div>
<div class="right-container">
<p>{storyFound.author}</p>
<p>{storyFound.location}</p>
<p>{storyFound.date}</p>
</div>
<div id="story-description"><p>{storyFound.description}</p></div>
<div id="story-body"><p>{storyFound.body}</p></div>
</div>
*/
