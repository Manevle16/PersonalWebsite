import { connect } from 'react-redux';
import LoginDropdown from '../components/AccountDropdown';
import { checkIfLoggedIn } from '../../../actions/accountDropdownActions';
import { getIsLoggedIn } from '../../../reducers';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  checkIfLoggedIn: (userId, token) => dispatch(checkIfLoggedIn(userId, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDropdown);
