import React from 'react';
import { Modal } from 'react-bootstrap';
import SignUpForm from './SignUpForm';

export default class SignUpModal extends React.Component {
  constructor() {
    super();

    this.state = {
      isSigningIn: true
    };
  }

  handleFormSwitch = () => {
    this.setState({ isSigningIn: !this.state.isSigningIn });
  };

  render() {
    const { isSigningIn } = this.state;
    const { show, handleClose, signUpUser, logInUser } = this.props;

    return (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="sign-up-modal"
        data-id="SIGN_UP_MODAL"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isSigningIn ? 'Please Sign In' : 'Create An Account'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          *I will not be using your data for any monetary reasons. I made
          account support on my website for fun. Commenting on the blog is
          possible as a guest.
        </Modal.Body>
        <SignUpForm
          isSigningIn={isSigningIn}
          handleClose={handleClose}
          signUpUser={signUpUser}
          logInUser={logInUser}
          handleFormSwitch={this.handleFormSwitch}
        />
      </Modal>
    );
  }
}
