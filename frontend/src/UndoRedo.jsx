// UndoRedo.jsx
import { useStore } from "./store";
import { Undo, Redo, RotateCcw } from "lucide-react";

export default function UndoRedo() {
  const { undo, redo, reset } = useStore();

  return (
    <div className="flex gap-2">
      <button
        onClick={undo}
        className="p-2 rounded-lg  hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={redo}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Redo"
      >
        <Redo size={18} />
      </button>
      <button
        onClick={reset}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Reset"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
}