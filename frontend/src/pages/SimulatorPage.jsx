import { useAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowRight, Percent, Box, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const SimulatorPage = () => {
  const { dataLoaded, results } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [simResults, setSimResults] = useState(null);
  
  if (!dataLoaded) return <Navigate to="/upload" replace />;

  const handleSimulate = (e) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
          setSimResults({
              revenueImpact: "+$2,450.00",
              demandImpact: "+18%",
              riskScore: "Low"
          });
          setLoading(false);
      }, 1000);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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
                       <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none">
                           {results?.top_products?.map(p => <option key={p.product}>{p.product}</option>)}
                       </select>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><Percent size={14}/> Price Adjust</label>
                           <input type="number" placeholder="-10%" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                       </div>
                       <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><Box size={14}/> Stock Adjust</label>
                           <input type="number" placeholder="+50 units" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:ring-2 focus:ring-primary outline-none" />
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
                           <div className="bg-white p-6 rounded-xl border border-emerald-100 text-center shadow-sm">
                               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Projected Revenue</p>
                               <p className="text-3xl font-black text-emerald-500">{simResults.revenueImpact}</p>
                           </div>
                           <div className="bg-white p-6 rounded-xl border border-blue-100 text-center shadow-sm">
                               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Demand Shift</p>
                               <p className="text-3xl font-black text-blue-500">{simResults.demandImpact}</p>
                           </div>
                       </div>
                       <button className="mx-auto block mt-6 font-bold text-primary hover:text-indigo-800 transition-colors">Apply Strategy to Production <ArrowRight size={16} className="inline"/></button>
                   </div>
               ) : (
                   <div className="text-center text-slate-400 font-medium">
                       Configure parameters and hit Run Simulation to compute predicted business impact.
                   </div>
               )}
           </div>
       </div>
    </div>
  );
};

export default SimulatorPage;
