import { Sparkles, ArrowRight, TrendingUp, Tags, Users, Send } from 'lucide-react';

const AIInsights = ({ results, simpleMode }) => {
  if (!results) return null;

  const { actions, debate = [], marketing = [] } = results;

  // Filter actions for simple mode vs advanced mode
  const displayActions = simpleMode 
    ? actions.slice(0, 3).map(a => a.replace(/Units|Expected Demand|Current Stock/gi, '').trim()) 
    : actions;

  return (
    <div className="space-y-10">
      
      {/* 1. Core Actions */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-lg text-white">
            <Sparkles size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">AI Recommendations</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayActions.length === 0 ? (
            <div className="col-span-2 premium-card p-8 text-center text-slate-500">
              No active recommendations at this moment. Everything looks good!
            </div>
          ) : (
            displayActions.map((action, idx) => {
              const isRestock = action.toLowerCase().includes("restock");
              const isPrice = action.toLowerCase().includes("price") || action.toLowerCase().includes("discount");
              
              const Icon = isRestock ? TrendingUp : (isPrice ? Tags : Sparkles);
              const colorClass = isRestock ? "from-emerald-400 to-emerald-600" : (isPrice ? "from-blue-400 to-blue-600" : "from-primary to-secondary");
              const bgClass = isRestock ? "bg-emerald-50 border-emerald-100" : (isPrice ? "bg-blue-50 border-blue-100" : "bg-indigo-50 border-indigo-100");

              return (
                <div key={idx} className={`relative overflow-hidden premium-card p-6 border group ${bgClass}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b opacity-80 ${colorClass}`}></div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-white shadow-sm text-slate-700`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-800 mb-2">
                         {simpleMode ? (isRestock ? "Buy more stock" : "Change Pricing") : "Action Required"}
                      </h3>
                      <p className="text-slate-600 font-medium">
                        {action}
                      </p>
                    </div>
                    <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary transition-colors mt-1 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300">
                      Apply <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* 2. Autonomous Executions & Agent Debate Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
        
        {/* Agent Debate */}
        {debate.length > 0 && !simpleMode && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Users className="text-primary" /> Inside The Engine
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full ml-auto border border-indigo-200">Agent Debate Log</span>
            </h3>
            
            <div className="premium-card bg-slate-900 border-none overflow-hidden flex flex-col h-[400px]">
              <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span> recording _transcript
              </div>
              
              <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
                {debate.map((stmt, idx) => {
                  const isCEO = stmt.agent.includes("CEO");
                  return (
                    <div key={idx} className={`flex flex-col ${isCEO ? "items-center" : (idx % 2 === 0 ? "items-start" : "items-end")}`}>
                      <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1">{stmt.agent}</span>
                      <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                        isCEO 
                          ? "bg-gradient-to-r from-primary to-secondary text-white font-medium border border-indigo-400/30 text-center shadow-lg w-full" 
                          : (idx % 2 === 0 ? "bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700" : "bg-slate-700 text-slate-100 rounded-tr-sm border border-slate-600")
                      }`}>
                        {stmt.message}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Generative Executions */}
        {marketing.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Send className="text-emerald-500" /> Auto-Generated Assets
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full ml-auto flex items-center gap-1 border border-emerald-200"><Sparkles size={12}/> Ready to Send</span>
            </h3>
            
            <div className="space-y-4 h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {marketing.map((asset, idx) => (
                <div key={idx} className="premium-card p-5 border border-slate-200 hover:border-emerald-300 transition-colors group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded">
                      {asset.type}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Target: {asset.target}</span>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 font-medium whitespace-pre-wrap font-sans">
                    {asset.content}
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                      Copy Text
                    </button>
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-emerald-500/20">
                      <Send size={14} /> Execute Target
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIInsights;
