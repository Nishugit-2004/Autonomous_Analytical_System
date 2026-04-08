import { CloudLightning, CalendarDays, Camera, BadgeAlert, LocateFixed, Eye } from 'lucide-react';

const Dashboard = ({ results }) => {
  if (!results) return null;

  // Render Vision Results if user scanned a shelf
  if (results.isVision) {
      return (
          <div className="space-y-6">
              <div className="flex items-center gap-2">
                 <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg text-white">
                    <Camera size={24} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800">Visual Shelf Scan Results</h2>
              </div>
              <div className="premium-card p-8 flex flex-col items-center justify-center border-b-4 border-indigo-500 mb-6">
                   <p className="text-sm font-bold text-slate-500 uppercase">Shelf Health Score</p>
                   <p className="text-6xl font-black text-slate-800">{results.overall_health_score}/100</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                  {results.insights.map((insight, idx) => {
                      const isCrit = insight.severity === 'Critical';
                      const Icon = isCrit ? BadgeAlert : (insight.type === 'Misplaced' ? LocateFixed : Eye);
                      const color = isCrit ? 'text-rose-500' : (insight.type === 'Misplaced' ? 'text-amber-500' : 'text-blue-500');
                      const bg = isCrit ? 'bg-rose-100' : (insight.type === 'Misplaced' ? 'bg-amber-100' : 'bg-blue-100');
                      
                      return (
                       <div key={idx} className="premium-card p-6 flex gap-4 items-start">
                          <div className={`p-4 rounded-xl ${bg} ${color}`}>
                              <Icon size={32} />
                          </div>
                          <div>
                              <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-lg font-bold text-slate-800">{insight.type}</h3>
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${bg} ${color}`}>{insight.severity}</span>
                              </div>
                              <p className="text-sm font-bold text-slate-600 mb-1">Target: {insight.product}</p>
                              <p className="text-slate-500 font-medium">{insight.detail}</p>
                          </div>
                       </div>
                      )
                  })}
              </div>
          </div>
      )
  }

  // Normal Dataset Dashboard Logic
  const { kpis, trends, top_products, external_context } = results;

  return (
    <div className="space-y-6">
      
      {/* Real-World Context Connectors */}
      {external_context && external_context.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {external_context.map((ctx, idx) => {
                  const isWeather = ctx.type === 'Weather';
                  const Icon = isWeather ? CloudLightning : CalendarDays;
                  const color = isWeather ? 'text-blue-500 bg-blue-100' : 'text-purple-500 bg-purple-100';
                  
                  return (
                      <div key={idx} className="premium-card p-5 border-l-4 border-l-primary flex items-center gap-4 bg-slate-50">
                         <div className={`p-3 rounded-full ${color}`}>
                             <Icon size={24} />
                         </div>
                         <div>
                             <h4 className="text-sm font-bold text-slate-800">{ctx.type} Context Synced</h4>
                             <p className="text-sm text-slate-600 font-medium">{ctx.description}</p>
                         </div>
                      </div>
                  )
              })}
          </div>
      )}

      {/* Rest of traditional dashboard component ... (since user explicitly wants to enhance App.jsx workflow, we re-hook the dashboard logic) */}
      <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Performers Overview</h3>
          <div className="space-y-4">
            {top_products.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-400">#{idx + 1}</span>
                  <p className="font-bold text-slate-700">{p.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary">${p.sales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
