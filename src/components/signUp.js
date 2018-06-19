import './style/signUp.css'
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';

export default class SignUp extends Component {
	render() { 
		return (
		<div className="signup-container">
			<h2>Register for MyMapTales</h2>
            	<RegistrationForm />
            <Link to="/">Login</Link>
		</div>
		);
	}
}



// export function SignUp(props) {
//     // If we are logged in (which happens automatically when registration
//     // is successful) redirect to the user's dashboard
//     if (props.loggedIn) {
//         return <Redirect to="/dashboard" />;
//     }
//     return (
//         <div className="home">
//             <h2>Register for Foo App</h2>
//             <RegistrationForm />
//             <Link to="/">Login</Link>
//         </div>
//     );
// }

// const mapStateToProps = state => ({
//     loggedIn: state.auth.currentUser !== null
// });

// export default connect(mapStateToProps)(SignUp);