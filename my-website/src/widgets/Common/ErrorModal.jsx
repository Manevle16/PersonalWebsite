import React from 'react';
import { func, bool, string } from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

function ErrorModal({ show, body, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName='error-modal'>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} data-testid='ERROR_MODAL_CLOSE_BTN'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ErrorModal.propTypes = {
  show: bool.isRequired,
  body: string.isRequired,
  onHide: func.isRequired,
};

export default ErrorModal;
