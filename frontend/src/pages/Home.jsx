<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Trophy, BookOpen, CheckCircle, Flame, Star, Zap, Users, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';

/* ── Animated counter ── */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          setVal(v => { if (v + step >= target) { clearInterval(timer); return target; } return v + step; });
        }, 24);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const taglines = [
  'Turn learning into real action.',
  "Don't just study. Change the world.",
  'Build habits. Earn XP. Lead.',
  'Be the reason Earth smiles today.',
];

const steps = [
  { n: '01', icon: BookOpen, color: '#3b82f6', bg: 'rgba(59,130,246,0.10)', label: 'Learn', desc: 'Chapter-wise content and teacher-created quizzes to build environmental knowledge.' },
  { n: '02', icon: Leaf, color: '#16a34a', bg: 'rgba(22,163,74,0.10)', label: 'Act', desc: 'Complete civic tasks — planting, water saving, waste reduction — and submit proof.' },
  { n: '03', icon: CheckCircle, color: '#a855f7', bg: 'rgba(168,85,247,0.10)', label: 'Get Verified', desc: 'Teachers review your submissions, score them, and award XP on approval.' },
  { n: '04', icon: Trophy, color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', label: 'Rise', desc: 'Climb the leaderboard, unlock badges, build streaks, and lead your school.' },
];

const features = [
  {
    icon: '📚', title: 'Structured Learning',
    items: ['Subject & chapter-wise content', 'Teacher-created quizzes & tests', 'Downloadable study notes', 'Visual progress tracking'],
    color: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)',
  },
  {
    icon: '🌍', title: 'Civic Action Engine', badge: 'CORE',
    items: ['Waste management tasks', 'Water & energy conservation', 'Plantation challenges', 'Photo proof submission'],
    color: 'rgba(22,163,74,0.12)', border: 'rgba(22,163,74,0.30)',
  },
  {
    icon: '👨‍🏫', title: 'Teacher Validation',
    items: ['Review & score submissions', 'Manage curriculum content', 'Track student progress', 'Real-time notifications'],
    color: 'rgba(168,85,247,0.10)', border: 'rgba(168,85,247,0.25)',
  },
];

const mockLeaders = [
  { name: 'Ananya S.', xp: 4820, streak: 14, badge: '🥇' },
  { name: 'Rahul M.', xp: 4310, streak: 11, badge: '🥈' },
  { name: 'Priya K.', xp: 3890, streak: 9,  badge: '🥉' },
  { name: 'Arjun V.', xp: 3540, streak: 7,  badge: '4' },
  { name: 'Riya T.',  xp: 3200, streak: 5,  badge: '5' },
];

export default function Home() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setTaglineIdx(i => (i + 1) % taglines.length); setFading(false); }, 300);
    }, 3500);
=======
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const headlines = [
  'Start small. Change the world 🌱',
  "Don't just learn. Act.",
  'Every action counts. What did you do today?',
  'Be the reason Earth smiles today 🌍',
  'Consistency builds impact.',
];

const liveActions = [
  'Rahul cleaned his street 🧹',
  'Anjali planted 2 trees 🌳',
  'Class 8 saved 500L water 💧',
  'Priya completed the energy quiz ⚡',
  'Arjun reduced waste by 2kg ♻️',
  'Class 6B scored #1 on leaderboard 🏆',
];

