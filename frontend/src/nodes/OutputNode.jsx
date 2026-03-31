import BaseNode from "./BaseNode";

export default function OutputNode({ data }) {
  const theme = data?.theme;

  return (
    <BaseNode
      title="Output Node"
      inputs={["input"]}
      outputs={[]}
      theme={theme}
    >
      <div className="text-xs text-gray-500">
        Final Output
      </div>
    </BaseNode>
  );
}