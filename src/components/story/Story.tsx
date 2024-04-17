import "./Story.css";
import { StoryItem } from "../../types.ts";

/**
 * Represents single story
 */
export default function Story({ story }: Readonly<{ story: StoryItem }>) {
  const renderMaturityLevelDots = () => {
    const dots = [];
    for (let i = 0; i < story.immaturityLevel; i++) {
      dots.push(<div key={i} className={"story-immaturity-level-dot"}></div>);
    }
    return dots;
  };

  return (
    <div className={"story"}>
      <div className={"story-header"}>
        <div className={"story-id"}>{story.id}</div>
        <div className={"story-points"}>Points: {story.storyPoints}</div>
        <div className={"story-immaturity-level"}>
          {renderMaturityLevelDots()}
        </div>
      </div>
      <div className={"story-title"}>{story.title}</div>
    </div>
  );
}
