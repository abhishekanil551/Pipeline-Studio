import BaseNode from "./BaseNode";
import { useStore } from "../store";

export default function LLMNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const currentModel = data?.model || "GPT-3.5";

  const handleChange = (e) => {
    updateNodeField(id, "model", e.target.value);
  };

  return (
    <BaseNode
      title="LLM Node"
      inputs={["input"]}
      outputs={["response"]}
    >
      <div className="flex flex-col gap-2">
        <div className="font-medium text-xs text-slate-500 dark:text-slate-400">Model Configuration</div>
        <select
          value={currentModel}
          onChange={handleChange}
          className="text-sm border border-slate-200 dark:border-neutral-700 rounded-lg p-2 bg-slate-50 dark:bg-neutral-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="GPT-3.5">GPT-3.5</option>
          <option value="GPT-4">GPT-4</option>
          <option value="Claude-3">Claude 3</option>
        </select>
      </div>
    </BaseNode>
  );
}