import BaseNode from "./BaseNode";

export default function FilterNode({ data }) {
  return (
    <BaseNode
      title="Filter Node"
      inputs={["input"]}
      outputs={["filtered"]}
    >
      <div className="text-xs">Filter Data</div>
    </BaseNode>
  );
}