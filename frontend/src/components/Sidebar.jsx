import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Leaf, Trophy, BarChart2, Inbox, Users, ClipboardList, Star, Flame } from 'lucide-react';

const studentLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
  { to: '/civic', icon: Leaf, label: 'Civic Hub' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
];

const teacherLinks = [
  { to: '/teacher', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/civic', icon: Inbox, label: 'Submissions' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
];

export default function Sidebar() {
  const { user } = useAuth();
  const links = user?.role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <aside className="fixed left-0 top-[57px] h-[calc(100vh-57px)] w-14 md:w-52 bg-[#0d0d0d] border-r border-white/8 flex flex-col py-3 z-40">
      <nav className="flex flex-col gap-0.5 px-2 flex-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard' || to === '/teacher'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                isActive
                  ? 'bg-eco-600/20 text-eco-400 font-semibold border border-eco-600/30'
                  : 'text-white/50 hover:bg-white/8 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-eco-400' : 'text-white/50 group-hover:text-white'} />
                <span className="hidden md:block text-sm">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom user card */}
      <div className="px-2 pb-2 hidden md:block">
        <div className="bg-white/5 border border-white/8 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-white">{user?.name}</p>
              <p className="text-[10px] text-white/40 capitalize">{user?.class || user?.role}</p>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-white/40">
            <span className="flex items-center gap-1"><Star size={10} />{user?.xp || 0} XP</span>
            <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" />{user?.streak || 0}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
