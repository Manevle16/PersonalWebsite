import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Dropdown from '../../LoginDropdown/containers/LoginDropdownContainer';

export default class TopMenuBar extends React.Component {
  componentDidMount() {
    const {
      currentPath,
      switchTabAbout,
      switchTabBlog,
      switchTabProject
    } = this.props;

    // eslint-disable-next-line
    switch (currentPath) {
      case '/about':
        return switchTabAbout();
      case '/blog':
        return switchTabBlog();
      case '/projects':
        return switchTabProject();
    }
  }

  onTabClick = (eventKey, e) => {
    e.preventDefault();
    window.history.pushState({}, eventKey, '\\' + eventKey);
    const {
      switchTabHome,
      switchTabAbout,
      switchTabProject,
      switchTabBlog
    } = this.props;

    // eslint-disable-next-line
    switch (eventKey) {
      case 'home':
        return switchTabHome();
      case 'about':
        return switchTabAbout();
      case 'project':
        return switchTabProject();
      case 'blog':
        return switchTabBlog();
    }
  };

  render() {
    const { currentTab } = this.props;
    console.log(currentTab);
    return (
      <div className="top-menu-bar">
        <Navbar expand="sm">
          <Navbar.Brand>MN</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav
              onSelect={this.onTabClick}
              variant="tabs"
              activeKey={currentTab}
            >
              <Nav.Item>
                <Nav.Link href="/" data-id="TOP_MENU_HOME_BTN" eventKey="home">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/projects"
                  data-id="TOP_MENU_PROJECT_BTN"
                  eventKey="project"
                >
                  Projects
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/blog"
                  data-id="TOP_MENU_BLOG_BTN"
                  eventKey="blog"
                >
                  Blog
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/about"
                  data-id="TOP_MENU_ABOUT_BTN"
                  eventKey="about"
                >
                  About
                </Nav.Link>
              </Nav.Item>
              <NavItem>
                <Dropdown />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
