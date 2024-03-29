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
      new PartitionItem(13),
      new PartitionItem(21)
  ]);

  const [estimationList, setEstimationList] = useState([]);

  function reEstimate(modList) {
      if (modList) {
          reEstimateStoryPoints(modList);
          reEstimateImmaturityLevel(modList);
          setEstimationList(modList);
      }
  }

  function reEstimateStoryPoints(modList) {
      let currentPartitionSize = 0;
      for (let i = 0; i < modList.length; i++) {
          if(modList[i].type === TYPE_PARTITION_ITEM) {
              currentPartitionSize = modList[i].size;
          } else if (modList[i].type === TYPE_STORY_ITEM) {
              // re-estimate story points
              modList[i].storyPoints = currentPartitionSize;
              // remember current overall position
              modList[i].index = i;
          }
      }
  }

  function reEstimateImmaturityLevel(modList) {
      const onlyStoriesList = [...modList].filter(item => item.type !== TYPE_PARTITION_ITEM);
      for (let i = 0; i < onlyStoriesList.length; i++) {
          // re-estimate immaturity level
          if (onlyStoriesList[i].previousStoryPoints &&
              onlyStoriesList[i].previousStoryPoints !== onlyStoriesList[i].storyPoints &&
              onlyStoriesList[i].previousPositionIndex &&
              onlyStoriesList[i].previousPositionIndex !== i) {
              onlyStoriesList[i].immaturityLevel = onlyStoriesList[i].immaturityLevel + 1;
          }
          // remember current estimation for next re-estimation
          onlyStoriesList[i].previousStoryPoints = onlyStoriesList[i].storyPoints;
          onlyStoriesList[i].previousPositionIndex = i;

          // save the changes
          if (modList[onlyStoriesList[i].index]) {
              modList[onlyStoriesList[i].index] = onlyStoriesList[i];
          }
      }
  }

  function addItemsToBacklog(items, backlogItems, estimationItems) {
      let onlyNewItems = items.filter(item => {
          return backlogItems.filter(backlogItem => backlogItem.id === item.id).length === 0;
      });
      onlyNewItems = onlyNewItems.filter(item => {
          return estimationItems.filter(estimationItem => estimationItem.id === item.id).length === 0;
      });
      setBacklog(backlogItems.concat(onlyNewItems));
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
                {estimationList.map(item => (item.type === TYPE_STORY_ITEM ? <Story key={item.id} story={item} /> : <Partition key={item.id} partition={item} />))}
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
                    {backlog.map(item => (<Story key={item.id} story={item} />))}
                </ReactSortable>
            </div>
            <div className={'backlog-actions-wrapper'}>
                <BacklogUploadDialogue onAdd={(items) => addItemsToBacklog(items, backlog, estimationList)}/>
                <Button disabled={estimationList.length === 0} onClick={downloadEstimatedItems}>Save estimated stories</Button>
            </div>
        </div>
    </div>
  );
}

export default App;
