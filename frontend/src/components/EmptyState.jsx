import { Database, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ title = "No data available", message = "Upload a dataset to unlock these insights." }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Database size={32} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-slate-500 mb-8 max-w-sm">{message}</p>
        
        <button 
           onClick={() => navigate('/upload')}
           className="btn-primary flex items-center gap-2 shadow-md"
        >
            Upload Dataset <ArrowRight size={18} />
        </button>
    </div>
  );
};

export default EmptyState;
