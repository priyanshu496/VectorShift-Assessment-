// baseNode.js
import { Handle, Position } from 'reactflow';
import { useStore } from '../store'; // Import the store

export const BaseNode = ({ id, title, handles = [], children }) => {
  // Pull the remove function from the global store
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div 
      style={{ 
        width: 280, 
        backgroundColor: '#1E293B', 
        borderRadius: '12px', 
        border: '1px solid #334155', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Node Header */}
      <div 
        style={{ 
          backgroundColor: '#0F172A', 
          padding: '12px 16px', 
          borderBottom: '1px solid #334155', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#F8FAFC' }}>{title}</span>
        
        {/* Sleek Delete Button */}
        <button 
          onClick={() => removeNode(id)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => { 
            e.currentTarget.style.color = '#EF4444'; // Red on hover
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; 
          }}
          onMouseOut={(e) => { 
            e.currentTarget.style.color = '#64748B'; 
            e.currentTarget.style.backgroundColor = 'transparent'; 
          }}
          title="Delete Node"
        >
          ✕
        </button>
      </div>
      
      {/* Node Content / Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {children}
      </div>

      {/* Dynamic Handles Mapping */}
      {handles.map((h, i) => (
        <Handle
          key={`${id}-${h.id}-${i}`}
          type={h.type}
          position={h.position}
          id={`${id}-${h.id}`}
          style={{ ...h.style }}
        />
      ))}
    </div>
  );
};