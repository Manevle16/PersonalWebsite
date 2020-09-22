import { connect } from 'react-redux';
import LoginDropdown from '../components/AccountDropdown';
import { checkIfLoggedIn } from '../../../actions/accountDropdownActions';
import { closeError } from '../../../actions/commonActions';
import { getIsLoggedIn, getError } from '../../../reducers';

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkIfLoggedIn: (userId, token) => dispatch(checkIfLoggedIn(userId, token)),
  closeError: () => dispatch(closeError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginDropdown);
