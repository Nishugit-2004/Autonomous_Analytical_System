import { Database, Wand2, LineChart, BrainCircuit, Lightbulb, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

const PipelineVisualization = ({ state }) => {
  // state: 'idle', 'uploading', 'cleaning', 'analyzing', 'predicting', 'insights', 'complete'
  
  if (state === 'idle') return null;

  const states = ['idle', 'uploading', 'cleaning', 'analyzing', 'predicting', 'insights', 'complete'];
  const currentStateIdx = states.indexOf(state);

  const steps = [
    { id: 'uploading', label: 'Data Ingestion', icon: Database, idx: 1 },
    { id: 'cleaning', label: 'Cleaning', icon: Wand2, idx: 2 },
    { id: 'analyzing', label: 'Analysis', icon: LineChart, idx: 3 },
    { id: 'predicting', label: 'Prediction', icon: BrainCircuit, idx: 4 },
    { id: 'insights', label: 'Insights', icon: Lightbulb, idx: 5 },
    { id: 'complete', label: 'Ready', icon: CheckCircle2, idx: 6 },
  ];

  return (
    <div className="premium-card p-6 w-full overflow-x-auto">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Pipeline Progress</h3>
      
      <div className="flex flex-row items-start justify-between min-w-[700px]">
        {steps.map((step, index) => {
          const isActive = currentStateIdx === step.idx;
          const isDone = currentStateIdx > step.idx || currentStateIdx === 6; // 6 is complete
          const isPending = currentStateIdx < step.idx;

          return (
            <div key={step.id} className="flex flex-row items-center flex-shrink-0">
              <div className={`relative flex flex-col items-center w-24 transition-all duration-500 ${!isPending ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-sm z-10 transition-colors duration-500 ${
                  isDone 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                    : isActive 
                      ? 'bg-primary text-white shadow-primary/30 animate-pulse' 
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  <step.icon size={20} />
                </div>
                
                <span className={`text-xs font-semibold text-center ${!isPending ? 'text-slate-800' : 'text-slate-400'}`}>
                  {step.label}
                </span>
                
                <div className="h-6 mt-1 flex items-center justify-center">
                  {isActive && !isDone && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-primary">
                      <Loader2 size={10} className="animate-spin" /> Working
                    </div>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center justify-center text-slate-300 w-8 md:w-16 mx-1 h-12 pb-8">
                  <div className={`h-[2px] w-full transition-colors duration-500 ${isDone ? 'bg-emerald-400' : 'bg-slate-200'}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineVisualization;
