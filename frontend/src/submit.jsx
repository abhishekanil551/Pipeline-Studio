// SubmitButton.jsx (clean & modern)
import { useState , useEffect} from "react";
import { useStore } from "./store";
import { Play } from "lucide-react";

export function SubmitButton() {
  const [result, setResult] = useState(null);

useEffect(() => {
  const handleClick = () => {
    if (result) setResult(null);
  };

  window.addEventListener("click", handleClick);

  return () => window.removeEventListener("click", handleClick);
}, [result]);

  const handleSubmit = async () => {
    const { present } = useStore.getState();
    const { nodes, edges } = present;

    try {
      const res = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 px-2 py-1 bg-zinc-500/70 hover:bg-zinc-400/70 text-white font-medium rounded-md shadow-lg shadow-blue-500/10 transition-all active:scale-95"       >
        <Play size={15} />
        Submit
      </button>

{result && (
  <div className="fixed right-5 bottom-[250px] z-50 bg-neutral-900/80 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg text-sm">
    <div><span className="font-semibold">Nodes:</span> {result.num_nodes}</div>
    <div><span className="font-semibold">Edges:</span> {result.num_edges}</div>
    <div>
      <span className="font-semibold">Status:</span>{" "}
      {result.is_dag ? (
        <span className="text-green-400">Valid DAG ✅</span>
      ) : (
        <span className="text-red-400">Invalid (Cycle) ❌</span>
      )}
    </div>
  </div>
)}
    </>

  );
}