/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { func, bool } from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

function SignUpForm({ isSigningIn, handleClose, signUpUser, loginUser, handleFormSwitch }) {
  return (
    <Formik
      data-testid='SIGN_UP_MODAL_FORMIK'
      initialValues={{
        email: '',
        username: '',
        password: '',
        passVerify: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email && !isSigningIn) {
          errors.email = 'Required';
        } else if (
          !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            values.email,
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
      onSubmit={(values) => {
        handleClose();
        if (!isSigningIn) signUpUser(values);
        else loginUser(values.username, values.password);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {!isSigningIn && (
            <div className='form-group'>
              <label htmlFor='email-input'>Email</label>
              <Field
                type='text'
                id='email-input'
                data-testid='SIGN_UP_MODAL_EMAIL_INPUT'
                name='email'
                className={touched.email && errors.email ? 'field-error' : ''}
              />
            </div>
          )}
          <div className='form-group'>
            <label htmlFor='username-input'>Username</label>
            <Field
              type='text'
              id='username-input'
              name='username'
              className={touched.username && errors.username ? 'field-error' : ''}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password-input'>Password</label>
            <Field
              type='text'
              id='password-input'
              name='password'
              className={touched.password && errors.password ? 'field-error' : ''}
            />
          </div>
          {!isSigningIn && (
            <div className='form-group'>
              <label htmlFor='retype-input'>Retype Password</label>
              <Field
                type='text'
                id='retype-input'
                name='passVerify'
                className={touched.passVerify && errors.passVerify ? 'field-error' : ''}
              />
            </div>
          )}
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={handleFormSwitch}
              data-testid='SIGN_UP_MODAL_FORM_BTN'
            >
              {isSigningIn ? 'Create Account Form' : 'Sign In Form'}
            </Button>
            <Button variant='primary' type='submit' data-testid='SIGN_UP_MODAL_SUBMIT_BTN'>
              {isSigningIn ? 'Sign In' : 'Create Account'}
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}

SignUpForm.propTypes = {
  isSigningIn: bool.isRequired,
  handleClose: func.isRequired,
  signUpUser: func.isRequired,
  loginUser: func.isRequired,
  handleFormSwitch: func.isRequired,
};

export default SignUpForm;
