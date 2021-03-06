import './style/login.css'
import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import {Redirect} from 'react-router-dom';
//import { loadAuthToken } from '../reducers/local-storage';
import AppHeader from './appHeader';
import AppFooter from './appFooter';
import Modal from './modal';

export class Login extends React.Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	loggedInState: false
		// }
		//console.log(this.props.loggedIn);
		this.toggleModal = this.toggleModal.bind(this);
		this.state = {
      isOpen: false
    };
	}

	toggleModal(){
    //console.log("toggleModal fired ")
   // console.log("this.props.feedback ", this.props.feedback.message)
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

    onSubmit(values) {
    	//console.log(values);
        this.props.dispatch(login(values.username, values.password));
    	// this.setState({ loggedInState: true })
    	// console.log('loggedInState ', this.state.loggedInState);
    }

    render() {
    	if(this.props.loggedIn){ //works, but we need to create loggedIn as a state, and update that state.
    		return <div><Redirect to="/dashboard" /> </div>
    	}
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <div>
                <AppHeader term="" parentComp="form" />
	        	<div className="login-container">
							  <div className="form-header"><h2>Login</h2></div>
		            <form
		                className="login-form"
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
		                <button disabled={this.props.pristine || this.props.submitting} onClick={this.toggleModal}>
		                    Log in
		                </button>
		            </form>
	            </div>
							<Modal show={this.state.isOpen}
	              onClose={this.toggleModal}>
	            </Modal>
                <AppFooter />
	        </div>
        );
    }
}

const mapStateToProps = (state) => ({
	//console.log("state " + JSON.stringify(state))
	loggedIn: state.auth.loggedIn
});

Login = connect(mapStateToProps)(Login);

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(Login);
