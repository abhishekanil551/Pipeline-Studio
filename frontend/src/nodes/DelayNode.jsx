import BaseNode from "./BaseNode";

export default function DelayNode({ data }) {
  return (
    <BaseNode
      title="Delay Node"
      inputs={["input"]}
      outputs={["output"]}
    >
      <div className="text-xs">Delay Processing</div>
    </BaseNode>
  );
}