import _ from 'lodash';
import { FETCH_A_STORY, FETCH_MY_STORIES, FAILED_STORY, FETCH_STORIES, SEARCH_STORIES, SUCCESS_STORY } from '../actions/index';
//CREATE_STORIES

const initialState = {
	feedback: '',
	userStories: [],
	stories: [],
	theStory: {story: 'no story'}
};

export default function StoryReducer(state = initialState, action){
	//console.log("action fired: ", action);
	switch(action.type){
	case FETCH_STORIES:
		return {
			...state,
			stories: action.payload
		}
	case FETCH_MY_STORIES:
		return {
			...state,
			userStories: action.payload
		}
	case FETCH_A_STORY:
		console.log('FETCH_A_STORY reducer has fired ', action.payload);
		return {
			...state,
			theStory: action.payload
		}
	case SEARCH_STORIES:
		return {
			...state,
			stories: action.payload
		}
	// case CREATE_STORIES:
	// 	return action.payload;
	case SUCCESS_STORY:
		console.log("SUCCESSS STORY REDUCER FIRED ", action.payload)
		return action.payload
	case FAILED_STORY:
		console.log("FAILED STORY REDUCER FIRED ", action.payload)
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
