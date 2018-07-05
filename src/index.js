import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect,BrowserRouter as Router} from 'react-router-dom';
//import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import MyMapTalesDescription from './components/myMapTalesDescription';
import Dashboard from './components/dashboard';
import MyStories from './components/myStories.js';
import StoryPage from './components/storyPage';
import CreateStory from './components/createStory';
import Login from './components/login';
import SignUp from './components/signUp';
import './index.css';
import reducers from './reducers/store';
//import promise from 'redux-promise';
import { loadAuthToken } from './reducers/local-storage';

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// <Provider store={createStoreWithMiddleware(reducers)}>


// Below is an alternative method for ensuring the user is logged in. It is used on the Login component as an alternative example to the way the signup component checks if the user is logged in.
//In that instance, the sign up form is a nested component to signup, allowing us to connect and map the state of our authenticating to the loggedIn checker.

//should probably put PrivateRoute in its own directory.
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !loadAuthToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);



ReactDOM.render(
	<Provider store={reducers}>
		<Router>
	      <div className="app-container">
			<Switch>
				<Route path="/dashboard" component={Dashboard}/>
        <Route path="/mystories" component={MyStories}/>
				<Route path="/create" component={CreateStory}/>
				<PrivateRoute path="/login" component={Login} />
        <Route path="/story/:story" component={StoryPage} />
				<Route path="/signup" component={SignUp}/>
				<Route path="/" component={MyMapTalesDescription}/>
			</Switch>
	      </div>
		</Router>
	</Provider>,
	document.getElementById('root')
	);

/*
			<AppHeader term="" />
			<Menu />
			<AppFooter />
*/
