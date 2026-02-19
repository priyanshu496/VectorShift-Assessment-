// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import toast from 'react-hot-toast'; // 👈 Import toast

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);

    const handleSubmit = async () => {
        // 1. Show a loading toast immediately
        const loadingToast = toast.loading('Analyzing pipeline...', {
            style: { background: '#1E293B', color: '#F8FAFC', border: '1px solid #334155' }
        });

        try {
            // 👇 UPDATED: Pointing to your live Render backend!
            const response = await fetch('https://vectorshift-assessment-backend-lk32.onrender.com/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            // 2. Dismiss the loading toast
            toast.dismiss(loadingToast);

            // 3. Trigger our beautiful custom success toast
            toast.custom((t) => (
                <div style={{
                    backgroundColor: '#1E293B',
                    color: '#F8FAFC',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    minWidth: '260px',
                    animation: t.visible ? 'enter 0.2s ease-out forwards' : 'leave 0.2s ease-in forwards'
                }}>
                    {/* Toast Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                        <span style={{ fontSize: '18px' }}>📊</span>
                        <strong style={{ fontSize: '15px', letterSpacing: '0.5px' }}>Pipeline Analysis</strong>
                    </div>
                    
                    {/* Toast Body / Metrics */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#94A3B8' }}>Nodes Count:</span>
                        <strong style={{ color: '#818cf8' }}>{data.num_nodes}</strong>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#94A3B8' }}>Edges Count:</span>
                        <strong style={{ color: '#818cf8' }}>{data.num_edges}</strong>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ color: '#94A3B8' }}>Valid DAG:</span>
                        <span style={{ 
                            backgroundColor: data.is_dag ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                            color: data.is_dag ? '#4ADE80' : '#F87171', 
                            padding: '4px 10px', 
                            borderRadius: '12px', 
                            fontSize: '12px', 
                            fontWeight: '600',
                            border: `1px solid ${data.is_dag ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                        }}>
                            {data.is_dag ? '✅ Passed' : '❌ Cycle Detected'}
                        </span>
                    </div>
                </div>
            ), { duration: 5000 }); // Stays on screen for 5 seconds

        } catch (error) {
            console.error("Error submitting pipeline:", error);
            toast.dismiss(loadingToast);
            
            // Error Toast
            toast.error("Failed to connect to backend.", {
                style: { background: '#1E293B', color: '#F8FAFC', border: '1px solid #EF4444' }
            });
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#0B0F19' }}>
            <button 
                onClick={handleSubmit} 
                style={{
                    backgroundColor: '#6366f1',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                Submit Pipeline
            </button>
        </div>
    );
};