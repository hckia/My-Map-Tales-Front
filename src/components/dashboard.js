import _ from 'lodash';
import './style/dashboard.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchStories } from '../actions';
import Map from './map';
import AppHeader from './appHeader';
import AppFooter from './appFooter';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    componentDidMount(){
        // console.log(JSON.stringify(this.props.fetchStories()))
        this.props.fetchStories();
    }

    renderStories() {
        var leCount = 0;
        return _.map(this.props.stories, story => {
          //console.log(story);
            return (
                <Link to={`/story/${story._id}`} params={story} key={story._id} name={story._id}><div className="list-group-item">
                  <div className="left-container">
                    <Map location={story.location}/>
                  </div>
                  <div className="right-container">
                    <div className="story-title-container">
                      <h2>{story.title}</h2>
                    </div>
                    <p>Story Teller: {story.author}</p>
                    <p>Location: {story.location}</p>
                    <p>Date: {story.date}</p>
                  </div>
                  <div id="story-description">
                    <p>{story.description}</p>
                  </div>
                </div></Link>
            );
        });
    }


    render(){
        return (
                <div>
                    <AppHeader term="" parentComp="story" />
                    <div className="description-container">
                        <ul onChange={this.renderStories}>
                            {this.renderStories()}
                        </ul>
                    </div>
                     <AppFooter />
                </div>
            );
    }
}

//<Map location={story.location}/>

function mapStateToProps(state) {
    //console.log("state " + JSON.stringify(state))
    return { stories: state.storiesReducer.stories };
}

export default requiresLogin()(connect(mapStateToProps, { fetchStories })(Dashboard));
