import { useState } from 'react';
import './App.css';
import { ReactSortable } from 'react-sortablejs';
import Story from './components/story/Story';
import Partition from './components/partition/Partition';
import BacklogUploadDialogue from './components/backlog/BacklogUploadDialogue';
import Button from 'react-bootstrap/Button';
import fileDownload from 'js-file-download';
import { CardItem, CardItemType, PartitionItem, StoryItem } from './types.ts';

export default function App() {
  const [backlog, setBacklog] = useState<CardItem[]>([]);

  const [estimationTools, setEstimationTools] = useState([
    new PartitionItem(1),
    new PartitionItem(2),
    new PartitionItem(3),
    new PartitionItem(5),
    new PartitionItem(8),
    new PartitionItem(13),
    new PartitionItem(21),
  ]);

  const [estimationList, setEstimationList] = useState<CardItem[]>([]);

  function reEstimate(modList: CardItem[]) {
    if (modList) {
      reEstimateStoryPoints(modList);
      reEstimateImmaturityLevel(modList);
      setEstimationList(modList);
    }
  }

  function reEstimateStoryPoints(modList: CardItem[]) {
    let currentPartitionSize = 0;
    for (let i = 0; i < modList.length; i++) {
      if (modList[i].type === CardItemType.TYPE_PARTITION_ITEM) {
        currentPartitionSize = (modList[i] as PartitionItem).size;
      } else if (modList[i].type === CardItemType.TYPE_STORY_ITEM) {
        // re-estimate story points
        (modList[i] as StoryItem).storyPoints = currentPartitionSize;
        // remember current overall position
        (modList[i] as StoryItem).index = i;
      }
    }
  }

  function reEstimateImmaturityLevel(modList: CardItem[]) {
    const onlyStoriesList: StoryItem[] = [...(modList as StoryItem[])].filter(
      (item) => item.type !== CardItemType.TYPE_PARTITION_ITEM
    );
    for (let i = 0; i < onlyStoriesList.length; i++) {
      const storyItem = onlyStoriesList[i];
      // re-estimate immaturity level
      if (
        storyItem.previousStoryPoints &&
        storyItem.previousStoryPoints !== storyItem.storyPoints &&
        storyItem.previousPositionIndex &&
        storyItem.previousPositionIndex !== i
      ) {
        storyItem.immaturityLevel = storyItem.immaturityLevel + 1;
      }
      // remember current estimation for next re-estimation
      storyItem.previousStoryPoints = storyItem.storyPoints;
      storyItem.previousPositionIndex = i;

      // save the changes
      if (storyItem.index && modList[storyItem.index]) {
        modList[storyItem.index] = storyItem;
      }
    }
  }

  function addItemsToBacklog(
    items: CardItem[],
    backlogItems: CardItem[],
    estimationItems: CardItem[]
  ) {
    let onlyNewItems = items.filter((item) => {
      return backlogItems.filter((backlogItem) => backlogItem.id === item.id).length === 0;
    });
    onlyNewItems = onlyNewItems.filter((item) => {
      return estimationItems.filter((estimationItem) => estimationItem.id === item.id).length === 0;
    });
    setBacklog(backlogItems.concat(onlyNewItems));
  }

  function downloadEstimatedItems() {
    const resp: string[] = [];
    for (const element of estimationList) {
      if (element.type === CardItemType.TYPE_STORY_ITEM) {
        resp.push(
          element.id +
            ': ' +
            (element as StoryItem).storyPoints +
            ' Points. ' +
            (element as StoryItem).title
        );
      }
    }
    fileDownload(resp.join('\n'), 'estimated_stories.txt');
  }

  return (
    <div className="App">
      <div className={'estimation-area'}>
        <ReactSortable
          list={estimationList}
          setList={(value) => reEstimate(value)}
          group={'estimation'}
          className={'estimation-list'}
          animation={200}
        >
          {estimationList.map((item) =>
            item.type === CardItemType.TYPE_STORY_ITEM ? (
              <Story key={item.id} story={item as StoryItem} />
            ) : (
              <Partition key={item.id} partition={item as PartitionItem} />
            )
          )}
        </ReactSortable>
      </div>
      <div className={'estimation-tool-belt'}>
        <div className={'partitions-wrapper'}>
          <ReactSortable
            list={estimationTools}
            setList={(value) => {
              setEstimationTools(value);
            }}
            group={'estimation'}
            className={'estimation-tools'}
            animation={200}
          >
            {estimationTools.map((item) => (
              <Partition key={item.id} partition={item} />
            ))}
          </ReactSortable>
        </div>
        <div className={'backlog-wrapper'}>
          <ReactSortable
            list={backlog}
            setList={(value) => {
              setBacklog(value);
            }}
            group={'estimation'}
            className={'backlog-list'}
            animation={200}
          >
            {backlog.map((item) => (
              <Story key={item.id} story={item as StoryItem} />
            ))}
          </ReactSortable>
        </div>
        <div className={'backlog-actions-wrapper'}>
          <BacklogUploadDialogue
            onAdd={(items: CardItem[]) => addItemsToBacklog(items, backlog, estimationList)}
          />
          <Button disabled={estimationList.length === 0} onClick={downloadEstimatedItems}>
            Save estimated stories
          </Button>
        </div>
      </div>
    </div>
  );
}
