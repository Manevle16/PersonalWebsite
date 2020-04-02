import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import cookie from 'react-cookies';
import SignUpModalContainer from '../containers/SignUpModalContainer';
import ErrorModal from '../../Common/ErrorModal';

export default class AccountDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      showSignUp: false
    };
  }

  componentDidMount() {
    const userId = cookie.load('userId');
    const token = cookie.load('token');
    if (userId && token) {
      this.props.checkIfLoggedIn(userId, token);
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
    return (
      <div className='account-dropdown'>
        {isLoggedIn ? (
          <NavDropdown title='Account' id='account_dropdown'>
            <NavDropdown.Item href='#fake1'>Settings</NavDropdown.Item>
            <NavDropdown.Item href='#fake2'>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link onClick={this.onClickSignIn} data-id='SIGN_IN_MENU_BTN'>
            Sign In
          </Nav.Link>
        )}
        <SignUpModalContainer
          data-id='SIGN_UP_MODAL'
          show={this.state.showSignUp}
          handleClose={this.handleSignInClose}
        />
        <ErrorModal show={error.isError} body={error.errorBody} onHide={closeError} />
      </div>
    );
  }
}
