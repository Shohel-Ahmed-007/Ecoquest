import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, ChevronDown, LogOut, User, Flame, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const xpForNext = (user?.level || 1) * 500;
  const xpProgress = ((user?.xp || 0) % xpForNext) / xpForNext * 100;
  const dashPath = user?.role === 'teacher' ? '/teacher' : '/dashboard';

  return (
    <nav className="sticky top-0 z-50 border-b border-white/8 px-4 py-3 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <Link to={user ? dashPath : '/'} className="flex items-center gap-2 mr-2 shrink-0">
          <span className="text-xl">🌍</span>
          <span className="font-bold text-base text-white hidden sm:block">EcoQuest</span>
        </Link>

        {user && (
          <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2">
            <Search size={14} className="text-white/30 shrink-0" />
            <input className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full" placeholder="Search tasks, quizzes..." />
          </div>
        )}

        <div className="flex-1" />

        {user ? (
          <div className="flex items-center gap-2">
            {/* Streak */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/8 px-2.5 py-1.5 rounded-lg">
              <Flame size={14} className="text-orange-400" />
              <span className="text-sm font-bold text-orange-400">{user.streak || 0}</span>
            </div>

            {/* XP */}
            <div className="hidden lg:flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-white/50 font-medium">Lv.{user.level || 1}</span>
                <span className="text-xs text-white/30">{user.xp || 0} XP</span>
              </div>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${xpProgress}%` }} />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-white/5 border border-white/8 hover:bg-white/10 transition">
              <Bell size={15} className="text-white/60" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/5 border border-white/8 px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden sm:block">{user.name?.split(' ')[0]}</span>
                <ChevronDown size={13} className="text-white/40" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 bg-[#1c1c1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
                  <div className="px-4 py-2.5 border-b border-white/8">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-white/40 capitalize">{user.role}</p>
                  </div>
                  <Link to={dashPath} onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/8 hover:text-white transition">
                    <LayoutDashboard size={13} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition">
                    <LogOut size={13} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
