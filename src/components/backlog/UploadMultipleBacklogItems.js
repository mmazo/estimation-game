import React, {useEffect, useRef, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StoryItem from "../story/StoryItem";

function UploadMultipleBacklogItems({onAdd}) {

    const [stories, setStories] = useState('');
    const textarea = useRef();

    useEffect(() => {
        textarea.current.focus();
    },[]);

    function submit(e) {
        e.preventDefault();
        const ret = [];
        const lines = stories.split('\n');
        for(let i = 0;i < lines.length;i++) {
            const bi = lines[i].split(' ');
            const number = bi[0];
            bi.splice(0,1);
            const title = bi.join(' ');
            ret.push(new StoryItem(number, title));
        }
        onAdd(ret);
    }

    return(<Form onSubmit={submit}>
        <Form.Group controlId="multipleStories">
            <Form.Label>Stories</Form.Label>
            <Form.Control as="textarea" ref={textarea}
                          rows="10"
                          value={stories}
                          onChange={(e) => setStories(e.target.value)}
                          placeholder={'STORY_NUMBER_1 Story title 1\nSTORY_NUMBER_2 Story title 2\nSTORY_NUMBER_3 Story title 3\n...'} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={stories === ''}>Add</Button>
    </Form>);
}

export { UploadMultipleBacklogItems as default };
