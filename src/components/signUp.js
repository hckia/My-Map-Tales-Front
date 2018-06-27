import './style/signUp.css'
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import AppHeader from './appHeader';
import Menu from './menu';
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
        <Menu />
        <div className="signup-container">
            <h2>Register for Foo App</h2>
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