import { FETCH_A_STORY, fetchedStoryRetrieved, FETCH_MY_STORIES, fetchStoriesUserSuccess, FAILED_STORY, fetchMyStories, FETCH_STORIES, fetchStoriesSuccess, SEARCH_STORIES, SUCCESS_STORY } from './index';

describe('fetchedStoryRetrieved', () => {
  it('should return the action for a specific story', () => {
    const data = {
    			"_id": 1,
    			"title": 'my trip to Rome',
    			"description": 'The time I feel in love with Italy and Lasanga',
    			"location": 'Rome, Italy',
    			"date": '1/29/1985',
    			"author": 'Bob Dohl',
    			"body": 'Once upon a time I came to Rome. That plae was sick, yo! The food was great, the babes were great, the dudes were great, everything was great.'
    		};
    const action = fetchedStoryRetrieved(data);
    expect(action.type).toEqual(FETCH_A_STORY);
    expect(action.payload).toEqual(data);
  })
});
