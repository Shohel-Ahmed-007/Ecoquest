<<<<<<< HEAD
import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Leaf, GraduationCap, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { validateEmail as validateEmailBase } from '../utils/validateEmail';

// Wrap shared util to match the { valid, message } shape used in this file
function validateEmailFrontend(email) {
  if (!email || !email.trim()) return { valid: false, message: '' };
  const result = validateEmailBase(email);
  return { valid: result.valid, message: result.reason || '' };
}

function validatePasswordFrontend(password) {
  if (!password) return { valid: false, message: '' };
  if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters' };
  if (password.length > 128) return { valid: false, message: 'Password is too long' };
  return { valid: true, message: '' };
}

// ── Email field with real-time validation indicator ───────────
function EmailInput({ value, onChange, touched, onBlur }) {
  const result = validateEmailFrontend(value);
  const showError = touched && value && !result.valid;
  const showOk    = touched && value && result.valid;

  return (
    <div>
      <label className="label block mb-1.5">Email</label>
      <div className="relative">
        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
          style={{ color: showError ? '#f87171' : showOk ? '#4ade80' : 'var(--text-3)' }} />
        <input
          id="register-email"
          className="input pl-9 pr-9"
          type="email"
          placeholder="you@gmail.com"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="email"
          required
          style={showError
            ? { borderColor: 'rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.04)' }
            : showOk
            ? { borderColor: 'rgba(22,163,74,0.4)', background: 'rgba(22,163,74,0.03)' }
            : {}
          }
        />
        {showOk && (
          <CheckCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-eco-400" />
        )}
        {showError && (
          <XCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
        )}
      </div>
      {showError && (
        <p className="text-[12px] text-red-400 mt-1.5 flex items-center gap-1">
          <AlertCircle size={11} /> {result.message}
        </p>
      )}
    </div>
  );
}
=======
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
<<<<<<< HEAD

  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState({ name: '', email: '', password: '', role: 'student', class: '', school: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false); // after success

  const emailResult    = validateEmailFrontend(form.email);
  const passwordResult = validatePasswordFrontend(form.password);
  const step1Valid     = form.name.trim().length >= 2 && emailResult.valid && passwordResult.valid;

  const handleBlur = (field) => setTouched(t => ({ ...t, [field]: true }));

  const next = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!step1Valid) return;
    setStep(2);
  };

