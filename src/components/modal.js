import './style/modal.css'
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import {Redirect} from 'react-router-dom';

class Modal extends React.Component {

  checkStories(feedback){
    if(feedback){
      return feedback
    }
    return "Loading Results. You should see them render Shortly in the background. Feel free to close this out once they do..."
  }
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#d9d1ba',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    const bottomSpace = {
      "marginTop": "15px"
    };

    const resultText ={
      "fontSize": "20px"
    }
    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}
          <p style={resultText}>{this.checkStories(this.props.feedback)}</p>
          <div className="footer">
            <button className="btn btn-4 btn-4a icon-arrow-right" style={bottomSpace} onClick={this.props.onClose}>
              Okay, Thanks!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    feedback: state.storiesReducer.message
})

Modal = connect(mapStateToProps)(Modal);

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
