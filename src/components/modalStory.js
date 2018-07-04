import './style/modal.css'
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import {Redirect} from 'react-router-dom';



class ModalStory extends React.Component {
  constructor(props) {
    super(props);
    //this.aboutMe = this.aboutMe.bind(this);
    this.nextAbout = this.nextAbout.bind(this);
    //this.counter = this.counter.bind(this);
    this.state = {
      aboutApp: [
        "I created My Map Tales after the tragic death of Anthony Bourdain. His show, along with my father, encouraged me to travel and get out of my comfort zone at the height of my depression.\n\nStories of travel always encouraged me that there is still hope in this world, even in the darkest of times.\n\nPeople can come to this site, share a story from a particular location, and read about peoples tales.",
        "The searchbar in the header allows you to search for existing Stories in our database. The Home & Dashboard page will also prepopulate with stories.",
        "Want to create a story of your own? Click the 'Menu' Button on the top right corner and go to our 'Sign up' page! Already a user? Click 'Login' instead!",
        "Once you're logged in you'll see a few new option under 'Menu' - Dashboard, My Stories, and Create a Story.\n\nCreate a Story is where you can share tales of your home, travels... Any place really!\n\nMy stories is where you can see stories you've created under the user you're logged in as!",
        "Not interested in signing up? The Login demo below will take you to a user demo"],
      aboutInfo: "I created My Map Tales after the tragic death of Anthony Bourdain. His show, along with my father, encouraged me to travel and get out of my comfort zone at the height of my depression.\n\nStories of travel always encouraged me that there is still hope in this world, even in the darkest of times.\n\nPeople can come to this site, share a story from a particular location, and read about peoples tales."
    };
  }
  // aboutMe(){
  //   //console.log(aboutApp[this.state.counter])
  //   const returnedPage = this.state.aboutApp[0];
  //   return returnedPage;
  // }

	nextAbout(number){
    //console.log(number);
    this.setState({
      aboutInfo: this.state.aboutApp[number]
    })
	}

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      "whiteSpace": "pre-wrap",
      backgroundColor: '#d9d1ba',
      borderRadius: 5,
      maxWidth: 600,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    const topSpace = {
      "marginTop": "15px"
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.state.aboutInfo}
          <div className="footer" style={topSpace}>
            <button className="btn btn-4 btn-4a icon-arrow-right" onClick={() => this.nextAbout(0)}>1</button>
            <button className="btn btn-4 btn-4a icon-arrow-right" onClick={() => this.nextAbout(1)}>2</button>
            <button className="btn btn-4 btn-4a icon-arrow-right" onClick={() => this.nextAbout(2)}>3</button>
            <button className="btn btn-4 btn-4a icon-arrow-right" onClick={() => this.nextAbout(3)}>4</button>
            <button className="btn btn-4 btn-4a icon-arrow-right" onClick={() => this.nextAbout(4)}>5</button>
            <button className="btn btn-4 btn-4a icon-arrow-right" onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// this should be in div under className Modal {this.props.feedback}

const mapStateToProps = (state) => ({
    // feedback: state.storiesReducer.message
})

ModalStory = connect(mapStateToProps)(ModalStory);
//{this.props.children}
ModalStory.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default ModalStory;
