import BaseNode from "./BaseNode";
import { useStore } from "../store";
import { useState } from "react";

export default function InputNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [inputName, setInputName] = useState(data?.inputName || "");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputName(value);
    updateNodeField(id, "inputName", value);
  };

  return (
    <BaseNode
      title="Input Node"
      inputs={[]}                 
      outputs={["output"]}       
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Input Name</label>
        <input 
          type="text" 
          value={inputName}
          onChange={handleChange}
          placeholder="e.g. user_prompt"
          className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-lg p-2 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
        />
      </div>
    </BaseNode>
  );
}