import React, {useEffect, useRef, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StoryItem from "../story/StoryItem";

const TAB_KEY_SINGLE_UPLOAD = 'UploadSingleBacklogItem';

function UploadSingleBacklogItem({onAdd, activeTab}) {

    const [number, setNumber] = useState('');
    const [title, setTitle] = useState('');

    const input = useRef();

    useEffect(() => {
        if (TAB_KEY_SINGLE_UPLOAD === activeTab) {
            input.current.focus();
        }
    },[activeTab]);

    function submit(e) {
        e.preventDefault();
        onAdd([new StoryItem(number, title)]);
    }

    return(<Form onSubmit={submit}>
        <Form.Group controlId="formStoryId">
            <Form.Label>Story number</Form.Label>
            <Form.Control type="text"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          ref={input}
                          placeholder={'STORY_NUMBER'} />
        </Form.Group>
        <Form.Group controlId="formStoryTitle">
            <Form.Label>Story title</Form.Label>
            <Form.Control type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder={'STORY_TITLE'} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!(number !== '' && title !== '')}>Add</Button>
    </Form>);
}

export { UploadSingleBacklogItem as default, TAB_KEY_SINGLE_UPLOAD };
