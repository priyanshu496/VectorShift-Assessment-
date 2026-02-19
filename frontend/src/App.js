// App.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toaster } from 'react-hot-toast'; // 👈 Import Toaster

function App() {
  return (
    <div>
      {/* 👈 Add Toaster component here */}
      <Toaster position="top-center" reverseOrder={false} /> 
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;