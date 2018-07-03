import './style/appFooter.css'
import React from 'react';


export default class AppFooter extends React.Component {
	render(){
		return (
				<div className="footer-container">
					<div className="button-container">
						<div className="button-container-left">
							<button className="btn btn-4 btn-4a icon-arrow-right">
								Login Demo
							</button>
						</div>
					<div className="button-container-right">
						<button className="btn btn-4 btn-4a icon-arrow-right">
							About this App
						</button>
				  </div>
				</div>
			</div>
			);
	}
}

/*
Need to add event handlers that do the following...

Need to create three routes, with three events...

Actually


the buttons should be in their own component and exist on each one.
goToBoard(event) {
        event.preventDefault();
        this.props.history.push(`/board/${this.slugify(this.state.text)}`);
}

Reference bottom of this lesson: https://courses.thinkful.com/react-001v3/assignment/3.1

*/
