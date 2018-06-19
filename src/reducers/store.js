import {createStore, applyMiddleware, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducer_auth';
import protectedDataReducer from './reducer_protected-data';
import {setAuthToken, refreshAuthToken} from '../actions/auth';
import StoryReducer from './reducer_stories';

const rootReducer = createStore(combineReducers({
	stories: StoryReducer,
    form: formReducer,
    auth: authReducer,
    protectedData: protectedDataReducer
}),
	applyMiddleware(thunk)
);


// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    rootReducer.dispatch(setAuthToken(token));
    rootReducer.dispatch(refreshAuthToken());
}

export default rootReducer;
