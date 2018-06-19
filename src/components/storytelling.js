import './style/login.css'
import React, { Component } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import StoryField from './storyfield';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class StoryTime extends Component {
    onSubmit(values) {
    	console.log(values);
        //return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
        	<div className="story-container">
	            <form
	                className="story-form"
	                id="story-form"
	                onSubmit={this.props.handleSubmit(values =>
	                    this.onSubmit(values)
	                )}>
	                {error}
	                <label htmlFor="username">Username</label>
	                <Field
	                    component={Input}
	                    type="text"
	                    name="username"
	                    id="username"
	                    validate={[required, nonEmpty]}
	                />
	                <label htmlFor="password">Password</label>
	                <Field
	                    component={Input}
	                    type="password"
	                    name="password"
	                    id="password"
	                    validate={[required, nonEmpty]}
	                />
	                <button disabled={this.props.pristine || this.props.submitting}>
	                    Log in
	                </button>
	            </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'storyForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('storyForm', 'title'))
})(StoryTime);