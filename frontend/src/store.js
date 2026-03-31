import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = createWithEqualityFn((set, get) => ({
  mode: 'light',
  toggleTheme: () => set((state) => {
    const newMode = state.mode === 'light' ? 'dark' : 'light';
        
    if (newMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return { mode: newMode };
  }),

  past: [],
  present: {
    nodes: [],
    edges: [],
  },
  future: [],

  nodeIDs: {},

  setStateWithHistory: (newPresent) =>
    set((state) => {
      if (JSON.stringify(state.present) === JSON.stringify(newPresent)) {
        return state;
      }

      return {
        past: [...state.past, state.present],
        present: newPresent,
        future: [],
      };
    }),

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (!newIDs[type]) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    const { present, setStateWithHistory } = get();
    setStateWithHistory({
      nodes: [...present.nodes, node],
      edges: present.edges,
    });
  },

  onNodesChange: (changes) => {
    const { present, setStateWithHistory } = get();
    const updatedNodes = applyNodeChanges(changes, present.nodes);
    setStateWithHistory({
      nodes: updatedNodes,
      edges: present.edges,
    });
  },

  onEdgesChange: (changes) => {
    const { present, setStateWithHistory } = get();
    const updatedEdges = applyEdgeChanges(changes, present.edges);
    setStateWithHistory({
      nodes: present.nodes,
      edges: updatedEdges,
    });
  },

  onConnect: (connection) => {
    const { present, setStateWithHistory } = get();
    const newEdges = addEdge(
      {
        ...connection,
        type: "smoothstep",
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          height: "20px",
          width: "20px",
        },
      },
      present.edges,
    );
    setStateWithHistory({
      nodes: present.nodes,
      edges: newEdges,
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    const { present, setStateWithHistory } = get();
    const updatedNodes = present.nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: { ...node.data, [fieldName]: fieldValue },
        };
      }
      return node;
    });
    setStateWithHistory({
      nodes: updatedNodes,
      edges: present.edges,
    });
  },

  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }),

  reset: () =>
    set({
      past: [],
      present: { nodes: [], edges: [] },
      future: [],
      nodeIDs: {}, 
    }),
}), shallow);