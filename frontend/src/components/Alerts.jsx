import { AlertTriangle, AlertCircle, Info, RefreshCw } from 'lucide-react';

const Alerts = ({ results }) => {
  if (!results || !results.alerts || results.alerts.length === 0) return null;

  const { alerts } = results;

  const getStyle = (severity) => {
    switch (severity) {
      case 'Critical': return { icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-700' };
      case 'Warning': return { icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' };
      default: return { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' };
    }
  };

  return (
    <div className="space-y-6 pt-4 border-t border-slate-200">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-slate-800">Critical Alerts</h2>
        <span className="px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-full text-sm font-bold">{alerts.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alerts.map((alert, idx) => {
          const style = getStyle(alert.severity);
          const Icon = style.icon;
          
          return (
            <div key={idx} className={`rounded-xl border p-5 ${style.bg} ${style.border} flex items-start gap-4 transition-all hover:bg-white hover:shadow-md`}>
              <div className={`p-2 rounded-lg bg-white/60 ${style.color}`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-800">{alert.severity}</h4>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">{alert.message}</p>
                <div className="mt-3">
                  <button className={`text-xs font-bold px-3 py-1.5 rounded-lg bg-white shadow-sm border ${style.border} ${style.color} hover:bg-slate-50 transition-colors flex items-center gap-1`}>
                    <RefreshCw size={12} /> Resolve Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
