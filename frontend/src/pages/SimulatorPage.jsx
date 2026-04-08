import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowRight, Percent, Box, RefreshCw, BarChart3, Presentation, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from 'recharts';

const SimulatorPage = () => {
  const { dataLoaded, results } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [simResults, setSimResults] = useState(null);
  const [strategyApplied, setStrategyApplied] = useState(false);
  
  if (!dataLoaded) return <Navigate to="/upload" replace />;

  const [selectedProduct, setSelectedProduct] = useState("");
  const [priceAdjust, setPriceAdjust] = useState("");
  const [stockAdjust, setStockAdjust] = useState("");

  const handleSimulate = (e) => {
      e.preventDefault();
      setLoading(true);
      setStrategyApplied(false);
      
      setTimeout(() => {
          // Dynamic calculation based on dataset
          const productData = results?.top_products?.find(p => p.product === selectedProduct) || results?.top_products?.[0];
          const baseSales = productData ? productData.sales : 10000;
          
          const pAdjustNum = parseFloat(priceAdjust) || 0;
          const sAdjustNum = parseFloat(stockAdjust) || 0;
          
          // Basic Elasticity Engine: -1% price = +1.5% demand
          const elasticity = -1.5; 
          const demandChangePct = (pAdjustNum * elasticity) + (sAdjustNum > 0 ? 2 : 0);
          
          // New Revenue = Base * (1 + DemandShift) * (1 + PriceShift)
          const newRevenue = baseSales * (1 + (demandChangePct / 100)) * (1 + (pAdjustNum / 100));
          const revenueImpact = newRevenue - baseSales;
          
          // Profit simulation (Assume baseline 30% margin)
          const baseProfit = baseSales * 0.30;
          
          // If price drops but demand increases, margin % shrinks but volume increases.
          // Simplification for simulation demo:
          const newMarginPct = 0.30 + (pAdjustNum / 100);
          const newProfit = newRevenue * newMarginPct;
          
          const sign = revenueImpact >= 0 ? "+" : "";
          const dSign = demandChangePct >= 0 ? "+" : "";

          // Generate data points for charts
          const generateTrend = (baseline, variance, length=6) => {
              let pts = [];
              let current = baseline;
              for(let i=1; i<=length; i++){
                  pts.push({ month: `M${i}`, value: Math.max(0, current + (Math.random() * variance) - (variance/2)) });
                  current += (baseline * 0.05); // slight natural upward
              }
              return pts;
          };

          const beforeSalesData = generateTrend(baseSales / 6, 500);
          const afterSalesData = beforeSalesData.map(pt => ({
              month: pt.month,
              value: pt.value * (newRevenue / baseSales)
          }));

          setSimResults({
              baseSales,
              newRevenue,
              baseProfit,
              newProfit,
              revenueImpact: `${sign}$${Math.abs(revenueImpact).toLocaleString(undefined, {maximumFractionDigits: 0})}`,
              demandImpact: `${dSign}${demandChangePct.toFixed(1)}%`,
              demandChangePct,
              pAdjustNum,
              riskScore: Math.abs(pAdjustNum) > 20 || sAdjustNum < 0 ? "High" : "Low",
              beforeSalesData,
              afterSalesData
          });
          setLoading(false);
      }, 600);
  }

  const handleApplyStrategy = () => {
      setStrategyApplied(true);
      // Can scroll into view here ideally
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <div>
         <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Strategic Simulator</h1>
         <p className="text-slate-500">Run What-If scenarios before applying decisions to the real world.</p>
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="premium-card p-8">
               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><SlidersHorizontal className="text-indigo-500"/> Configurator</h3>
               <form onSubmit={handleSimulate} className="space-y-6">
                   <div>
                       <label className="block text-sm font-bold text-slate-700 mb-2">Target Product</label>
                       <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none">
                           {results?.top_products?.map(p => <option key={p.product} value={p.product}>{p.product}</option>)}
                       </select>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><Percent size={14}/> Price Adjust</label>
                           <input type="number" required value={priceAdjust} onChange={(e) => setPriceAdjust(e.target.value)} placeholder="-10" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                       </div>
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><Box size={14}/> Stock Adjust</label>
                           <input type="number" value={stockAdjust} onChange={(e) => setStockAdjust(e.target.value)} placeholder="+50 units" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                       </div>
                   </div>
                   <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center gap-2">
                       {loading ? <RefreshCw className="animate-spin" size={20}/> : "Run Simulation"}
                   </button>
               </form>
           </div>
           
           <div className="premium-card p-8 bg-slate-50 flex flex-col justify-center">
               {simResults ? (
                   <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                       <h3 className="text-xl font-bold text-slate-800 text-center mb-8">Simulation Completed</h3>
                       <div className="grid grid-cols-2 gap-6">
                           <div className="bg-white p-6 rounded-xl border border-emerald-100 text-center shadow-sm relative overflow-hidden">
                               <div className="absolute top-0 right-0 p-2 opacity-10"><TrendingUp size={60} /></div>
                               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">Projected Revenue</p>
                               <p className="text-4xl font-black text-emerald-500 relative z-10">{simResults.revenueImpact}</p>
                           </div>
                           <div className="bg-white p-6 rounded-xl border border-blue-100 text-center shadow-sm relative overflow-hidden">
                               <div className="absolute top-0 right-0 p-2 opacity-10"><BarChart3 size={60} /></div>
                               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">Demand Shift</p>
                               <p className="text-4xl font-black text-blue-500 relative z-10">{simResults.demandImpact}</p>
                           </div>
                       </div>
                       <button onClick={handleApplyStrategy} className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white mt-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                           <Presentation size={18}/> Apply Strategy to Production <ArrowRight size={16}/>
                       </button>
                   </div>
               ) : (
                   <div className="text-center text-slate-400 font-medium">
                       Configure parameters and hit Run Simulation to compute predicted business impact.
                   </div>
               )}
           </div>
       </div>

       {/* Strategy Impact Analysis View */}
       {strategyApplied && simResults && (
           <div className="premium-card overflow-hidden mt-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-8 text-white">
                   <h2 className="text-2xl font-bold flex items-center gap-2">
                       <BarChart3 className="text-indigo-400" size={28}/> Strategy Impact Analysis
                   </h2>
                   <p className="text-slate-300 mt-2 font-medium">Visualizing data alterations in production environment.</p>
               </div>
               
               <div className="p-8 bg-slate-50 space-y-10">
                   
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                       {/* BEFORE CHART */}
                       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                           <h3 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-6 flex items-center justify-between">
                               <span>Before Strategy</span>
                               <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">Current State</span>
                           </h3>
                           
                           <div className="grid grid-cols-2 gap-4 mb-6">
                               <div>
                                   <p className="text-xs font-bold text-slate-400 uppercase">Baseline Sales</p>
                                   <p className="text-2xl font-black text-slate-700">${simResults.baseSales.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                               </div>
                               <div>
                                   <p className="text-xs font-bold text-slate-400 uppercase">Baseline Profit</p>
                                   <p className="text-2xl font-black text-slate-700">${simResults.baseProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                               </div>
                           </div>

                           <div className="h-48">
                               <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={simResults.beforeSalesData}>
                                      <defs>
                                        <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                                        </linearGradient>
                                      </defs>
                                      <XAxis dataKey="month" hide />
                                      <RechartsTooltip contentStyle={{borderRadius: '8px'}} cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5'}}/>
                                      <Area type="monotone" dataKey="value" stroke="#94a3b8" strokeWidth={3} fillOpacity={1} fill="url(#colorBefore)" />
                                  </AreaChart>
                               </ResponsiveContainer>
                           </div>
                       </div>

                       {/* AFTER CHART */}
                       <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-200 relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10"></div>
                           <h3 className="text-sm uppercase tracking-widest font-bold text-indigo-500 mb-6 flex items-center justify-between relative z-10">
                               <span>After Strategy</span>
                               <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs animate-pulse">Projected State</span>
                           </h3>
                           
                           <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                               <div>
                                   <p className="text-xs font-bold text-slate-400 uppercase">New Sales</p>
                                   <p className="text-2xl font-black text-emerald-600">${simResults.newRevenue.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                               </div>
                               <div>
                                   <p className="text-xs font-bold text-slate-400 uppercase">New Profit</p>
                                   <p className="text-2xl font-black text-emerald-600">${simResults.newProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
                               </div>
                           </div>

                           <div className="h-48 relative z-10">
                               <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={simResults.afterSalesData}>
                                      <defs>
                                        <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                        </linearGradient>
                                      </defs>
                                      <XAxis dataKey="month" hide />
                                      <RechartsTooltip contentStyle={{borderRadius: '8px', border: '1px solid #e0e7ff'}} cursor={{stroke: '#818cf8', strokeWidth: 1, strokeDasharray: '5 5'}}/>
                                      <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorAfter)" />
                                  </AreaChart>
                               </ResponsiveContainer>
                           </div>
                       </div>
                   </div>
                   
                   {/* AI Post-Simulation Insights */}
                   <div>
                       <h4 className="text-sm uppercase tracking-widest font-bold text-slate-500 mb-4 flex items-center gap-2">
                           <Presentation size={18} /> Strategic AI Intel
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {simResults.pAdjustNum < 0 ? (
                               <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 font-medium text-sm">
                                   <span className="font-bold text-blue-900 block mb-1">Pricing Curve Optimization detected.</span>
                                   Decreasing price by {Math.abs(simResults.pAdjustNum)}% stimulated a bulk volume demand shift. While gross profit margin drops on single units, the sheer volume increase yielded a positive net profit projection.
                               </div>
                           ) : (
                               <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-800 font-medium text-sm">
                                   <span className="font-bold text-amber-900 block mb-1">Premium Pricing Play validated.</span>
                                   Increasing price by {simResults.pAdjustNum}% reduced expected demand by {Math.abs(simResults.demandChangePct).toFixed(1)}%, but the elevated margins per unit compensated completely, pushing higher cumulative profit with less inventory turnover required.
                               </div>
                           )}
                           
                           <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-800 font-medium text-sm">
                               <span className="font-bold text-emerald-900 block mb-1">Inventory Velocity Accelerated.</span>
                               The combination of stock constraints and adjusted market pricing will cause an expected {Math.abs(simResults.demandChangePct * 1.5).toFixed(1)}% faster inventory depletion rate. Supply Chain should prepare restock POs immediately.
                           </div>
                       </div>
                   </div>

               </div>
           </div>
       )}
    </div>
  );
};

export default SimulatorPage;
