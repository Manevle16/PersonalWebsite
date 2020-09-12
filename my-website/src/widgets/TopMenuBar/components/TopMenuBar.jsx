import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import AccountDropdown from '../../AccountDropdown/containers/AccountDropdownContainer';
import AnimatedNavUnderline from './AnimatedNavUnderline';

export default class TopMenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      underlineWidth: 0,
      underlinePos: 0
    };

    this.homeRef = React.createRef();
    this.aboutRef = React.createRef();
    this.blogRef = React.createRef();
    this.projectsRef = React.createRef();
    window.addEventListener('resize', this.resize);
    const timer = () =>
      setTimeout(() => {
        this.switchTabs(this.props.currentPath);
      }, 0);
    timer();
    clearTimeout(timer);
  }

  resize = () => {
    switch (this.props.currentTab) {
      case '':
        this.setState({
          underlineWidth: this.homeRef.current.offsetWidth,
          underlinePos: this.homeRef.current.offsetLeft
        });
        return;
      case 'about':
        this.setState({
          underlineWidth: this.aboutRef.current.offsetWidth,
          underlinePos: this.aboutRef.current.offsetLeft
        });
        return;
      case 'blog':
        this.setState({
          underlineWidth: this.blogRef.current.offsetWidth,
          underlinePos: this.blogRef.current.offsetLeft
        });
        return;
      case 'projects':
        this.setState({
          underlineWidth: this.projectsRef.current.offsetWidth,
          underlinePos: this.projectsRef.current.offsetLeft
        });
        return;
      default:
        return;
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);

    let init = setInterval(() => {
      this.switchTabs(this.props.currentPath);
    }, 100);
    setTimeout(() => {
      clearInterval(init);
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  onTabClick = (eventKey, e) => {
    e.preventDefault();
    window.history.pushState({}, eventKey, eventKey); //Changes url in browser without refreshing page
    this.switchTabs(eventKey);
  };

  switchTabs = tab => {
    const { switchTabHome, switchTabAbout, switchTabProject, switchTabBlog } = this.props;
    console.log(this.homeRef.current.offsetLeft);
    // eslint-disable-next-line
    switch (tab) {
      case '/':
        this.setState({
          underlineWidth: this.homeRef.current.offsetWidth,
          underlinePos: this.homeRef.current.offsetLeft
        });
        return switchTabHome();
      case '/about':
        this.setState({
          underlineWidth: this.aboutRef.current.offsetWidth,
          underlinePos: this.aboutRef.current.offsetLeft
        });
        return switchTabAbout();
      case '/blog':
        this.setState({
          underlineWidth: this.blogRef.current.offsetWidth,
          underlinePos: this.blogRef.current.offsetLeft
        });
        return switchTabBlog();
      case '/projects':
        this.setState({
          underlineWidth: this.projectsRef.current.offsetWidth,
          underlinePos: this.projectsRef.current.offsetLeft
        });
        return switchTabProject();
    }
  };

  render() {
    const { currentTab } = this.props;
    return (
      <div className='top-menu-bar'>
        <Navbar expand='sm'>
          <Navbar.Brand>MN</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse className='justify-content-end'>
            {this.state.underlineWidth && this.state.underlinePos ? (
              <AnimatedNavUnderline width={this.state.underlineWidth} position={this.state.underlinePos} />
            ) : null}
            <Nav onSelect={this.onTabClick} variant='tabs' activeKey={'/' + currentTab}>
              <Nav.Item ref={this.homeRef}>
                <Nav.Link href='/' data-id='TOP_MENU_HOME_BTN' eventKey='/'>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={this.projectsRef}>
                <Nav.Link href='/projects' data-id='TOP_MENU_PROJECT_BTN' eventKey='/projects'>
                  Projects
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={this.blogRef}>
                <Nav.Link href='/blog' data-id='TOP_MENU_BLOG_BTN' eventKey='/blog'>
                  Blog
                </Nav.Link>
              </Nav.Item>
              <Nav.Item ref={this.aboutRef}>
                <Nav.Link href='/about' data-id='TOP_MENU_ABOUT_BTN' eventKey='/about'>
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
