//import axios from 'axios';
//http://reduxblog.herokuapp.com/api?key=PAPERCLIPZAPERCLIP
// const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
// const API_KEY = '?key=PAPERCLIPZAPERCLIP'


const results = [{
			"id": 1,
			"title": 'my trip to Rome', 
			"description": 'The time I feel in love with Italy and Lasanga', 
			"location": 'Rome, Italy',
			"date": '1/29/1985',
			"author": 'Bob Dohl',
			"body": 'Once upon a time I came to Rome. That plae was sick, yo! The food was great, the babes were great, the dudes were great, everything was great.'
		},
		{
			"id": 2,
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
      let pattern = new RegExp('\\b' + term + '\\b', 'i');
      // console.log('Searching key:', key, 'for', pattern);
      if( strValue.match( pattern ) ) return true;
    
    }
    return false;
  });
  //console.log('Search for', term, 'found', results.length, 'entries:', results);
  return results;
}

export const FETCH_STORIES = 'fetch_stories';
export const fetchStories = () => {
	//const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
	//console.log("fetchStories called")
	return {
		type: FETCH_STORIES,
		payload: results
	};
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