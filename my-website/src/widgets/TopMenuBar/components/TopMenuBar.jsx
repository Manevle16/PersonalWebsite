import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class TopMenuBar extends React.Component {
  onTabClick = eventKey => {
    const { switchTabHome, switchTabAbout } = this.props;
    switch (eventKey) {
      case 'home':
        return switchTabHome();
      case 'about':
        return switchTabAbout();
    }
  };

  render() {
    const { currentTab } = this.props;
    return (
      <div className='top-menu-bar'>
        <Navbar expand='lg'>
          <Navbar.Brand>MN</Navbar.Brand>
          <Navbar.Collapse>
            <Nav
              onSelect={this.onTabClick}
              variant='tabs'
              activeKey={currentTab}
            >
              <Nav.Item>
                <Nav.Link data-id='TOP_MENU_HOME_BTN' eventKey='home'>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link data-id='TOP_MENU_ABOUT_BTN' eventKey='about'>
                  About
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
