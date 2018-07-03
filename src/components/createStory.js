import './style/createStory.css'
import React, { Component } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import StoryForm from './storyForm';
//import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import AppHeader from './appHeader';
import AppFooter from './appFooter';
import requiresLogin from './requires-login';
import { connect } from 'react-redux';

export class CreateStory extends Component {
    onSubmit(values) {
    	console.log(values);
    	return values;
        //return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        return (
        	<div>
		        <AppHeader term="" parentComp="form" />
	        	<div className="story-container">
		          <div className="form-header"><h2>So what's your story?</h2></div>
	              <StoryForm />
	            </div>
	            <AppFooter />
            </div>
        );
    }
}

// Mapstate to props when reduxForm is the main export... https://redux-form.com/7.1.0/docs/faq/howtoconnect.md/

const mapStateToProps = (state) => ({

})

// CreateStory = requiresLogin()(connect(mapStateToProps)(CreateStory));

// export default reduxForm({
//     form: 'storyForm',
//     onSubmitFail: (errors, dispatch) => dispatch(focus('storyForm', 'title'))
// })(CreateStory);

export default requiresLogin()(connect(mapStateToProps)(CreateStory));
