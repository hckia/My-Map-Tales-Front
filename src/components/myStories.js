import _ from 'lodash';
import './style/myStories.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchMyStories } from '../actions';
import Map from './map';
import AppHeader from './appHeader';
import AppFooter from './appFooter';
import { Link } from 'react-router-dom';
import Modal from './modal';

class MyStories extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isOpen: false
    };
    if(!this.props.stories){
      this.toggleModal();
    }
  }
    componentDidMount(){
        // console.log(JSON.stringify(this.props.fetchMyStories()))
        this.props.fetchMyStories();
        this.toggleModal();
    }

    toggleModal(){
      //console.log("toggleModal fired ")
     // console.log("this.props.feedback ", this.props.feedback.message)
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    renderStories() {
        //var leCount = 0;
        //console.log('length ',this.props.stories);
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
                    <Modal show={this.state.isOpen}
                      onClose={this.toggleModal}>
                    </Modal>
                     <AppFooter />
                </div>
            );
    }
}

//<Map location={story.location}/>

function mapStateToProps(state) {
    //console.log("state " + JSON.stringify(state))
    return { stories: state.storiesReducer.userStories };
}

export default requiresLogin()(connect(mapStateToProps, { fetchMyStories })(MyStories));