=======
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'student', class:'', school:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const next = (e) => { e.preventDefault(); setStep(2); };
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
<<<<<<< HEAD
      const { data } = await api.post('/auth/register', form);

      if (data.devMode && data.token) {
        // Email not configured — backend auto-verified → direct login
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/onboarding');
      } else {
        // Email configured — show "check inbox" screen
        setDone(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
        <div className="fixed inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div className="w-full max-w-[360px] fade-in-up relative z-10 text-center">
          <div className="rounded-2xl p-8" style={{ background: 'var(--card)', border: '1px solid var(--border-md)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(22,163,74,0.12)', border: '2px solid rgba(22,163,74,0.30)' }}>
              <Mail size={28} className="text-eco-400" />
            </div>
            <h2 className="text-[20px] font-bold mb-2">Check your inbox! 📬</h2>
            <p className="text-[13px] mb-1" style={{ color: 'var(--text-2)' }}>
              We sent a verification link to:
            </p>
            <p className="text-[14px] font-semibold text-eco-400 mb-4">{form.email}</p>
            <p className="text-[13px] mb-6" style={{ color: 'var(--text-3)' }}>
              Click the link in the email to activate your account. The link expires in 24 hours.
            </p>
            <Link to="/login" className="btn-secondary w-full justify-center text-[13px]">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Registration form ───────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      <div className="w-full max-w-[360px] fade-in-up relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.30)' }}>
              <Leaf size={18} className="text-eco-400" />
            </div>
            <span className="text-xl font-bold tracking-tight">EcoQuest</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mb-1.5">Create account</h1>
          <p className="text-[14px]" style={{ color: 'var(--text-2)' }}>Join the eco movement</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2].map(s => (
              <div key={s} className="h-1 w-12 rounded-full transition-all duration-300"
                style={{ background: s <= step ? 'var(--accent)' : 'rgba(255,255,255,0.08)' }} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'var(--card)', border: '1px solid var(--border-md)' }}>
          {error && (
            <div className="flex items-center gap-2 text-[13px] text-red-400 px-3 py-2.5 rounded-lg mb-4"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
              <AlertCircle size={13} className="shrink-0" /> {error}
=======
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
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
            </div>
          )}

          {step === 1 ? (
<<<<<<< HEAD
            <form onSubmit={next} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="label block mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }} />
                  <input id="register-name" className="input pl-9" placeholder="Arjun Sharma"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    minLength={2} required />
                </div>
              </div>

              {/* Email — real-time validated */}
              <EmailInput
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                touched={touched.email}
                onBlur={() => handleBlur('email')}
              />

              {/* Password */}
              <div>
                <label className="label block mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: touched.password && !passwordResult.valid && form.password ? '#f87171' : 'var(--text-3)' }} />
                  <input id="register-password" className="input pl-9" type="password" placeholder="Min 6 characters"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    onBlur={() => handleBlur('password')}
                    autoComplete="new-password"
                    required minLength={6}
                    style={touched.password && form.password && !passwordResult.valid
                      ? { borderColor: 'rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.04)' } : {}}
                  />
                </div>
                {touched.password && form.password && !passwordResult.valid && (
                  <p className="text-[12px] text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {passwordResult.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="label block mb-2">I am a...</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { r: 'student', icon: GraduationCap, label: 'Student' },
                    { r: 'teacher', icon: BookOpen,      label: 'Teacher' },
                  ].map(({ r, icon: Icon, label }) => (
                    <button key={r} type="button" onClick={() => setForm({ ...form, role: r })}
                      className="py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-[13px] font-medium capitalize transition-all"
                      style={form.role === r
                        ? { background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.40)', color: '#4ade80' }
                        : { background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-md)', color: 'var(--text-2)' }
                      }>
                      <Icon size={14} /> {label}
=======
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
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    </button>
                  ))}
                </div>
              </div>
<<<<<<< HEAD

              <button type="submit"
                className="w-full btn-primary justify-center mt-1"
                style={{ padding: '0.65rem', opacity: step1Valid ? 1 : 0.5, cursor: step1Valid ? 'pointer' : 'not-allowed' }}
                disabled={!step1Valid}
              >
                <span>Continue</span><ArrowRight size={14} />
=======
              <button type="submit" className="w-full bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 mt-1">
                Next <ArrowRight size={15} />
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
              </button>
            </form>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {form.role === 'student' && (
                <div>
<<<<<<< HEAD
                  <label className="label block mb-1.5">Class / Grade</label>
                  <select className="input" value={form.class}
                    onChange={e => setForm({ ...form, class: e.target.value })} required>
                    <option value="">Select Class</option>
                    {['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12','College Year 1','College Year 2','College Year 3'].map(c => (
                      <option key={c} value={c}>{c}</option>
=======
                  <label className="text-xs text-white/50 block mb-1.5">Class / Grade</label>
                  <select className="input" value={form.class} onChange={e => setForm({...form, class: e.target.value})} required>
                    <option value="">Select Class</option>
                    {['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12','College Year 1','College Year 2','College Year 3'].map(c => (
                      <option key={c} value={c} className="bg-[#1c1c1e]">{c}</option>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    ))}
                  </select>
                </div>
              )}
              <div>
<<<<<<< HEAD
                <label className="label block mb-1.5">School / Institution</label>
                <input className="input" placeholder="ABC Public School"
                  value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} required />
              </div>
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                  ← Back
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                  {loading ? 'Creating…' : 'Create Account'}
=======
                <label className="text-xs text-white/50 block mb-1.5">School / Institution</label>
                <input className="input" placeholder="ABC Public School" value={form.school} onChange={e => setForm({...form, school: e.target.value})} required />
              </div>
              <div className="flex gap-3 mt-1">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-white/20 text-white/60 py-2.5 rounded-xl hover:bg-white/5 transition text-sm">← Back</button>
                <button type="submit" disabled={loading} className="flex-1 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl disabled:opacity-50 transition text-sm">
                  {loading ? 'Creating...' : 'Create Account'}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                </button>
              </div>
            </form>
          )}

<<<<<<< HEAD
          <p className="text-center text-[12px] mt-4" style={{ color: 'var(--text-3)' }}>
            Have an account?{' '}
            <Link to="/login" className="text-white/70 hover:text-white transition-colors">Sign in</Link>
=======
          <p className="text-center text-white/30 text-xs mt-4">
            Already have an account? <Link to="/login" className="text-white hover:underline">Sign in</Link>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
          </p>
        </div>
      </div>
    </div>
  );
}
