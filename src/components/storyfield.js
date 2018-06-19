import React, { Component } from 'react'

export default class StoryField extends Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }
  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
        error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
        warning = (
            <div className="form-warning">{this.props.meta.warning}</div>
        );
    }
    const { value, onChange } = this.props
    return (
      <div>
        <textarea rows="4" cols="50" name="comment" form="story-form">Enter text here...</textarea>
      </div>
    )
  }
}