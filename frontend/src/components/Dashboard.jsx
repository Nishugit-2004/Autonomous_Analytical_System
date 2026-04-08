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
  const { kpis, trends, top_products, external_context, seasonal_intelligence, collaboration_intelligence } = results;

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

      {/* Product Collaboration Insights */}
      {collaboration_intelligence && (
          <div className="premium-card overflow-hidden border-2 border-indigo-100">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-500 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                          <Eye size={24} /> Product Collaboration Insights
                      </h3>
                      <p className="text-indigo-100 font-medium mt-1">
                          Live Intelligence across {collaboration_intelligence.network_size} retailers in {collaboration_intelligence.category}
                      </p>
                  </div>
                  <div className="flex gap-2">
                       <span className="bg-white/20 px-4 py-2 rounded-lg font-bold text-sm backdrop-blur border border-white/30 text-white shadow-sm">
                           {collaboration_intelligence.network_size} Collaborators
                       </span>
                  </div>
              </div>

              <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 bg-slate-50">
                  {/* Shared Product Intelligence & Recommendations */}
                  <div className="xl:col-span-1 space-y-6">
                      <div>
                          <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3">📡 Shared Intelligence</h4>
                          <div className="space-y-2">
                              {collaboration_intelligence.shared_insights.map((insight, idx) => (
                                  <div key={idx} className="flex gap-2 items-start bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                                      <div className="text-indigo-500 mt-0.5">•</div>
                                      <p className="text-sm font-medium text-slate-700">{insight}</p>
                                  </div>
                              ))}
                          </div>
                      </div>

                      <div>
                          <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3">💡 Collaborative Actions</h4>
                          <div className="space-y-2">
                              {collaboration_intelligence.ai_recommendations.map((rec, idx) => (
                                  <div key={idx} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                      <div className="text-emerald-500 mt-0.5"><BadgeAlert size={14} /></div>
                                      <p className="text-sm font-medium text-slate-700">{rec}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  {/* Comparative Product-Level Analytics */}
                  <div className="xl:col-span-2 space-y-4">
                      {collaboration_intelligence.product_level_data.map((item, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between transition-all hover:border-indigo-300">
                              <div className="flex-1 w-full">
                                  <h4 className="font-bold text-lg text-slate-800">{item.product}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded uppercase">Trend: {item.growth}</span>
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${item.stock_availability === 'Low' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                                          Stock: {item.stock_availability}
                                      </span>
                                  </div>
                              </div>
                              <div className="flex gap-6 w-full md:w-auto mt-4 md:mt-0">
                                  <div className="text-center md:text-right">
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Your Demand</p>
                                      <p className="font-black text-slate-700 text-lg">{item.my_demand}</p>
                                      <p className="text-[10px] sm:text-xs font-semibold text-indigo-500 mt-0.5">Net: {item.network_total_demand}</p>
                                  </div>
                                  <div className="w-px bg-slate-200 self-stretch"></div>
                                  <div className="text-center md:text-right">
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Your Price</p>
                                      <p className="font-black text-slate-700 text-lg">${item.my_price}</p>
                                      <p className="text-[10px] sm:text-xs font-semibold text-rose-500 mt-0.5">
                                          Avg: ${item.network_avg_price}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Seasonal and Trending Intelligence System */}
      {seasonal_intelligence && (
          <div className="premium-card overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                      <div>
                         <h3 className="text-2xl font-bold flex items-center gap-2">
                            <CalendarDays size={24} /> Seasonal Intelligence
                         </h3>
                         <p className="text-emerald-100 font-medium mt-1">AI-Powered Quarterly Strategy Engine</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur pb-1 pt-1 pl-4 pr-4 rounded-full border border-white/30 text-center">
                         <span className="text-xs uppercase tracking-wider font-bold text-emerald-50">Current Season</span>
                         <p className="text-lg font-black">{seasonal_intelligence.season}</p>
                      </div>
                  </div>
                  <p className="text-sm bg-black/20 p-3 rounded-lg border border-black/10 inline-block font-medium">
                      {seasonal_intelligence.quarterly_strategy}
                  </p>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50">
                  {/* Trending Products */}
                  <div>
                      <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-4">🔥 Trending Products</h4>
                      <div className="space-y-3">
                          {seasonal_intelligence.trending_products.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                                  <span className="font-bold text-slate-700">{item.product}</span>
                                  <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{item.growth}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Profit Optimization Recommendations */}
                  <div>
                      <h4 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-4">💼 Management Recommendations</h4>
                      <div className="space-y-3">
                          {seasonal_intelligence.recommended_actions.map((action, idx) => (
                              <div key={idx} className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                                  <div className="text-primary mt-0.5"><Eye size={16} /></div>
                                  <p className="text-sm font-medium text-slate-700">{action}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Rest of traditional dashboard component */}
      <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Performers Overview</h3>
          <div className="space-y-4">
            {top_products.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors">
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
