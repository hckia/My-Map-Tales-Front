import './style/appFooter.css'
import React from 'react';
import ModalStory from './modalStory';
import { connect } from 'react-redux';
import {login} from '../actions/auth';
import { loadAuthToken } from '../reducers/local-storage';

class AppFooter extends React.Component {
	constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
		this.loginDemo = this.loginDemo.bind(this)
    // may remove state. this is found just before our date input...
    /*
		          {this.selectedDay && <p>Day: {this.selectedDay.toLocaleDateString()}</p>}
		          {!this.selectedDay && <p>Choose a day</p>}
    */
    this.state = {
      isOpen: false,
			counter: 0,
    };
  }
	toggleModal(){
    //console.log("toggleModal fired ")
   // console.log("this.props.feedback ", this.props.feedback.message)
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
	loginDemo(){
		this.props.dispatch(login('demoUser', 'demoUser123'));
	}
	render(){
		return (
				<div className="footer-container">
					<div className="button-container">
						<div className="button-container-left">
							<button disabled={this.props.loggedIn} className="btn btn-4 btn-4a icon-arrow-right" onClick={() => this.loginDemo()}>
								Login Demo
							</button>
						</div>
					<div className="button-container-right">
						<button className="btn btn-4 btn-4a icon-arrow-right" onClick={this.toggleModal}>
							About this App
						</button>
						<ModalStory show={this.state.isOpen}
              onClose={this.toggleModal}>
            </ModalStory>
				  </div>
				</div>
			</div>
			);
	}
}

function mapStateToProps(state) {
    //console.log("state " + JSON.stringify(state))
    return {
			loggedIn: state.auth.loggedIn
		};
}

export default connect(mapStateToProps)(AppFooter);

/*
Need to add event handlers that do the following...

Need to create three routes, with three events...

Actually


the buttons should be in their own component and exist on each one.
goToBoard(event) {
        event.preventDefault();
        this.props.history.push(`/board/${this.slugify(this.state.text)}`);
}

Reference bottom of this lesson: https://courses.thinkful.com/react-001v3/assignment/3.1

*/
