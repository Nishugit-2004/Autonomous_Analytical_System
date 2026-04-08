import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import UploadAction from '../components/UploadAction';
import PipelineVisualization from '../components/PipelineVisualization';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const { setDataLoaded, setResults } = useAppContext();
  const [pipelineState, setPipelineState] = useState('idle');
  const navigate = useNavigate();

  const handleDataLoadedComplete = (status) => {
      setDataLoaded(status);
      if(status) {
         navigate('/dashboard');
      }
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-4xl mx-auto pt-8">
       <div>
         <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Data Ingestion Engine</h1>
         <p className="text-slate-500">Upload CSV datasets or physical shelf images to initiate multi-agent analysis.</p>
       </div>
       
       <UploadAction 
         setDataLoaded={handleDataLoadedComplete} 
         setResults={setResults} 
         setPipelineState={setPipelineState} 
       />
       <PipelineVisualization state={pipelineState} />
    </div>
  );
};

export default UploadPage;
