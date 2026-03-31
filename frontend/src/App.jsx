import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import UndoRedo from "./UndoRedo";
import { useStore } from "./store";
import './index.css';


function App() {
  const mode = useStore((state) => state.mode);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-[#1E1F20] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all font-medium text-sm"
      >
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </button>

      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1F20] shadow-sm z-10">
        <PipelineToolbar />
      </div>

      <div className="flex-1 overflow-hidden relative">
        <PipelineUI />
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E1F20] px-6 py-4 flex justify-between items-center shadow-lg z-10 h-10">
        <UndoRedo />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;