import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ErrorModal({ show, body, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName='error-modal'>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
