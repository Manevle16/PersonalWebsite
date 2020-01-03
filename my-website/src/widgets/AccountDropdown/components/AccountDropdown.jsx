import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import cookie from 'react-cookies';
import SignUpModalContainer from '../containers/SignUpModalContainer';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      showSignUp: false
    };
  }

  componentDidMount() {
    const userId = cookie.load('userId');
    const token = cookie.load('token');
    console.log(userId, token);
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
    const { isLoggedIn } = this.props;
    return (
      <div className='account-dropdown'>
        {isLoggedIn ? (
          <NavDropdown title='Account' id='account_dropdown'>
            <NavDropdown.Item href='#fake1'>Settings</NavDropdown.Item>
            <NavDropdown.Item href='#fake2'>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link onClick={this.onClickSignIn}> Sign In </Nav.Link>
        )}
        <SignUpModalContainer
          show={this.state.showSignUp}
          handleClose={this.handleSignInClose}
        />
      </div>
    );
  }
}
