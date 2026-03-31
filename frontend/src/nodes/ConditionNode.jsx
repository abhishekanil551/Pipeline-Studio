import BaseNode from "./BaseNode";

export default function ConditionNode({ data }) {
  return (
    <BaseNode
      title="Condition Node"
      inputs={["input"]}
      outputs={["true", "false"]}
    >
      <div className="text-xs">If / Else</div>
    </BaseNode>
  );
}