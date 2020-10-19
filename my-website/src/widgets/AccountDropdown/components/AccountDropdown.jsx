import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown, Nav } from 'react-bootstrap';
import cookie from 'react-cookies';
import SignUpModalContainer from '../containers/SignUpModalContainer';
import ErrorModal from '../../Common/ErrorModal';

class AccountDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      showSignUp: false,
    };
  }

  componentDidMount() {
    const { checkIfLoggedIn } = this.props;
    const userId = cookie.load('userId');
    const token = cookie.load('token');
    if (userId && token) {
      checkIfLoggedIn(userId, token);
    }
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn, resize } = this.props;
    if (prevProps.isLoggedIn !== isLoggedIn) {
      // Update the nav underline position if size of this widget changes
      resize();
    }
  }

  onClickSignIn = () => {
    this.setState({ showSignUp: true });
  };

  handleSignInClose = () => {
    this.setState({ showSignUp: false });
  };

  render() {
    const { isLoggedIn, error, closeError } = this.props;
    const { showSignUp } = this.state;
    return (
      <div className='account-dropdown'>
        {isLoggedIn ? (
          <NavDropdown title='Account' id='account_dropdown'>
            <NavDropdown.Item href='#fake1'>Settings</NavDropdown.Item>
            <NavDropdown.Item href='#fake2'>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link onClick={this.onClickSignIn} data-testid='SIGN_IN_MENU_BTN'>
            Sign In
          </Nav.Link>
        )}
        <SignUpModalContainer
          data-testid='SIGN_UP_MODAL'
          show={showSignUp}
          handleClose={this.handleSignInClose}
        />
        <ErrorModal show={error.isError} body={error.errorBody} onHide={closeError} />
      </div>
    );
  }
}

AccountDropdown.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object.isRequired,
  closeError: PropTypes.func.isRequired,
  checkIfLoggedIn: PropTypes.func.isRequired,
  resize: PropTypes.func.isRequired,
};

export default AccountDropdown;
