import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

export default class SignUpModal extends React.Component {
  constructor() {
    super();

    this.state = {
      isSigningIn: true
    };
  }

  handleFormSwitch = () => {
    this.setState({ isSigningIn: !this.state.isSigningIn });
  };

  render() {
    const { isSigningIn } = this.state;
    const { show, handleClose, signUpUser, logInUser } = this.props;

    return (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="sign-up-modal"
        data-id="SIGN_UP_MODAL"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isSigningIn ? 'Please Sign In' : 'Create An Account'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          *I will not be using your data for any monetary reasons. I made
          account support on my website for fun. Commenting on the blog is
          possible as a guest.
        </Modal.Body>
        <Formik
          data-id="SIGN_UP_MODAL_FORMIK"
          handleClose={handleClose}
          initialValues={{
            email: '',
            username: '',
            password: '',
            passVerify: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.email && !isSigningIn) {
              errors.email = 'Required';
            } else if (
              !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                values.email
              ) &&
              !isSigningIn
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.username) {
              errors.username = 'Required';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            if (!values.passVerify && !isSigningIn) {
              errors.passVerify = 'Required';
            } else if (values.passVerify !== values.password && !isSigningIn) {
              errors.passVerify = 'Not same as password';
            }
            return errors;
          }}
          onSubmit={values => {
            handleClose();
            if (!isSigningIn) signUpUser(values);
            else logInUser(values.username, values.password);
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                {!isSigningIn && (
                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      data-id="SIGN_UP_MODAL_EMAIL_INPUT"
                      name="email"
                      className={
                        Boolean(touched.email && errors.email)
                          ? 'field-error'
                          : ''
                      }
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Username</label>
                  <Field
                    name="username"
                    className={
                      Boolean(touched.username && errors.username)
                        ? 'field-error'
                        : ''
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <Field
                    name="password"
                    className={
                      Boolean(touched.password && errors.password)
                        ? 'field-error'
                        : ''
                    }
                  />
                </div>
                {!isSigningIn && (
                  <div className="form-group">
                    <label>Retype Password</label>
                    <Field
                      name="passVerify"
                      className={
                        Boolean(touched.passVerify && errors.passVerify)
                          ? 'field-error'
                          : ''
                      }
                    />
                  </div>
                )}
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={this.handleFormSwitch}
                    data-id="SIGN_UP_MODAL_FORM_BTN"
                  >
                    {isSigningIn ? 'Create Account Form' : 'Sign In Form'}
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    data-id="SIGN_UP_MODAL_SUBMIT_BTN"
                  >
                    {isSigningIn ? 'Sign In' : 'Create Account'}
                  </Button>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}
