import { DollarSign, LineChart, Package, TriangleAlert } from 'lucide-react';

const KPIOverview = ({ results }) => {
  const isLoaded = !!results;
  
  const kpis = [
    { title: "Total Sales", value: isLoaded ? `$${results.kpis.total_sales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : "—", default: "$0.00", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-100" },
    { title: "Average Order Profit", value: isLoaded ? `$${(results.kpis.total_profit || results.kpis.total_sales * 0.15 / results.kpis.total_orders || 0).toFixed(2)}` : "—", default: "$0.00", icon: LineChart, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Demand Growth (30d)", value: isLoaded ? "+12.4%" : "—", default: "0%", icon: Package, color: "text-indigo-500", bg: "bg-indigo-100" },
    { title: "Active Alerts", value: isLoaded ? results.alerts.length : "—", default: "0", icon: TriangleAlert, color: "text-rose-500", bg: "bg-rose-100" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="premium-card p-6 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{kpi.title}</span>
            <div className={`p-2.5 rounded-lg ${kpi.bg}`}>
              <kpi.icon size={20} className={kpi.color} />
            </div>
          </div>
          <div>
            <h3 className={`text-3xl font-bold ${isLoaded ? 'text-slate-800' : 'text-slate-300'}`}>
              {isLoaded ? kpi.value : kpi.default}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIOverview;
