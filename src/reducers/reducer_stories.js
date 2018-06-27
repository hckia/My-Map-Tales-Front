import _ from 'lodash';
import { FAILED_STORY, FETCH_STORIES, SEARCH_STORIES, SUCCESS_STORY } from '../actions/index';
//CREATE_STORIES

const initialState = {
	feedback: ''
};



export default function StoryReducer(state = {}, action){
	//console.log("action fired: ", action);
	switch(action.type){
	case FETCH_STORIES:
		return _.mapKeys(action.payload, '_id')
	case SEARCH_STORIES:
		//console.log('within reducers term value: ',action.payload);
		return action.payload;
	// case CREATE_STORIES:
	// 	return action.payload;
	case SUCCESS_STORY:
		console.log("SUCCESSS STORY REDUCER FIRED ", action.payload)
		return action.payload
	case FAILED_STORY:
		//console.log("FAILED STORY REDUCER FIRED ", action.payload)
		return action.payload
	default:
		return state;
	}
}

/* 
		return Object.assign({}, state, {
			storyPostSuccess: 'your story has posted successfully!'
		})

*/