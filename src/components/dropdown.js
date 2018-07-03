import React, { Component } from 'react';
import './style/dropdown.css'
import Nav from './nav';

export default class DropDown extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({
      showMenu: !this.state.showMenu
    })

  }


  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-4 btn-4a icon-arrow-right" onClick={this.showMenu}>
          menu
        </button>

        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <Nav/>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
