import _ from 'lodash';
import './style/dashboard.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchStories } from '../actions';
import Map from './map';
import AppHeader from './appHeader';
import Menu from './menu';
import AppFooter from './appFooter';

class Dashboard extends Component {
    componentDidMount(){
        // This Component lifecycle method will run after a component is rendered on the screen
        // this is an asynchronus operation.
        // if you want to fetch data before the component renders, you can use another lifecycle
        // method called componentWillMount
        // console.log(JSON.stringify(this.props.fetchStories()))
        this.props.fetchStories();
    }

    renderStories() {
        var leCount = 0;
        return _.map(this.props.stories, story => {
            return (
                <div className="list-group-item" key={story._id} name={story.id}>
                    <h2>{story.title}</h2>
                    <h3>Location: {story.location}</h3>
                    <p>Story Teller: {story.author}</p>
                    <p>Date: {story.date}</p>
                    <Map location={story.location}/>
                    <p>{story.body}</p>
                </div>
            );
        });
    }

    render(){
        return (
                <div>
                    <AppHeader term="" parentComp="story" />
                    <div className="dashboard-container">
                        <h3>Stories</h3>
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
    return { stories: state.stories };
}

export default requiresLogin()(connect(mapStateToProps, { fetchStories })(Dashboard));