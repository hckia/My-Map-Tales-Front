//import _ from 'lodash';
import { FETCH_A_STORY, FETCH_MY_STORIES, FAILED_STORY, FETCH_STORIES, SEARCH_STORIES, SUCCESS_STORY } from '../actions/index';
import { FAILED_FROM_AUTH } from '../actions/auth';

const initialState = {
	feedback: '',
	userStories: [],
	stories: [{
				"_id": 1,
				"title": 'my trip to Rome',
				"description": 'The time I feel in love with Italy and Lasanga',
				"location": 'Rome, Italy',
				"date": '1/29/1985',
				"author": 'Bob Dohl',
				"body": 'Once upon a time I came to Rome. That plae was sick, yo! The food was great, the babes were great, the dudes were great, everything was great.'
			},
			{
				"_id": 2,
				"title": 'my trip to Tehran',
				"description": 'The time I feel in love with Iran and Kabob',
				"location": 'Tehran, Iran',
				"date": '1/29/1995',
				"author": 'Babak Dolati',
				"body": 'Once upon a time I came to Tehran. That plae was SICK, yo! The FOOD WAS AMAZING, the babes were AMAZING, the dudes were AMAZING, everything was AMAZING.'
			}],
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
		//console.log('FETCH_A_STORY reducer has fired ', action.payload);
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
	case FAILED_FROM_AUTH:
		console.log("FAILED_FROM_AUTH fired in reducer ", action.payload);
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
