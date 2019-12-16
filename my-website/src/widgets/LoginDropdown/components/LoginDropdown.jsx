import React from 'react';
import { NavDropdown } from 'react-bootstrap';

export default class extends React.Component {
  render() {
    return (
      <NavDropdown title='Account' id='account_dropdown'>
        <NavDropdown.Item href='#fake1'>Settings</NavDropdown.Item>
        <NavDropdown.Item href='#fake2'>Logout</NavDropdown.Item>
      </NavDropdown>
    );
  }
}
