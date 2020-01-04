import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

export default class SignUpModal extends React.Component {
  render() {
    const { show, handleClose, signUpUser } = this.props;

    return (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="sign-up-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create An Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          *I will not be using your data for any monetary reasons. I made
          account support on my website for fun. Commenting on the blog is
          possible as a guest.
        </Modal.Body>
        <Formik
          handleClose={handleClose}
          initialValues={{
            email: '',
            username: '',
            password: '',
            passVerify: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                values.email
              )
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.username) {
              errors.username = 'Required';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            if (!values.passVerify) {
              errors.passVerify = 'Required';
            } else if (values.passVerify !== values.password) {
              errors.passVerify = 'Not same as password';
            }
            return errors;
          }}
          onSubmit={values => {
            handleClose();
            signUpUser(values);
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    name="email"
                    className={
                      Boolean(touched.email && errors.email)
                        ? 'field-error'
                        : ''
                    }
                  />
                </div>
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
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Create Account
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
