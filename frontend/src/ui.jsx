import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import InputNode from "./nodes/InputNode";
import LLMNode from "./nodes/LLMNode";
import OutputNode from "./nodes/OutputNode";
import TextNode from "./nodes/TextNode";
import FilterNode from "./nodes/FilterNode";
import MathNode from "./nodes/MathNode";
import DelayNode from "./nodes/DelayNode";
import ConditionNode from "./nodes/ConditionNode";
import LoggerNode from "./nodes/LoggerNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,

  filter: FilterNode,
  math: MathNode,
  delay: DelayNode,
  condition: ConditionNode,
  logger: LoggerNode,
};

const selector = (state) => ({
  nodes: state.present.nodes,
  edges: state.present.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const { nodeType: type } = JSON.parse(data);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: {
          ...getInitNodeData(nodeID, type),
        },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode, getNodeID],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const mode = useStore((state) => state.mode);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        style={{ width: "100vw", height: "89vh", position: "relative" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          connectionMode="loose"
        >
          <Background />
          <Controls />
          <MiniMap
            pannable
            zoomable
            nodeColor={mode === "dark" ? "#f2f3f4" : "#e2e2e2"}
            nodeStrokeColor="#2c2d2e"
            nodeStrokeWidth={2}
            maskColor="rgba(44, 45, 46, 0.3)"
          />
        </ReactFlow>
      </div>
    </>
  );
};
