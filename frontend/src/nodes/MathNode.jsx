import BaseNode from "./BaseNode";

export default function MathNode({ data }) {
  return (
    <BaseNode
      title="Math Node"
      inputs={["a", "b"]}
      outputs={["result"]}
    >
      <div className="text-xs">a + b</div>
    </BaseNode>
  );
}