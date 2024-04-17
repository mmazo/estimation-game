import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UploadMultipleBacklogItems from "./UploadMultipleBacklogItems";
import { StoryItem } from "../../types.ts";

export default function BacklogUploadDialogue({
  onAdd,
}: Readonly<{ onAdd: (items: StoryItem[]) => void }>) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = (items: StoryItem[]) => {
    onAdd(items);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add stories from backlog
      </Button>
      <Modal show={show} onHide={handleClose} size={"xl"}>
        <Modal.Header closeButton>
          <Modal.Title>Add stories for estimation game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadMultipleBacklogItems onAdd={handleAdd} />
        </Modal.Body>
      </Modal>
    </>
  );
}
