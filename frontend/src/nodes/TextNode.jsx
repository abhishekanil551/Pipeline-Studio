import { useState, useEffect, useRef } from "react";
import BaseNode from "./BaseNode";
import { parseVariables } from "../utils/parseVariables";
import { useStore } from "../store";

export default function TextNode({ id, data }) {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    let vars = parseVariables(text);

    vars = [...new Set(vars)].filter((v) =>
      /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(v)
    );

    setVariables(vars);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  useEffect(() => {
    setText(data?.text || "");
  }, [data?.text]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    updateNodeField(id, "text", value);
  };

  return (
    <BaseNode
      title="Text Node"
      inputs={variables}
      outputs={["output"]}
    >
      {variables.length > 0 && (
        <div className="text-[10px] text-gray-400 mb-1">
          Variables: {variables.join(", ")}
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className="w-full resize-none outline-none bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 rounded-lg p-2 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 transition-all overflow-hidden min-h-[60px]"
        placeholder="Type here or use {{variables}}..."
      />
    </BaseNode>
  );
}