function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      setVal((v) => {
        if (v + step >= target) { clearInterval(timer); return target; }
        return v + step;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{val.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeadlineIdx((i) => (i + 1) % headlines.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFeedIdx((i) => (i + 1) % liveActions.length), 2500);
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
    return () => clearInterval(t);
  }, []);

  return (
<<<<<<< HEAD
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* ─────────────────── HERO ─────────────────── */}
      <section className="relative min-h-[calc(100svh-53px)] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* bg */}
        <div className="absolute inset-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, var(--bg) 100%)' }} />

        {/* floating orbs */}
        <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/5 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          {/* pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[13px] font-medium"
            style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.30)', color: '#4ade80' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-eco-400 animate-pulse" />
            Gamified Environmental Education Platform
          </div>

          {/* headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-4">
            <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              EcoQuest
            </span>
            <br />
            <span
              className="transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1, background: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {taglines[taglineIdx]}
            </span>
          </h1>

          <p className="text-[15px] md:text-[17px] max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            The gamified platform where students learn about the environment, complete real civic tasks, earn XP, and compete on a leaderboard — all verified by teachers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="w-full sm:w-auto btn-primary text-[15px] px-8 py-3.5 rounded-xl">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto btn-secondary text-[15px] px-8 py-3.5 rounded-xl">
              Sign In
            </Link>
          </div>

          {/* mini trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            {[
              { icon: <Users size={12} />, text: '5,000+ students' },
              { icon: <Shield size={12} />, text: 'Teacher verified' },
              { icon: <Zap size={12} />, text: 'Free to use' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 text-[12px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {b.icon} {b.text}
              </div>
            ))}
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
=======
    <div className="min-h-screen bg-eco-gradient">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a150d]" />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-eco-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="badge bg-eco-600/20 text-eco-400 border border-eco-600/30 text-sm mb-6 inline-block">
            🌿 Gamified Environmental Education
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight min-h-[1.2em] transition-all duration-500">
            <span className="text-gradient">{headlines[headlineIdx]}</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            EcoQuest transforms learning into real-world action.<br />
            Gamified, habit-driven, and validated by teachers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className="btn-primary text-base px-8 py-3">🚀 Start Your Journey</Link>
            <Link to="/login?role=student" className="btn-secondary text-base px-8 py-3">👨‍🎓 Login as Student</Link>
            <Link to="/login?role=teacher" className="btn-outline text-base px-8 py-3">👨‍🏫 Login as Teacher</Link>
          </div>
        </div>
      </section>

      {/* LIVE IMPACT */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Real Actions. <span className="text-gradient">Real Impact.</span></h2>
          <p className="text-white/40 text-center mb-12">Live statistics from our growing community</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: '🌱', label: 'Trees Planted', value: 12543, suffix: '+' },
              { icon: '♻️', label: 'Waste Reduced', value: 2300, suffix: ' kg' },
              { icon: '💧', label: 'Water Saved (L)', value: 18000, suffix: '+' },
              { icon: '👨‍🎓', label: 'Active Students', value: 5000, suffix: '+' },
            ].map((s) => (
              <div key={s.label} className="card text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-gradient">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Live feed */}
          <div className="card max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-eco-500 pulse-green" />
              <span className="text-sm text-eco-400 font-medium">Live Activity Feed</span>
            </div>
            <div className="text-white/80 text-sm transition-all duration-500">
              {liveActions[feedIdx]}
            </div>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ─────────────────── STATS ─────────────────── */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[12px] font-semibold tracking-widest mb-8" style={{ color: 'rgba(22,163,74,0.7)' }}>REAL IMPACT, REAL NUMBERS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🌱', val: 12543, sfx: '+', label: 'Trees Planted' },
              { icon: '♻️', val: 2300,  sfx: ' kg', label: 'Waste Reduced' },
              { icon: '💧', val: 18000, sfx: '+', label: 'Litres Saved' },
              { icon: '👨‍🎓', val: 5000,  sfx: '+', label: 'Active Students' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-2xl md:text-3xl font-black font-mono mb-1"
                  style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <Counter target={s.val} suffix={s.sfx} />
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <section className="py-16 md:py-24 px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold tracking-widest mb-3" style={{ color: 'rgba(22,163,74,0.7)' }}>THE PROCESS</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              From Classroom to{' '}
              <span style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Real Change
              </span>
            </h2>
            <p className="text-[15px]" style={{ color: 'var(--text-3)' }}>A complete cycle that builds knowledge, habits, and drives impact.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={s.n} className="rounded-2xl p-5 relative" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: s.bg, border: `1px solid ${s.color}30` }}>
                    <s.icon size={18} style={{ color: s.color }} />
                  </div>
                  <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--text-3)' }}>STEP {s.n}</span>
                </div>
                <h3 className="text-[16px] font-bold mb-2">{s.label}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-3)' }}>{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight size={16} style={{ color: 'var(--border-md)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── FEATURES ─────────────────── */}
      <section className="py-16 md:py-24 px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold tracking-widest mb-3" style={{ color: 'rgba(22,163,74,0.7)' }}>FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Everything in{' '}
              <span style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                One Place
              </span>
            </h2>
            <p className="text-[15px]" style={{ color: 'var(--text-3)' }}>Built for students and teachers to work together on environmental impact.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map(f => (
              <div key={f.title} className="rounded-2xl p-6" style={{ background: f.color, border: `1px solid ${f.border}` }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{f.icon}</span>
                  {f.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(22,163,74,0.20)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.30)' }}>
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-[16px] font-bold mb-3">{f.title}</h3>
                <ul className="space-y-2">
                  {f.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-[13px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <span className="text-eco-500 mt-0.5 shrink-0">✓</span> {item}
=======
      {/* SMART FLOW */}
      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">From Learning to <span className="text-gradient">Real Impact.</span></h2>
          <p className="text-white/40 text-center mb-12">A complete cycle that builds habits and drives change</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🧠', step: '1', title: 'Learn', color: 'from-blue-600/20 to-blue-800/20', border: 'border-blue-600/30', points: ['Chapter-wise notes', 'Teacher-made quizzes', 'Subject-wise content'] },
              { icon: '🌱', step: '2', title: 'Act', color: 'from-eco-600/20 to-eco-800/20', border: 'border-eco-600/30', points: ['Civic sense tasks', 'Missions & challenges', 'Habit building'] },
              { icon: '🏆', step: '3', title: 'Earn', color: 'from-yellow-600/20 to-yellow-800/20', border: 'border-yellow-600/30', points: ['XP Points', 'Badges', 'Leaderboard rank'] },
              { icon: '🔁', step: '4', title: 'Repeat', color: 'from-purple-600/20 to-purple-800/20', border: 'border-purple-600/30', points: ['Daily streak', 'Heatmap tracking', 'Consistency rewards'] },
            ].map((item) => (
              <div key={item.step} className={`bg-gradient-to-br ${item.color} border ${item.border} rounded-2xl p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs text-white/30 font-bold">STEP {item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <ul className="space-y-1.5">
                  {item.points.map((p) => (
                    <li key={p} className="text-sm text-white/60 flex items-center gap-2">
                      <span className="text-eco-500">✓</span> {p}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ─────────────────── HABIT / HEATMAP ─────────────────── */}
      <section className="py-16 md:py-20 px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[12px] font-semibold tracking-widest mb-3" style={{ color: 'rgba(22,163,74,0.7)' }}>HABIT ENGINE</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Consistency is{' '}
                <span style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Power.
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--text-3)' }}>
                Track your daily eco-actions on a GitHub-style heatmap. Build streaks, unlock badges, and make environmental action a daily habit.
              </p>
              <div className="flex gap-4">
                {[{ icon: Flame, label: 'Streaks', color: '#fb923c' }, { icon: Star, label: 'XP & Levels', color: '#4ade80' }, { icon: Shield, label: 'Badges', color: '#a78bfa' }].map(b => (
                  <div key={b.label} className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-3)' }}>
                    <b.icon size={13} style={{ color: b.color }} /> {b.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-eco-400 animate-pulse" />
                <span className="text-[12px] font-medium text-eco-400">Activity Heatmap</span>
                <span className="text-[10px] ml-auto" style={{ color: 'var(--text-3)' }}>Last 12 weeks</span>
              </div>
              <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                {Array.from({ length: 84 }).map((_, i) => {
                  const r = Math.random();
                  const bg = r > 0.75 ? '#16a34a' : r > 0.55 ? '#166534' : r > 0.35 ? '#14532d' : 'rgba(255,255,255,0.04)';
                  return <div key={i} className="aspect-square rounded-sm" style={{ background: bg }} />;
                })}
              </div>
              <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>Less</span>
                {['rgba(255,255,255,0.04)', '#14532d', '#166534', '#16a34a'].map(c => (
                  <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
                ))}
                <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>More</span>
              </div>
=======
      {/* HABIT ENGINE */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Consistency is <span className="text-gradient">Power.</span></h2>
          <p className="text-white/40 mb-10">Track your daily eco-actions and build unstoppable habits over time.</p>

          <div className="card max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-eco-400 font-semibold text-sm">Activity Heatmap</span>
              <span className="badge bg-eco-600/20 text-eco-400 border border-eco-600/20">GitHub Style</span>
            </div>
            <div className="flex gap-1 flex-wrap justify-center">
              {Array.from({ length: 84 }).map((_, i) => {
                const rand = Math.random();
                const color = rand > 0.7 ? 'bg-eco-500' : rand > 0.5 ? 'bg-eco-700' : rand > 0.3 ? 'bg-eco-900' : 'bg-white/5';
                return <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />;
              })}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ─────────────────── LEADERBOARD PREVIEW ─────────────────── */}
      <section className="py-16 md:py-20 px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Leaderboard card */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                  <Trophy size={15} className="text-eco-400" />
                  <span className="text-[13px] font-semibold">Top Students</span>
                </div>
                <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>This Week</span>
              </div>
              {mockLeaders.map((l, i) => (
                <div key={l.name} className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: i < mockLeaders.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span className="text-[16px] w-6 text-center shrink-0">{isNaN(l.badge) ? l.badge : `#${l.badge}`}</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[12px] font-bold shrink-0"
                    style={{ background: i === 0 ? 'rgba(251,191,36,0.15)' : i === 1 ? 'rgba(156,163,175,0.15)' : i === 2 ? 'rgba(180,83,9,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid var(--border)' }}>
                    {l.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{l.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                      <Flame size={8} className="inline text-orange-400 mr-0.5" />{l.streak}d streak
                    </p>
                  </div>
                  <span className="text-[13px] font-bold font-mono text-eco-400">{l.xp.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[12px] font-semibold tracking-widest mb-3" style={{ color: 'rgba(22,163,74,0.7)' }}>LEADERBOARD</p>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Compete.{' '}
                <span style={{ background: 'linear-gradient(135deg, #4ade80, #16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Improve. Lead.
                </span>
              </h2>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--text-3)' }}>
                Rank among classmates and school peers. The more you act and learn, the higher you climb. Recognition drives motivation.
              </p>
              <div className="space-y-3">
                {[{ l: 'Class Ranking', d: 'Compare within your class' }, { l: 'School Ranking', d: 'Compete school-wide' }, { l: 'Global Board', d: 'Top students everywhere' }].map(r => (
                  <div key={r.l} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <Trophy size={14} className="text-eco-400 shrink-0" />
                    <div>
                      <p className="text-[13px] font-medium">{r.l}</p>
                      <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>{r.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
=======
      {/* CORE SYSTEM */}
      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Where Learning <span className="text-gradient">Meets Action.</span></h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '📚', title: 'Learning System', items: ['Chapter-wise content', 'Teacher-created quizzes', 'Subject-wise structure'], color: 'border-blue-600/30' },
              { icon: '🌍', title: 'Civic Sense Engine', badge: '🔥 CORE FEATURE', items: ['Waste management', 'Water conservation', 'Energy saving', 'Plantation tasks'], color: 'border-eco-600/30' },
              { icon: '👨‍🏫', title: 'Teacher Validation', items: ['Students submit proof', 'Teacher reviews & scores', 'XP awarded on approval'], color: 'border-purple-600/30' },
            ].map((c) => (
              <div key={c.title} className={`card border ${c.color}`}>
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                {c.badge && <span className="badge bg-eco-600/20 text-eco-400 border border-eco-600/20 mb-3">{c.badge}</span>}
                <ul className="space-y-1.5 mt-2">
                  {c.items.map((item) => (
                    <li key={item} className="text-sm text-white/60 flex items-center gap-2">
                      <span className="text-eco-500">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ─────────────────── DUAL CTA ─────────────────── */}
      <section className="py-16 md:py-24 px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Student CTA */}
            <div className="rounded-2xl p-8 flex flex-col"
              style={{ background: 'linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(22,163,74,0.05) 100%)', border: '1px solid rgba(22,163,74,0.25)' }}>
              <span className="text-4xl mb-4">👨‍🎓</span>
              <h3 className="text-[22px] font-black mb-2">Join as a Student</h3>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'var(--text-3)' }}>
                Learn, complete real eco-tasks, earn XP and badges, build streaks, and compete with your classmates.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link to="/register?role=student" className="btn-primary justify-center">
                  Sign up as Student <ArrowRight size={15} />
                </Link>
                <Link to="/login?role=student" className="btn-secondary justify-center">Sign in</Link>
              </div>
            </div>
            {/* Teacher CTA */}
            <div className="rounded-2xl p-8 flex flex-col"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.04) 100%)', border: '1px solid rgba(168,85,247,0.25)' }}>
              <span className="text-4xl mb-4">👨‍🏫</span>
              <h3 className="text-[22px] font-black mb-2">Join as a Teacher</h3>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'var(--text-3)' }}>
                Create curriculum, assign tests, upload notes, review student submissions and track real-world impact.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link to="/register?role=teacher"
                  className="inline-flex items-center justify-center gap-1.5 font-semibold px-5 py-2.5 rounded-xl text-[14px] transition-colors"
                  style={{ background: 'rgba(168,85,247,0.20)', border: '1px solid rgba(168,85,247,0.35)', color: '#c084fc' }}>
                  Sign up as Teacher <ArrowRight size={15} />
                </Link>
                <Link to="/login?role=teacher" className="btn-secondary justify-center">Sign in</Link>
              </div>
            </div>
=======
      {/* LEADERBOARD PREVIEW */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Compete. <span className="text-gradient">Improve. Lead.</span></h2>
          <p className="text-white/40 mb-10">See how you rank against students globally</p>
          <div className="grid grid-cols-3 gap-4">
            {['Class Ranking', 'School Ranking', 'Global Leaderboard'].map((t) => (
              <div key={t} className="card text-center">
                <span className="text-3xl block mb-2">🏆</span>
                <p className="text-sm font-medium">{t}</p>
              </div>
            ))}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer className="py-10 px-4" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                style={{ background: 'rgba(22,163,74,0.20)', border: '1px solid rgba(22,163,74,0.30)' }}>🌍</div>
              <div>
                <p className="font-bold text-[15px]">EcoQuest</p>
                <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>Gamified Environmental Education</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              {['About', 'Contact', 'Privacy', 'Terms'].map(l => (
                <a key={l} href="#" className="text-[13px] transition-colors hover:text-white" style={{ color: 'var(--text-3)' }}>{l}</a>
              ))}
            </div>
            <p className="text-[12px]" style={{ color: 'var(--text-3)' }}>© 2025 EcoQuest · All rights reserved.</p>
          </div>
        </div>
=======
      {/* FINAL CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to Change <span className="text-gradient">the World?</span></h2>
          <p className="text-white/60 text-lg mb-10">Join EcoQuest and turn your daily actions into real environmental impact.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/register" className="btn-primary text-base px-8 py-3">🟢 Start Now</Link>
            <Link to="/register?role=student" className="btn-secondary text-base px-8 py-3">🔵 Join as Student</Link>
            <Link to="/register?role=teacher" className="btn-outline text-base px-8 py-3">🟣 Join as Teacher</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="glass border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="font-bold text-gradient">EcoQuest</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            {['About', 'Contact', 'Privacy Policy', 'Terms'].map((l) => (
              <a key={l} href="#" className="hover:text-white transition">{l}</a>
            ))}
          </div>
          <p className="text-xs text-white/20">© 2024 EcoQuest. All rights reserved.</p>
        </div>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
      </footer>
    </div>
  );
}
