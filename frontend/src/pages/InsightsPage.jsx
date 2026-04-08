import { useAppContext } from '../context/AppContext';
import AIInsights from '../components/AIInsights';
import AIChat from '../components/AIChat';
import EmptyState from '../components/EmptyState';

const InsightsPage = () => {
  const { dataLoaded, results, simpleMode } = useAppContext();

  if (!dataLoaded) {
     return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">AI Insights & Execution</h1>
            <EmptyState title="Brain disconnected" message="Upload data to populate the execution pipeline with insights." />
        </div>
     );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
       <div>
         <h1 className="text-3xl font-extrabold text-slate-800 mb-2">AI Insights & Execution</h1>
         <p className="text-slate-500">Review boardroom transcriptions, execute generated assets, or chat dynamically with the pipeline.</p>
       </div>
       
       <AIInsights results={results} simpleMode={simpleMode} />
       
       <div className="pt-8 border-t border-slate-200">
          <AIChat results={results} />
       </div>
    </div>
  );
};

export default InsightsPage;
