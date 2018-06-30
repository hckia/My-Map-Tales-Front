import React, { Component } from 'react';
import './style/textArea.css'

export default class TextArea extends Component {
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

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <textarea {...this.props.input} id={this.props.input.name} type={this.props.type} ref={input => (this.input = input)} placeholder="Tell your story" rows="10" cols="76.8"></textarea>
            </div>
        );
    }
}
