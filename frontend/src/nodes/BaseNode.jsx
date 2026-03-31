import { Handle, Position } from "reactflow";

export default function BaseNode({
  title,
  children,
  inputs = [],
  outputs = [],
  theme,
}) {
  return (
    <div
      className="min-w-[220px] rounded-md text-zinc-300 border border-slate-200 dark:border-zinc-700 bg-white dark:bg-neutral-800 p-4 shadow-sm hover:shadow-md transition-all duration-200 group"

    >
      <div className="font-semibold mb-3 text-sm text-zinc-500 text-slate-900">{title}</div>

      <div className="text-xs text-slate-600 ">{children}</div>

      {inputs.map((input, i) => (
        <Handle
          key={i}
          type="target"
          position={Position.Left}
          id={input}
          style={{
            top: 52 + i * 24,
            width: '10px',
            height: '10px',
          }}
        />
      ))}

      {outputs.map((output, i) => (
        <Handle
          key={i}
          type="source"
          position={Position.Right}
          id={output}
          style={{
            top: 52 + i * 24,
            width: '10px',
            height: '10px',
            backgroundColor: '#10B981',
            border: '2px solid #fff'
          }}
        />
      ))}
    </div>
  );
}
