// textNode.js
import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // 1. Auto-resize logic based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight when shrinking
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(80, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [currText]);

  // 2. Variable parsing logic
  useEffect(() => {
    // Regex to match {{ variableName }} ignoring extra spaces
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)].map(match => match[1]);
    
    // Remove duplicates so we don't create multiple handles for the same variable
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars);
  }, [currText]);

  // 3. Dynamic Handle Generation
  const handles = [
    // Output handle (always present on the right)
    { type: 'source', position: Position.Right, id: 'output' },
    
    // Input handles (dynamically generated on the left)
    ...variables.map((variable, idx) => ({
      type: 'target',
      position: Position.Left,
      id: `var-${variable}`,
      // Space them out evenly along the left edge
      style: { top: `${((idx + 1) * 100) / (variables.length + 1)}%` }
    }))
  ];

  return (
    <BaseNode id={id} title="📝 Text Node" handles={handles}>
      <label>
        Text Input:
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)} 
          placeholder="Type here... Use {{var}} for inputs."
          style={{ 
            width: '100%', 
            minHeight: '60px',
            backgroundColor: '#0F172A', 
            color: '#F8FAFC', 
            border: '1px solid #334155', 
            borderRadius: '6px', 
            padding: '8px', 
            fontFamily: 'inherit',
            fontSize: '13px',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        />
      </label>
    </BaseNode>
  );
};