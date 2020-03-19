import React, { useState } from 'react';
import './App.css';
import {ReactSortable} from "react-sortablejs";
import Story from "./components/story/Story";
import {TYPE_STORY_ITEM} from "./components/story/StoryItem";
import Partition from "./components/partition/Partition";
import PartitionItem, {TYPE_PARTITION_ITEM} from "./components/partition/PartitionItem";
import BacklogUploadDialogue from "./components/backlog/BacklogUploadDialogue";
import Button from "react-bootstrap/Button";
import fileDownload from "js-file-download";

function App() {
  const [backlog, setBacklog] = useState([]);

  const [estimationTools, setEstimationTools] = useState([
      new PartitionItem(1),
      new PartitionItem(2),
      new PartitionItem(3),
      new PartitionItem(5),
      new PartitionItem(8),
      new PartitionItem(21)
  ]);

  const [estimationList, setEstimationList] = useState([]);

  function reEstimate(modList) {
      if (modList) {
          let currentPartitionSize = 0;
          for (let i = 0; i < modList.length; i++) {
              if(modList[i].type === TYPE_PARTITION_ITEM) {
                  currentPartitionSize = modList[i].size;
              } else if (modList[i].type === TYPE_STORY_ITEM) {
                  modList[i].storyPoints = currentPartitionSize;
              }
          }
          setEstimationList(modList);
      }
  }

  function addItemsToBacklog(items) {
      setBacklog(backlog.concat(items));
  }

  function downloadEstimatedItems() {
      const resp = [];
      for(let i = 0; i < estimationList.length; i++) {
          if (estimationList[i].type === TYPE_STORY_ITEM) {
              resp.push(estimationList[i].id + ': ' + estimationList[i].storyPoints + ' Points. ' + estimationList[i].title);
          }
      }
      fileDownload(resp.join('\n'), 'estimated_stories.txt');
  }

  return (
    <div className="App">
        <div className={'estimation-area'}>
            <ReactSortable list={estimationList}
                           setList={(value) => reEstimate(value)}
                           group={'estimation'}
                           className={'estimation-list'}
                           animation={200}>
                {estimationList.map(item => (item.type === TYPE_STORY_ITEM ? <Story key={item.id} story={item}></Story> : <Partition key={item.id} partition={item}></Partition>))}
            </ReactSortable>
        </div>
        <div className={'estimation-tool-belt'}>
            <div className={'partitions-wrapper'}>
                <ReactSortable list={estimationTools}
                               setList={(value) => {setEstimationTools(value);}}
                               group={'estimation'}
                               className={'estimation-tools'}
                               animation={200}>
                    {estimationTools.map(item => (<Partition key={item.id} partition={item} />))}
                </ReactSortable>
            </div>
            <div className={'backlog-wrapper'}>
                <ReactSortable list={backlog}
                               setList={(value) => {setBacklog(value);}}
                               group={'estimation'}
                               className={'backlog-list'}
                               animation={200}>
                    {backlog.map(item => (<Story key={item.id} story={item}></Story>))}
                </ReactSortable>
            </div>
            <div className={'backlog-actions-wrapper'}>
                <BacklogUploadDialogue onAdd={addItemsToBacklog}/>
                <Button disabled={estimationList.length === 0} onClick={downloadEstimatedItems}>Save estimated stories</Button>
            </div>
        </div>
    </div>
  );
}

export default App;
