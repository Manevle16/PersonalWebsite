import { connect } from 'react-redux';
import TopMenuBar from '../components/TopMenuBar';
import { getCurrentTab } from '../../../reducers';
import { switchTabHome, switchTabAbout, switchTabProject, switchTabBlog } from '../../../actions/topMenuBarActions';

const mapStateToProps = state => ({
  currentTab: getCurrentTab(state)
});

const mapDispatchToProps = dispatch => ({
  switchTabHome: () => dispatch(switchTabHome()),
  switchTabAbout: () => dispatch(switchTabAbout()),
  switchTabProject: () => dispatch(switchTabProject()),
  switchTabBlog: () => dispatch(switchTabBlog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenuBar);
