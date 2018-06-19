import _ from 'lodash';
import { FETCH_STORIES, SEARCH_STORIES } from '../actions/index';

export default function(state = {}, action){
	//console.log("action fired: ", action);
	switch(action.type){
	case FETCH_STORIES:
		return _.mapKeys(action.payload, 'id')
	case SEARCH_STORIES:
		//console.log('within reducers term value: ',action.payload);
		return action.payload;
	default:
		return state;
	}
}