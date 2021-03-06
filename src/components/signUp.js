import './style/signUp.css'
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import AppHeader from './appHeader';
import AppFooter from './appFooter';

export function SignUp(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div>
        <AppHeader term="" parentComp="form" />
        <div className="signup-container">
            <div className="form-header"><h2>Sign up for My Map Tales</h2></div>
            <RegistrationForm />
        </div>
        <AppFooter />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(SignUp);
