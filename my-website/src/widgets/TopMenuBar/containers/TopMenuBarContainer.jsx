import { connect } from 'react-redux';
import TopMenuBar from '../components/TopMenuBar';
import { getCurrentTab } from '../../../reducers';
import { switchTabHome, switchTabAbout } from '../../../actions/topMenuBarActions';

const mapStateToProps = state => ({
  currentTab: getCurrentTab(state)
});

const mapDispatchToProps = dispatch => ({
  switchTabHome: () => dispatch(switchTabHome),
  switchTabAbout: () => dispatch(switchTabAbout)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenuBar);
