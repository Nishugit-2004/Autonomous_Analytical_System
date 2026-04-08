import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, TrendingUp, PackageSearch, SlidersHorizontal, Sparkles, BellRing, Settings, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { results } = useAppContext();
  const alertCount = results?.alerts?.length || 0;

  const menus = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', path: '/upload', label: 'Upload Data', icon: Upload },
    { id: 'predictions', path: '/predictions', label: 'Predictions', icon: TrendingUp },
    { id: 'inventory', path: '/inventory', label: 'Inventory', icon: PackageSearch },
    { id: 'simulator', path: '/simulator', label: 'Strategic Simulator', icon: SlidersHorizontal },
    { id: 'insights', path: '/insights', label: 'AI Insights', icon: Sparkles },
    { id: 'alerts', path: '/alerts', label: 'Alerts', icon: BellRing, badge: alertCount },
    { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 hidden lg:flex lg:flex-col shadow-sm">
      <div className="flex items-center p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_4px_10px_rgba(79,70,229,0.3)]">
            <Activity size={24} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-800">
            RetailPulse
          </span>
        </div>
      </div>
      
      <div className="px-6 py-2 flex-1 overflow-y-auto custom-scrollbar">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Main Menu</p>
        <nav className="space-y-1.5">
          {menus.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `
                  w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5
                  ${isActive ? 'bg-indigo-50/80 text-primary font-bold shadow-sm border border-indigo-100/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium'}
                `}
              >
                <div className="flex items-center gap-4">
                    <Icon size={20} className="stroke-[2.5px]" />
                    <span>{item.label}</span>
                </div>
                
                {item.badge !== undefined && item.badge > 0 && (
                   <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                       {item.badge}
                   </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
