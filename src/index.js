import React from 'react';
import ReactDOM from 'react-dom';
//import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import AppHeader from './components/appHeader';
import Menu from './components/menu';
//import StoryBoard from './storyboard';
import MyMapTalesDescription from './components/myMapTalesDescription';
import Dashboard from './components/dashboard';
import Login from './components/login';
import SignUp from './components/signUp';
import AppFooter from './components/appFooter';
import './index.css';
//import App from './components/app';
// import { searchStories } from './actions';
// import store from './reducers';
import reducers from './reducers/store';
import promise from 'redux-promise';

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// <Provider store={createStoreWithMiddleware(reducers)}>

ReactDOM.render(
	<Provider store={reducers}>
		<Router>
	      <div className="app-container">
			<AppHeader term="" />
			<Menu />
			<BrowserRouter>
	    	<Switch>
				<Route path="/dashboard" component={Dashboard}/>
				<Route path="/login" component={Login}/>
				<Route path="/signup" component={SignUp}/>
				<Route path="/" component={MyMapTalesDescription}/>
			</Switch>
			</BrowserRouter>
			<AppFooter />
	      </div>
		</Router>
	</Provider>, 
	document.getElementById('root')
	);
