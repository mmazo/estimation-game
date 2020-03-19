import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import UploadSingleBacklogItem, {TAB_KEY_SINGLE_UPLOAD} from "./UploadSingleBacklogItem";
import UploadMultipleBacklogItems, {TAB_KEY_MULTI_UPLOAD} from "./UploadMultipleBacklogItems";

function BacklogUploadDialogue({onAdd}) {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState(TAB_KEY_SINGLE_UPLOAD);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = (items) => {
        onAdd(items);
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add stories from backlog</Button>
            <Modal show={show} onHide={handleClose} size={'xl'}>
                <Modal.Header closeButton>
                    <Modal.Title>Add stories for estimation game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey={TAB_KEY_SINGLE_UPLOAD} onSelect={setActiveTab}>
                        <Tab eventKey={TAB_KEY_SINGLE_UPLOAD} title="Add one story">
                            <UploadSingleBacklogItem onAdd={handleAdd} activeTab={activeTab}/>
                        </Tab>
                        <Tab eventKey={TAB_KEY_MULTI_UPLOAD} title="Add multiple stories">
                            <UploadMultipleBacklogItems onAdd={handleAdd} activeTab={activeTab}/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BacklogUploadDialogue;
