const TYPE_STORY_ITEM = 'STORY_ITEM';

class StoryItem {
    constructor(id, title) {
        this.type = TYPE_STORY_ITEM
        this.id = id;
        this.storyPoints = 0;
        this.immaturityLevel = 0;
        this.title = title;
        this.index = undefined;
        this.previousStoryPoints = undefined;
        this.previousPositionIndex = undefined;
    }
}

export { StoryItem as default, TYPE_STORY_ITEM };
