import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'student', class:'', school:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const next = (e) => { e.preventDefault(); setStep(2); };
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          <h1 className="text-2xl font-bold mb-1">Create account</h1>
          <p className="text-white/40 text-sm">Join the eco movement</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            {[1,2].map(s => <div key={s} className={`h-1 w-10 rounded-full transition-all ${s <= step ? 'bg-white' : 'bg-white/15'}`} />)}
          </div>
        </div>

        <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-3 py-2.5 rounded-xl mb-4">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={next} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                  <input className="input pl-9" placeholder="Arjun Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                  <input className="input pl-9" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                  <input className="input pl-9" type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-2">I am a...</label>
                <div className="grid grid-cols-2 gap-2">
                  {['student','teacher'].map(r => (
                    <button key={r} type="button" onClick={() => setForm({...form, role: r})}
                      className={`py-2.5 rounded-xl border text-sm font-medium capitalize transition-all ${
                        form.role === r ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                      }`}>
                      {r === 'student' ? '👨‍🎓' : '👨‍🏫'} {r}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 mt-1">
                Next <ArrowRight size={15} />
              </button>
            </form>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {form.role === 'student' && (
                <div>
                  <label className="text-xs text-white/50 block mb-1.5">Class / Grade</label>
                  <select className="input" value={form.class} onChange={e => setForm({...form, class: e.target.value})} required>
                    <option value="">Select Class</option>
                    {['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12','College Year 1','College Year 2','College Year 3'].map(c => (
                      <option key={c} value={c} className="bg-[#1c1c1e]">{c}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="text-xs text-white/50 block mb-1.5">School / Institution</label>
                <input className="input" placeholder="ABC Public School" value={form.school} onChange={e => setForm({...form, school: e.target.value})} required />
              </div>
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-white/20 text-white/60 py-2.5 rounded-xl hover:bg-white/5 transition text-sm">← Back</button>
                <button type="submit" disabled={loading} className="flex-1 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl disabled:opacity-50 transition text-sm">
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-white/30 text-xs mt-4">
            Already have an account? <Link to="/login" className="text-white hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
