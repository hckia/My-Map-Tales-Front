import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Map from './map';
 
const propTypes = {
    items: PropTypes.object.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}
 
const defaultProps = {
    initialPage: 1,
    pageSize: 10
}
 
class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
 
    setPage(page) {
        console.log(this.props.items);

        //console.log('Start index ', pager.startIndex, ' End index ', pager.endIndex);
        var { items, pageSize } = this.props;
        var pager = this.state.pager;
        //console.log('items as an array ' + JSON.stringify(Object.values(items)));
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        //console.log('items.length ', Object.keys(items).length);
        // get new pager object for specified page
        pager = this.getPager(Object.keys(items).length, page, pageSize);
        console.log('pager.pages: ',pager.pages);

        // get new page of items from items array
        var pageOfItems = Object.entries(items).slice(pager.startIndex,pager.endIndex).map(item => item[0]);//items.slice(pager.startIndex, pager.endIndex + 1);
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize || 10;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    render() {
        var pager = this.state.pager;
 
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
 
        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;


/* 

import _ from 'lodash';
import './style/dashboard.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../actions'
//import Map from './map';
import Pagination from './pagination';

class MyMapTalesDescription extends Component {
    componentDidMount(){
        // This Component lifecycle method will run after a component is rendered on the screen
        // this is an asynchronus operation.
        // if you want to fetch data before the component renders, you can use another lifecycle
        // method called componentWillMount
        // console.log(JSON.stringify(this.props.fetchStories()))
        this.props.fetchStories();
        this.state = {
            pageOfItems: []
        };
 
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    renderStories() {
        return (
            this.props.stories
        );
        // return _.map(this.props.stories, story => {
        //  return (
        //      <div className="list-group-item" key={story.id} name={story.id}>
        //          <h2>{story.title}</h2>
        //          <h3>Story Teller: {story.author}</h3>
        //          <Map location={story.location}/>
        //          <h3>Location: {story.location}</h3>
        //          <p>{story.body}</p>
        //      </div>
        //  );
        // });
    }

    render(){
        return (
                <div className="dashboard-container">
                    <h3>Stories</h3>
                    <Pagination items={this.renderStories()} onChange={this.renderStories} onChangePage={this.onChangePage} />
                </div>
            );
    }
}

//<Map location={story.location}/>

function mapStateToProps(state) {
    //console.log("state " + JSON.stringify(state))
    return { stories: state.stories };
}

export default connect(mapStateToProps, { fetchStories })(MyMapTalesDescription);
*/