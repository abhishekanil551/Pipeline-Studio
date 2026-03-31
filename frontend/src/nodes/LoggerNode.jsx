import BaseNode from "./BaseNode";

export default function LoggerNode({ data }) {
  return (
    <BaseNode
      title="Logger Node"
      inputs={["input"]}
      outputs={[]}
    >
      <div className="text-xs">Logs Output</div>
    </BaseNode>
  );
}