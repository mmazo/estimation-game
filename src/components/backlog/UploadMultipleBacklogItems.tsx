import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { StoryItem } from "../../types.ts";

export default function UploadMultipleBacklogItems({
  onAdd,
}: Readonly<{ onAdd: (items: StoryItem[]) => void }>) {
  const [stories, setStories] = useState("");
  const textarea: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textarea.current?.focus();
  }, []);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ret: StoryItem[] = [];
    const lines = stories.split("\n");
    for (const element of lines) {
      if (element !== "" && element !== " ") {
        const bi = element.split(" ");
        const number = bi[0];
        bi.splice(0, 1);
        const title = bi.join(" ");
        if (
          number &&
          title &&
          ret.filter((item) => item.id === number).length === 0
        ) {
          ret.push(new StoryItem(number, title));
        }
      }
    }
    onAdd(ret);
  }

  return (
    <Form onSubmit={submit}>
      <Form.Group controlId="multipleStories" className={"mb-3"}>
        <Form.Label>Stories</Form.Label>
        <Form.Control
          as="textarea"
          ref={textarea}
          rows={10}
          value={stories}
          onChange={(e) => setStories(e.target.value)}
          placeholder={
            "STORY_NUMBER_1 Story title 1\nSTORY_NUMBER_2 Story title 2\nSTORY_NUMBER_3 Story title 3\n..."
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={stories === ""}>
        Add
      </Button>
    </Form>
  );
}
