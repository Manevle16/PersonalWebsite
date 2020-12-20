import React from 'react';
import { string, func } from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import AccountDropdown from '../../AccountDropdown/containers/AccountDropdownContainer';
import AnimatedNavUnderline from './AnimatedNavUnderline';

class TopMenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      underlineWidth: 0,
      underlinePos: 0,
    };

    this.homeRef = React.createRef();
    this.aboutRef = React.createRef();
    this.blogRef = React.createRef();
    this.projectsRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    const { currentPath } = this.props;
    this.switchTabs(currentPath);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { currentTab } = this.props;
    switch (currentTab) {
      case '':
        this.setState({
          underlineWidth: this.homeRef.current.offsetWidth,
          underlinePos: this.homeRef.current.offsetLeft,
        });
        break;
      case 'about':
        this.setState({
          underlineWidth: this.aboutRef.current.offsetWidth,
          underlinePos: this.aboutRef.current.offsetLeft,
        });
        break;
      case 'blog':
        this.setState({
          underlineWidth: this.blogRef.current.offsetWidth,
          underlinePos: this.blogRef.current.offsetLeft,
        });
        break;
      case 'projects':
        this.setState({
          underlineWidth: this.projectsRef.current.offsetWidth,
          underlinePos: this.projectsRef.current.offsetLeft,
        });
        break;
      default:
        break;
    }
  };

  onTabClick = (eventKey, e) => {
    e.preventDefault();
    window.history.pushState({}, eventKey, eventKey); // Changes url in browser without refreshing page
    this.switchTabs(eventKey);
  };

  // eslint-disable-next-line consistent-return
  switchTabs = (tab) => {
    const { switchTabHome, switchTabAbout, switchTabProject, switchTabBlog } = this.props;

    switch (tab) {
      case '/':
        this.setState({
          underlineWidth: this.homeRef.current.offsetWidth,
          underlinePos: this.homeRef.current.offsetLeft,
        });
        return switchTabHome();
      case '/about':
        this.setState({
          underlineWidth: this.aboutRef.current.offsetWidth,
          underlinePos: this.aboutRef.current.offsetLeft,
        });
        return switchTabAbout();
      case '/blog':
        this.setState({
          underlineWidth: this.blogRef.current.offsetWidth,
          underlinePos: this.blogRef.current.offsetLeft,
        });
        return switchTabBlog();
      case '/projects':
        this.setState({
          underlineWidth: this.projectsRef.current.offsetWidth,
          underlinePos: this.projectsRef.current.offsetLeft,
        });
        return switchTabProject();
      default:
        break;
    }
  };

  render() {
    const { currentTab } = this.props;
    const { underlineWidth, underlinePos } = this.state;
    return (
      <div className='top-menu-bar'>
        <Navbar expand='sm'>
          <Navbar.Brand>MN</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse className='justify-content-end'>
            {underlineWidth && underlinePos ? (
              <AnimatedNavUnderline width={underlineWidth} position={underlinePos} />
            ) : null}
            <Nav onSelect={this.onTabClick} variant='tabs' activeKey={`/${currentTab}`}>
              <Nav.Item ref={this.homeRef}>
                <Nav.Link href='/' data-testid='TOP_MENU_HOME_BTN' eventKey='/'>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={this.projectsRef}>
                <Nav.Link href='/projects' data-testid='TOP_MENU_PROJECT_BTN' eventKey='/projects'>
                  Projects
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={this.blogRef}>
                <Nav.Link href='/blog' data-testid='TOP_MENU_BLOG_BTN' eventKey='/blog'>
                  Blog
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={this.aboutRef}>
                <Nav.Link href='/about' data-testid='TOP_MENU_ABOUT_BTN' eventKey='/about'>
                  About
                </Nav.Link>
              </Nav.Item>
              <NavItem>
                <AccountDropdown resize={this.resize} />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

TopMenuBar.propTypes = {
  currentTab: string.isRequired,
  currentPath: string.isRequired,
  switchTabHome: func.isRequired,
  switchTabAbout: func.isRequired,
  switchTabBlog: func.isRequired,
  switchTabProject: func.isRequired,
};

export default TopMenuBar;
