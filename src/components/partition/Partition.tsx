import "./Partition.css";
import { PartitionItem } from "../../types.ts";

/**
 * Represents a single partition
 */
function Partition({ partition }: Readonly<{ partition: PartitionItem }>) {
  return (
    <div className={"partition"}>
      <div className={"partition-size"}>{partition.size}</div>
    </div>
  );
}

export default Partition;
