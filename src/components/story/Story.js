import React from 'react';
import './Story.css';

/**
 * Represents single story
 * @param story: StoryItem {id, type, storyPoints, title, immaturityLevel}
 * @returns {*}
 * @constructor
 */
function Story({story}) {

    const renderMaturityLevelDots = () => {
        let dots = [];
        for(let i = 0; i < story.immaturityLevel; i++) {
            dots.push(<div key={i} className={'story-immaturity-level-dot'}></div>);
        }
        return dots;
    }

    return(
        <div className={'story'}>
            <div className={'story-header'}>
                <div className={'story-id'}>{story.id}</div>
                <div className={'story-points'}>Points: {story.storyPoints}</div>
                <div className={'story-immaturity-level'}>{renderMaturityLevelDots()}</div>
            </div>
            <div className={'story-title'}>{story.title}</div>
        </div>
    );
}

export default Story;
