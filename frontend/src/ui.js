// ui.js
import { useState, useRef, useCallback } from 'react';
// 1. Added ConnectionMode to the imports here
import ReactFlow, { Controls, Background, MiniMap, ConnectionMode } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Import Core Nodes
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

// Import Custom Nodes
import { 
  VectorDBNode, 
  PromptTemplateNode, 
  DocumentLoaderNode, 
  APIFetcherNode, 
  ImageGeneratorNode 
} from './nodes/customNodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all node types mapping
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  vectorDB: VectorDBNode,
  promptTemplate: PromptTemplateNode,
  documentLoader: DocumentLoaderNode,
  apiFetcher: APIFetcherNode,
  imageGen: ImageGeneratorNode
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
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
      nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) return;
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh', backgroundColor: '#0F172A'}}>
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
                connectionLineType='smoothstep'
                connectionMode={ConnectionMode.Loose} /* 2. Added this line so nodes connect from any direction */
            >
                {/* Dark mode background mapping */}
                <Background color="#334155" gap={gridSize} size={1} />
                <Controls />
                <MiniMap 
                   nodeColor={(node) => '#6366f1'} 
                   maskColor="rgba(11, 15, 25, 0.7)" 
                   style={{ backgroundColor: '#1E293B' }} 
                   pannable={true} /* 👈 Makes the rectangle draggable to pan the canvas */
                   zoomable={true} /* 👈 Allows scrolling in the minimap to zoom */
                />
            </ReactFlow>
        </div>
    )
}