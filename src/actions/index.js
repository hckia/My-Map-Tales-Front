//import axios from 'axios';
//http://reduxblog.herokuapp.com/api?key=PAPERCLIPZAPERCLIP
// const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
// const API_KEY = '?key=PAPERCLIPZAPERCLIP'
import {API_BASE_URL} from '../config';
import {SubmissionError} from 'redux-form';
import {normalizeResponseErrors} from './utils';
import {loadAuthToken} from '../reducers/local-storage';

var results = [{
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
		}];

function substringSearch(data, term){
  const ignorekeys = ['id', 'comments'];
  const results =  data.filter(item => {
    for( let key in item ){
      // continue goes to next loop of this for()
      if( ignorekeys.indexOf(key) > -1 ) continue;
      let strValue = "" + item[key];
      // \b is a "word boundary" in regex. That is a zero-width character that represents the start or end of a string of letters. It is broken by punctuation.
      // Inside the regex we construct, we need to escape the backslash on the \b so that the backslash ends up inside the string, and then inside the regex pattern
      let pattern = new RegExp('\\b' + term + '\\b', 'ig');
      // console.log('Searching key:', key, 'for', pattern);
      if( strValue.match( pattern ) ) return true;

    }
    return false;
  });
  //console.log('Search for', term, 'found', results.length, 'entries:', results);
  return results;
}

export const FETCH_STORIES = 'fetch_stories';
const fetchStoriesSuccess = (serverResults) => {
	return {
		type: FETCH_STORIES,
		payload: serverResults
	}
}

export const FETCH_MY_STORIES = 'FETCH_MY_STORIES'; // good convention to leave as uppercase
const fetchStoriesUserSuccess = (userStories) => {
	return {
		type: FETCH_MY_STORIES,
		payload: userStories
	}
}
export const FETCH_A_STORY = 'FETCH_A_STORY';
const fetchedStoryRetrieved = (theStory) => {
	console.log('fetchedStoryRetrieved has fired ', theStory);
	return {
		type: FETCH_A_STORY,
		payload: theStory
	}
}

export const fetchStories = () => dispatch => {
	fetch(`${API_BASE_URL}/stories/`, {
	        method: 'GET',
	        headers: {
	            'Content-Type': 'application/json'
	        }
	    })
		.then(res =>{
			//console.log(res.json());
			return res.json();
		})
		.then(serverResults => {
			results = serverResults;
			dispatch(fetchStoriesSuccess(serverResults));
		})
	    .catch(err =>
       		console.log(err)
    	);
}

export const fetchAStory = (story) => dispatch => {
	console.log('fetchAStory has fired')
	fetch(`${API_BASE_URL}/stories/${story}`, {
		      method: 'GET',
					headers: {
						  'Content-Type': 'application/json'
					}
	})
	.then(res => {
		console.log('response ', res);
		return res.json();
	})
	.then(data =>{
		console.log('Story found ',data);
		dispatch(fetchedStoryRetrieved(data));
	})
	.catch(err =>{
		console.log(err);
	})
}

export const FAILED_STORY = 'failed_story';
//same as fetchStories, but only the users stories
export const fetchMyStories = () => dispatch => {
	const authToken = loadAuthToken();
  let statusRes;
	var data = {};
	data.message = "You have no stories! You should go to the menu in the top right corner and select Create a Story to add your own.";
	fetch(`${API_BASE_URL}/stories/myStories`, {
	        method: 'GET',
	        headers: {
	            'Content-Type': 'application/json',
	            Authorization: `Bearer ${authToken}`
	        }
	    })
		.then(res =>{
			//console.log(res);
			statusRes = res.status;
			return res.json();
		})
		.then(serverResults => {
			console.log(serverResults)
			if(statusRes === 204) {
				console.log('204 fired ', statusRes)
				dispatch({type: FAILED_STORY, payload: data});
			}
			console.log(serverResults);
			results = serverResults;
			dispatch(fetchStoriesUserSuccess(serverResults));
		})
	    .catch(err => {
       		console.log("catch block fired ",err);
					dispatch({type: FAILED_STORY, payload: data})
					//console.log(err)
    	});

}

// this will help with the search story function https://repl.it/@victorb/Cyrus-Substring-Search-Method-formerly-bullshit

export const SEARCH_STORIES = 'search_stories';
export const searchStories = (searchTerm) => {
	//console.log("searchStories fired! Term: ", searchTerm);
	//substringSearch(results, searchTerm);
	return {
		type: SEARCH_STORIES,
		payload: substringSearch(results, searchTerm)//,
		//searchTerm: searchTerm
	}
}

//export const CREATE_STORIES = 'create_stories';
export const SUCCESS_STORY = 'success_story';
export const createStories = (story, getState) => dispatch => {
	//console.log("fired", loadAuthToken());
    const authToken = loadAuthToken();
    //console.log('authToken: '.authToken);
	 //console.log(story.body);
	 let statusRes;
		fetch(`${API_BASE_URL}/stories/`, {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	            Authorization: `Bearer ${authToken}`
	        },
        body: JSON.stringify(story)
	    })
	    .then(res => {
				statusRes = res.status;
				return res.json()})
		.then(data => {
			//console.log('data code: ', data)
			//console.log('status ', statusRes)
			// if(statusRes === 201){
			// 	//console.log("201!!!! ",data);
			// 	data.message = data.title + " has been posted!";
			// 	//console.log("new data object ", data);
			// 	dispatch({type: SUCCESS_STORY, payload: data})
			// }
			if(data.code === 422){
				//console.log("422!!!! ", data);
				dispatch({type: FAILED_STORY, payload: data});
			}
		})
        .catch(err => {
        	console.log('ValidationError ',err)
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
}
