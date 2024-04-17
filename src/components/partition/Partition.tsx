import "./Partition.css";
import { PartitionItem } from "../../types.ts";

/**
 * Represents a single partition
 */
export default function Partition({
  partition,
}: Readonly<{ partition: PartitionItem }>) {
  return (
    <div className={"partition"}>
      <div className={"partition-size"}>{partition.size}</div>
    </div>
  );
}
