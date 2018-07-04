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
      this.renderMap = this.renderMap.bind(this);
  }

  // findSelectedStory(){
  //   //this existed in a previous version as a way to map through an array of objects and find a speciifc story.
  //   //i'm just using it now to try to find out what's going on.
  //   console.log("Story we are trying to find - this props.ourStory ", this.props.ourStory);
  //   return this.props.ourStory;
  // }
  renderMap(storyResults){
    if(!storyResults.location){
      return <p style={{color: '#fff', 'textAlign': 'center', 'fontSize': '25px'}}>"Loading map..."</p>
    }else{
      return <Map location={storyResults.location} />
    }
  }

  render(){
    console.log("Story we are trying to find - this.props.ourStory ", this.props.ourStory);
    const storyResults = this.props.ourStory; // use to be this.findSelectedStory(); . need to uncomment in componentDidMount to revive.
    console.log('Story found ', storyResults)
    return(
    <div>
      <AppHeader term="" parentComp="form" />
    <div className="single-description-container">

      <div className="story-group">
      <div className="story-left-container">
        {this.renderMap(storyResults)}
      </div>
      <div className="story-right-container">
        <p>Located in {storyResults.location}</p>
      <div className="story-title-container">
      <h2>{storyResults.title}</h2>
      </div>
      <p className="details detail-position">written by {storyResults.author}</p><p className="details detail-position">Date: {storyResults.date}</p>
      <p className="details detail-position description">{storyResults.description}</p>
      </div>

      </div>
      <div id="a-story-body"><p>{storyResults.body}</p></div>
    </div>
    <AppFooter />
  </div>
    );
  }
}
/*

<p className="story-label">A story by... </p>
<p className="story-label">At... </p>
<p>{storyResults.location}</p>
*/
function mapStateToProps(state) {
  console.log('from the state: ',state.storiesReducer.theStory);
  return { ourStory: state.storiesReducer.theStory };
}

export default connect(mapStateToProps, {fetchAStory})(StoryPage);
