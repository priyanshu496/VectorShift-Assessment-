// llmNode.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode id={id} title="🧠 LLM Engine" handles={handles}>
      <div style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.5' }}>
        <span>Processes input through a Large Language Model.</span>
      </div>
    </BaseNode>
  );
};