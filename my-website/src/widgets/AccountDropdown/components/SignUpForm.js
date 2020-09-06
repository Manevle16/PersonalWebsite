import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

export default function SignUpForm({ isSigningIn, handleClose, signUpUser, logInUser, handleFormSwitch }) {
  return (
    <Formik
      data-id='SIGN_UP_MODAL_FORMIK'
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
              <div className='form-group'>
                <label>Email</label>
                <Field
                  data-id='SIGN_UP_MODAL_EMAIL_INPUT'
                  name='email'
                  className={touched.email && errors.email ? 'field-error' : ''}
                />
              </div>
            )}
            <div className='form-group'>
              <label>Username</label>
              <Field name='username' className={touched.username && errors.username ? 'field-error' : ''} />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <Field name='password' className={touched.password && errors.password ? 'field-error' : ''} />
            </div>
            {!isSigningIn && (
              <div className='form-group'>
                <label>Retype Password</label>
                <Field name='passVerify' className={touched.passVerify && errors.passVerify ? 'field-error' : ''} />
              </div>
            )}
            <Modal.Footer>
              <Button variant='secondary' onClick={handleFormSwitch} data-id='SIGN_UP_MODAL_FORM_BTN'>
                {isSigningIn ? 'Create Account Form' : 'Sign In Form'}
              </Button>
              <Button variant='primary' type='submit' data-id='SIGN_UP_MODAL_SUBMIT_BTN'>
                {isSigningIn ? 'Sign In' : 'Create Account'}
              </Button>
            </Modal.Footer>
          </Form>
        );
      }}
    </Formik>
  );
}
