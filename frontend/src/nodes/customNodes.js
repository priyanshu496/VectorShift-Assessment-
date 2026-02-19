// customNodes.js
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

// 1. Vector Database Node
export const VectorDBNode = ({ id }) => (
  <BaseNode 
    id={id} 
    title="🗄️ Vector Database" 
    handles={[
      { type: 'target', position: Position.Left, id: 'embeddings' }, 
      { type: 'source', position: Position.Right, id: 'results' }
    ]}
  >
    <div style={{ fontSize: '12px', color: '#94A3B8' }}>Stores and queries high-dimensional vectors.</div>
  </BaseNode>
);

// 2. Prompt Template Node
export const PromptTemplateNode = ({ id }) => (
  <BaseNode 
    id={id} 
    title="📝 Prompt Template" 
    handles={[
      { type: 'target', position: Position.Left, id: 'variables' }, 
      { type: 'source', position: Position.Right, id: 'formatted-prompt' }
    ]}
  >
    <label>
      Template:
      <textarea rows="2" placeholder="You are a helpful AI..." style={{ width: '100%', resize: 'none' }} />
    </label>
  </BaseNode>
);

// 3. Document Loader Node
export const DocumentLoaderNode = ({ id }) => (
  <BaseNode 
    id={id} 
    title="📄 Document Loader" 
    handles={[{ type: 'source', position: Position.Right, id: 'raw-text' }]}
  >
    <label>
      Source URL:
      <input type="text" placeholder="https://..." />
    </label>
  </BaseNode>
);

// 4. API Fetcher Node
export const APIFetcherNode = ({ id }) => (
  <BaseNode 
    id={id} 
    title="🌐 API Fetcher" 
    handles={[
      { type: 'target', position: Position.Left, id: 'endpoint' }, 
      { type: 'source', position: Position.Right, id: 'json-data' }
    ]}
  >
    <label>
      Method:
      <select>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
    </label>
  </BaseNode>
);

// 5. Image Generator Node
export const ImageGeneratorNode = ({ id }) => (
  <BaseNode 
    id={id} 
    title="🎨 Image Generator" 
    handles={[
      { type: 'target', position: Position.Left, id: 'prompt' }, 
      { type: 'source', position: Position.Right, id: 'image-url' }
    ]}
  >
     <div style={{ fontSize: '12px', color: '#94A3B8' }}>Generates visual assets via Stable Diffusion.</div>
  </BaseNode>
);