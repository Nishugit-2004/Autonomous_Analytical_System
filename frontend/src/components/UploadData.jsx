import { useState } from 'react';
import { Upload, FileText, CheckCircle, BrainCircuit } from 'lucide-react';

const UploadData = ({ setDataLoaded, setResults, setActiveTab }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); 

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const processData = async () => {
    if (!file) return;
    setLoading(true);
    setStep(1); // Uploading
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // Step 1: Upload
      const uploadRes = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      
      setStep(2); // Running Agents
      
      // Step 2: Run Pipeline
      const pipelineRes = await fetch("http://localhost:8000/api/pipeline/run");
      if (!pipelineRes.ok) throw new Error("Pipeline failed");
      const results = await pipelineRes.json();
      
      setResults(results);
      setStep(3); // Done
      setTimeout(() => {
        setDataLoaded(true);
        setActiveTab('dashboard');
      }, 1000);
      
    } catch (err) {
      console.error(err);
      alert("Error processing data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-white mb-4">Autonomous Data Ingestion</h2>
        <p className="text-slate-400">Upload your raw CSV/Excel file and let the AI agents clean, analyze, and forecast.</p>
      </div>

      <div 
        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
          file ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-slate-800 rounded-2xl shadow-inner border border-slate-700">
            {file ? <FileText size={48} className="text-blue-400" /> : <Upload size={48} className="text-slate-400" />}
          </div>
        </div>
        
        {file ? (
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{file.name}</h3>
            <p className="text-sm text-slate-400 mb-6">{(file.size / 1024).toFixed(2)} KB • Ready for processing</p>
            
            <button 
              onClick={processData}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center mx-auto gap-2 group w-64"
            >
              {loading ? (
                <BrainCircuit className="animate-pulse" />
              ) : (
                <CheckCircle className="group-hover:scale-110 transition-transform" />
              )}
              {loading ? "Agents Operating..." : "Deploy Agents"}
            </button>
            
            {loading && (
              <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                <div className={`flex items-center gap-3 ${step >= 1 ? 'text-blue-400' : 'text-slate-600'}`}>
                  <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-blue-400 animate-ping' : 'bg-slate-700'}`}></div>
                  Data Ingestion Agent...
                </div>
                <div className={`flex items-center gap-3 ${step >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}>
                  <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'}`}></div>
                  Cleaning & Forecasting Agents...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Drag and drop your dataset</h3>
            <p className="text-sm text-slate-400 mb-6">Supports .CSV and .XLSX files</p>
            <div className="flex justify-center">
              <label className="px-6 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg border border-slate-700 hover:bg-slate-700 cursor-pointer">
                Browse Files
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".csv,.xlsx,.xls" 
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadData;
