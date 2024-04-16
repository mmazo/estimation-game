export enum CardItemType {
  TYPE_STORY_ITEM = "STORY_ITEM",
  TYPE_PARTITION_ITEM = "PARTITION_ITEM",
}

export type CardItem = {
  id: number | string;
  type: CardItemType;
};
export class StoryItem {
  type: CardItemType;
  id: string;
  storyPoints: number;
  immaturityLevel: number;
  title: string;
  index: number | undefined;
  previousStoryPoints: number | undefined;
  previousPositionIndex: number | undefined;

  constructor(id: string, title: string) {
    this.type = CardItemType.TYPE_STORY_ITEM;
    this.id = id;
    this.storyPoints = 0;
    this.immaturityLevel = 0;
    this.title = title;
    this.index = undefined;
    this.previousStoryPoints = undefined;
    this.previousPositionIndex = undefined;
  }
}

export class PartitionItem {
  id: number;
  type: CardItemType;
  size: number;
  constructor(size: number) {
    this.id = size;
    this.type = CardItemType.TYPE_PARTITION_ITEM;
    this.size = size;
  }
}
