import React from "react";
import { Button, Modal } from "native-base";

export default ConfirmationModal = ({
  showModal,
  setShowModal,
  title,
  content,
  submitBtnName,
  onSubmit,
}) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => onSubmit()}
              style={{ backgroundColor: "red" }}
            >
              {submitBtnName}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
