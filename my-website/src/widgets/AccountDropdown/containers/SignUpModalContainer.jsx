import { connect } from 'react-redux';
import SignUpModal from '../components/SignUpModal';
import { signUpUser, logInUser } from '../../../actions/accountDropdownActions';

const mapDispatchToProps = dispatch => ({
  signUpUser: values => dispatch(signUpUser(values)),
  logInUser: (username, password) => dispatch(logInUser(username, password))
});

export default connect(null, mapDispatchToProps)(SignUpModal);
