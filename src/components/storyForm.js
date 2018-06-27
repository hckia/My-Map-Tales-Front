import _ from 'lodash';
import './style/storyForm.css'
import {Field, reduxForm, focus} from 'redux-form';
import {createStories} from '../actions/index';
import Input from './input';
import TextArea from './textarea';
import Modal from './modal';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { fetchStories } from '../actions';
//const  { textarea } = React
//import {login} from '../actions/index';

// https://redux-form.com/6.0.0-alpha.6/examples/simple/
// https://react-day-picker.js.org/
// if you want to change the style from Euro to US date format - http://react-day-picker.js.org/docs/input/ under date-fns

export class StoryForm extends Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.renderField = this.renderField.bind(this);
    // may remove state. this is found just before our date input...
    /* 
		          {this.selectedDay && <p>Day: {this.selectedDay.toLocaleDateString()}</p>}
		          {!this.selectedDay && <p>Choose a day</p>}
    */
    this.state = {
      selectedDay: undefined,
      isOpen: false,
      dashDirect: false,
      storyPostSuccess: 'loading results...'
    };
  }

    renderStories() {
        return _.map(this.props.feedback, feed => {
            return (
                <div>
                    {feed}
                </div>
            );
        });
    }

  handleDayChange(day) {
  	//console.log(day);
    this.setState({ selectedDay: day });
  }

  toggleModal(){
    //console.log("toggleModal fired ")
   // console.log("this.props.feedback ", this.props.feedback.message)
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onSubmit(values) {
      const {title, description, location, date, body} = values;
      const story = {title, description, location, date, body};
     // console.log(story);
      this.props.dispatch(createStories(story))
  }


    renderField(Field){
    	return <DayPickerInput inputProps={Field.input} dayPickerProps={{month: new Date(2018,10), todayButton: 'Today',}} onDayChange={this.handleDayChange} />
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
        if(this.state.dashDirect){
            return <Redirect to="/signup"/>
        }
        return (
            <div>
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="title">Title</label>
                <Field component={Input} type="text" name="title" />
                <label htmlFor="description">Description</label>
                <Field component={Input} type="text" name="description" />
                <label htmlFor="location">Location</label>
                <Field
                    component={Input}
                    type="text"
                    name="location"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="date">Date</label>
		        <Field
		        	component={this.renderField}
		        	type="text"
		        	name="date"
		        	validate={[required, nonEmpty]}
		        />
                <label htmlFor="body">Your story</label>
                <Field
                    component={TextArea}
                    type="text"
                    style={{height: 200}}
                    name="body"
                    validate={[required, nonEmpty]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting} onClick={this.toggleModal}>
                    Tell your story 
                </button>
            </form>
            <Modal show={this.state.isOpen}
              onClose={this.toggleModal}>
              
              <p>{this.state.storyPostSuccess}</p>
            </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    feedback: state.stories
})

StoryForm = connect(mapStateToProps, { fetchStories })(StoryForm);

export default reduxForm({
    form: 'createStory',
    onSubmitFail: (errors, dispatch) => {
    	//dispatch(focus('createStory', Object.keys(errors)[0]))
        dispatch(focus('createStory', errors))
        console.log('onSubmitFail error: ',JSON.stringify(errors));
    }
})(StoryForm);

/*              
            <Modal show={this.state.isOpen}
              onClose={this.toggleModal}>
              {this.state.storyPostSuccess}
            </Modal>
<button onClick={this.renderStories}>See results</button> */