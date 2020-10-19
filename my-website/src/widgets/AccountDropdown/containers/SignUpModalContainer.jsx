import { connect } from 'react-redux';
import SignUpModal from '../components/SignUpModal';
import { signUpUser, loginUser } from '../../../actions/accountDropdownActions';

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (values) => dispatch(signUpUser(values)),
  loginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(null, mapDispatchToProps)(SignUpModal);
