// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#0B0F19', borderBottom: '1px solid #1E293B' }}>
            <span style={{ color: '#94A3B8', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
                Pipeline Components
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {/* Standard Nodes */}
                <DraggableNode type='customInput' label='📥 Input' />
                <DraggableNode type='llm' label='🧠 LLM' />
                <DraggableNode type='customOutput' label='📤 Output' />
                <DraggableNode type='text' label='📝 Text' />
                
                {/* Our 5 Custom Nodes */}
                <DraggableNode type='vectorDB' label='🗄️ Vector DB' />
                <DraggableNode type='promptTemplate' label='📝 Template' />
                <DraggableNode type='documentLoader' label='📄 Doc Loader' />
                <DraggableNode type='apiFetcher' label='🌐 API Fetcher' />
                <DraggableNode type='imageGen' label='🎨 Image Gen' />
            </div>
        </div>
    );
};