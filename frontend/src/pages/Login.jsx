import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'teacher' ? '/teacher' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black bw-theme flex items-center justify-center px-4">
      <div className="w-full max-w-sm fade-in-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <span className="text-2xl">🌍</span>
            <span className="text-xl font-black">EcoQuest</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-white/40 text-sm">Sign in to continue your journey</p>
        </div>

        <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-3 py-2.5 rounded-xl mb-4">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                <input className="input pl-9" type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                <input className="input pl-9" type="password" placeholder="••••••••"
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl disabled:opacity-50 transition flex items-center justify-center gap-2 mt-2">
              {loading ? 'Signing in...' : <><span>Sign in</span><ArrowRight size={15} /></>}
            </button>
          </form>
          <p className="text-center text-white/30 text-xs mt-4">
            No account? <Link to="/register" className="text-white hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
