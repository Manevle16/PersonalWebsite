import { connect } from 'react-redux';
import SignUpModal from '../components/SignUpModal';
import { signUpUser } from '../../../actions/accountDropdownActions';

const mapDispatchToProps = dispatch => ({
  signUpUser: values => dispatch(signUpUser(values))
});
export default connect(
  null,
  mapDispatchToProps
)(SignUpModal);
