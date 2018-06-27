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

const takeAction = (serverResults) => {
	return {
		type: FETCH_STORIES,
		payload: serverResults
	}
}

export const FETCH_STORIES = 'fetch_stories';
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
			dispatch(takeAction(serverResults));
		})
	    .catch(err =>
       		console.log(err)
    	);

//should show the default results, in case console log errors out.
	console.log(results)
	// dispatch(takeAction());
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
export const FAILED_STORY = 'failed_story';
export const SUCCESS_STORY = 'success_story';
export const createStories = (story, getState) => dispatch => {
	//console.log("fired", loadAuthToken());
    const authToken = loadAuthToken();
    //console.log('authToken: '.authToken);
   // console.log(story);
		fetch(`${API_BASE_URL}/stories/`, {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	            Authorization: `Bearer ${authToken}`
	        },
        body: JSON.stringify(story)
	    })
	    .then(res => res.json())
		.then(data => {
			// console.log('data: ',data)
			if(data.code === 201){
				console.log("201!!!! ",data);
				dispatch({type: SUCCESS_STORY, payload: data})
			}
			else if(data.code === 422){
				console.log("422!!!! ", data);
				dispatch({type: FAILED_STORY, payload: data});
			}
			//res.json()
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