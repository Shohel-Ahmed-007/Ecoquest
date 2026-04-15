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
    return () => clearInterval(t);
  }, []);

  return (
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
          </div>
        </div>
      </section>

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
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            </div>
          </div>
        </div>
      </section>

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
          </div>
        </div>
      </section>

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
          </div>
        </div>
      </section>

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
      </footer>
    </div>
  );
}
