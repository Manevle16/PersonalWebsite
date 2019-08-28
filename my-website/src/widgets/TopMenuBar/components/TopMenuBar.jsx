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
      default:
        return;
    }
  };

  render() {
    const { currentTab } = this.props;
    console.log(currentTab);
    return (
      <div className="top-menu-bar">
        <Navbar expand="lg">
          <Navbar.Brand>Home</Navbar.Brand>
          <Navbar.Collapse>
            <Nav
              onSelect={this.onTabClick}
              variant="tabs"
              activeKey={currentTab}
            >
              <Nav.Item>
                <Nav.Link eventKey="home">Test</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about">Test 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
