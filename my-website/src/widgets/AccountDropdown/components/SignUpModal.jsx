import React from 'react';
import { func, bool } from 'prop-types';
import { Modal } from 'react-bootstrap';
import SignUpForm from './SignUpForm';

class SignUpModal extends React.Component {
  constructor() {
    super();

    this.state = {
      isSigningIn: true,
    };
  }

  handleFormSwitch = () => {
    const { isSigningIn } = this.state;
    this.setState({ isSigningIn: !isSigningIn });
  };

  render() {
    const { isSigningIn } = this.state;
    const { show, handleClose, signUpUser, loginUser } = this.props;

    return (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className='sign-up-modal'
        data-testid='SIGN_UP_MODAL'
      >
        <Modal.Header closeButton>
          <Modal.Title>{isSigningIn ? 'Please Sign In' : 'Create An Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          *I will not be using your data for any monetary reasons. I made account support on my
          website for fun. Commenting on the blog is possible as a guest.
        </Modal.Body>
        <SignUpForm
          isSigningIn={isSigningIn}
          handleClose={handleClose}
          signUpUser={signUpUser}
          loginUser={loginUser}
          handleFormSwitch={this.handleFormSwitch}
        />
      </Modal>
    );
  }
}

SignUpModal.propTypes = {
  show: bool.isRequired,
  handleClose: func.isRequired,
  signUpUser: func.isRequired,
  loginUser: func.isRequired,
};

export default SignUpModal;
