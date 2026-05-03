import { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import { Upload, CheckCircle, Clock, XCircle, Leaf, Droplets, Zap, Recycle, Sparkles, TreePine, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
=======
import { Upload, CheckCircle, Clock, XCircle, Leaf, Droplets, Zap, Recycle, Sparkles, TreePine, X, Check, ChevronDown, ChevronUp, Image } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const catIcon = { waste: Recycle, water: Droplets, energy: Zap, cleanliness: Sparkles, plantation: TreePine };
const catEmoji = { waste: '♻️', water: '💧', energy: '⚡', cleanliness: '🧹', plantation: '🌱' };

const statusBadge = (s) => {
<<<<<<< HEAD
  if (s === 'approved') return <span className="badge badge-green"><CheckCircle size={10} /> Approved</span>;
  if (s === 'rejected') return <span className="badge badge-red"><XCircle size={10} /> Rejected</span>;
  return <span className="badge badge-yellow"><Clock size={10} /> Pending</span>;
=======
  if (s === 'approved') return <span className="flex items-center gap-1 text-xs text-eco-400"><CheckCircle size={11} /> Approved</span>;
  if (s === 'rejected') return <span className="flex items-center gap-1 text-xs text-red-400"><XCircle size={11} /> Rejected</span>;
  return <span className="flex items-center gap-1 text-xs text-yellow-400"><Clock size={11} /> Pending</span>;
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
};

// ── Teacher view ────────────────────────────────────────────────────────────
function TeacherView() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [reviewModal, setReviewModal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/submissions')
      .then(r => setSubmissions(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const submitReview = async (status) => {
    if (!reviewModal) return;
    try {
      const { data } = await api.put(`/submissions/${reviewModal.sub._id}/review`, {
        teacherScore: reviewModal.score,
        status,
      });
      setSubmissions(subs => subs.map(s => s._id === reviewModal.sub._id ? { ...s, ...data, status } : s));
      setReviewModal(null);
    } catch {}
  };

  const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-5">
<<<<<<< HEAD
        <h1 className="text-xl font-bold tracking-tight">Submissions</h1>
        <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-3)' }}>Review student task submissions</p>
=======
        <h1 className="text-xl font-bold">Submissions</h1>
        <p className="text-white/40 text-sm mt-0.5">Review student task submissions</p>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
      </div>

      <div className="flex gap-2 mb-5">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
<<<<<<< HEAD
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium capitalize transition-all"
            style={filter === f
              ? { background: 'var(--accent)', color: 'white', border: '1px solid transparent' }
              : { background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-3)' }
            }>
=======
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === f ? 'bg-eco-600 text-white' : 'bg-white/5 border border-white/8 text-white/50 hover:text-white'
            }`}>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
            {f} {f === 'pending' && submissions.filter(s => s.status === 'pending').length > 0
              ? `(${submissions.filter(s => s.status === 'pending').length})` : ''}
          </button>
        ))}
      </div>

      {loading ? (
<<<<<<< HEAD
        <div className="space-y-3">{[...Array(5)].map((_,i) => (
          <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ background: 'var(--card)' }} />
        ))}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <CheckCircle size={26} className="mx-auto mb-2" style={{ color: 'var(--text-3)' }} />
          <p className="text-[13px]" style={{ color: 'var(--text-3)' }}>
            No submissions{filter !== 'all' ? ` with status "${filter}"` : ''}
          </p>
=======
        <div className="space-y-3">{[...Array(5)].map((_,i) => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
          <CheckCircle size={28} className="text-white/20 mx-auto mb-2" />
          <p className="text-white/30 text-sm">No submissions{filter !== 'all' ? ` with status "${filter}"` : ''}</p>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(sub => (
<<<<<<< HEAD
            <div key={sub._id} className="rounded-2xl overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                    style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}>
                    {sub.student?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-medium text-[13px]">{sub.student?.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                      {sub.task?.title} · {new Date(sub.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {sub.status === 'approved' && <span className="badge badge-green">Approved</span>}
                  {sub.status === 'rejected' && <span className="badge badge-red">Rejected</span>}
                  {sub.status === 'pending' && <span className="badge badge-yellow">Pending</span>}
                  {sub.status === 'pending' && (
                    <button onClick={() => setReviewModal({ sub, score: 7 })}
                      className="btn-primary text-[11px]" style={{ padding: '0.3rem 0.75rem' }}>
=======
            <div key={sub._id} className="bg-[#1c1c1e] border border-white/8 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold shrink-0">
                    {sub.student?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{sub.student?.name}</p>
                    <p className="text-xs text-white/40">{sub.task?.title} · {new Date(sub.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    sub.status === 'approved' ? 'bg-eco-600/10 border-eco-600/30 text-eco-400' :
                    sub.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                    'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                  }`}>{sub.status}</span>
                  {sub.status === 'pending' && (
                    <button onClick={() => setReviewModal({ sub, score: 7 })}
                      className="text-xs bg-eco-600 hover:bg-eco-500 text-white font-semibold px-3 py-1.5 rounded-lg transition">
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                      Review
                    </button>
                  )}
                  {sub.teacherScore != null && (
<<<<<<< HEAD
                    <span className="text-[11px] font-mono" style={{ color: 'var(--text-3)' }}>{sub.teacherScore}/10</span>
                  )}
                  <button onClick={() => setExpanded(expanded === sub._id ? null : sub._id)}
                    className="transition-colors" style={{ color: 'var(--text-3)' }}>
=======
                    <span className="text-xs text-white/40 font-medium">{sub.teacherScore}/10</span>
                  )}
                  <button onClick={() => setExpanded(expanded === sub._id ? null : sub._id)} className="text-white/30 hover:text-white transition">
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    {expanded === sub._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {expanded === sub._id && (
<<<<<<< HEAD
                <div className="px-4 pb-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
=======
                <div className="px-4 pb-4 border-t border-white/6 pt-3">
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                  <div className="grid sm:grid-cols-2 gap-3">
                    {sub.imageUrl && (
                      <img src={sub.imageUrl} alt="proof" className="w-full h-40 object-cover rounded-xl" />
                    )}
                    <div>
<<<<<<< HEAD
                      <p className="text-[11px] mb-1" style={{ color: 'var(--text-3)' }}>What they did</p>
                      <p className="text-[13px]" style={{ color: 'var(--text-2)' }}>{sub.description}</p>
                      {sub.xpAwarded > 0 && (
                        <p className="text-[12px] text-eco-400 mt-2 font-semibold font-mono">+{sub.xpAwarded} XP awarded</p>
=======
                      <p className="text-xs text-white/40 mb-1">What they did</p>
                      <p className="text-sm text-white/70">{sub.description}</p>
                      {sub.xpAwarded > 0 && (
                        <p className="text-xs text-eco-400 mt-2 font-semibold">+{sub.xpAwarded} XP awarded</p>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
<<<<<<< HEAD
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }}>
          <div className="rounded-2xl w-full max-w-md p-5 fade-in-up" style={{ background: 'var(--card)', border: '1px solid var(--border-md)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Review Submission</h2>
              <button onClick={() => setReviewModal(null)} style={{ color: 'var(--text-3)' }}><X size={16} /></button>
            </div>
            <div className="rounded-xl p-3 mb-4" style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-[13px]">{reviewModal.sub.student?.name}</span>
                <span style={{ color: 'var(--text-3)' }}>·</span>
                <span className="text-[12px]" style={{ color: 'var(--text-3)' }}>{reviewModal.sub.task?.title}</span>
=======
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1e] border border-white/10 rounded-2xl w-full max-w-md p-5 fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Review Submission</h2>
              <button onClick={() => setReviewModal(null)} className="text-white/30 hover:text-white"><X size={16} /></button>
            </div>
            <div className="bg-white/4 border border-white/8 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-sm">{reviewModal.sub.student?.name}</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-xs text-white/40">{reviewModal.sub.task?.title}</span>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
              </div>
              {reviewModal.sub.imageUrl && (
                <img src={reviewModal.sub.imageUrl} alt="proof" className="w-full h-36 object-cover rounded-lg mb-2" />
              )}
<<<<<<< HEAD
              <p className="text-[13px]" style={{ color: 'var(--text-2)' }}>{reviewModal.sub.description}</p>
            </div>
            <div className="mb-5">
              <label className="label block mb-2">
                Score: <span className="text-white font-bold text-[15px] ml-1">{reviewModal.score}/10</span>
                <span className="ml-2 font-mono text-eco-400">→ +{Math.round((reviewModal.score/10)*(reviewModal.sub.task?.xpReward||50))} XP</span>
              </label>
              <input type="range" min="1" max="10" className="w-full accent-eco-500"
                value={reviewModal.score} onChange={e => setReviewModal({...reviewModal, score: +e.target.value})} />
              <div className="flex justify-between text-[10px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                <span>1</span><span>5</span><span>10</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => submitReview('rejected')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors text-red-400"
                style={{ border: '1px solid rgba(239,68,68,0.25)' }}>
                <X size={13} /> Reject
              </button>
              <button onClick={() => submitReview('approved')} className="btn-primary flex-1 justify-center">
                <Check size={13} /> Approve
=======
              <p className="text-sm text-white/60">{reviewModal.sub.description}</p>
            </div>
            <div className="mb-5">
              <label className="text-xs text-white/50 block mb-2">
                Score: <span className="text-white font-bold text-base">{reviewModal.score}/10</span>
                <span className="text-white/30 ml-2">→ {Math.round((reviewModal.score/10)*(reviewModal.sub.task?.xpReward||50))} XP</span>
              </label>
              <input type="range" min="1" max="10" className="w-full accent-eco-500" value={reviewModal.score}
                onChange={e => setReviewModal({...reviewModal, score: +e.target.value})} />
              <div className="flex justify-between text-[10px] text-white/20 mt-0.5"><span>1</span><span>5</span><span>10</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => submitReview('rejected')}
                className="flex-1 flex items-center justify-center gap-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 py-2.5 rounded-xl transition text-sm font-medium">
                <X size={14} /> Reject
              </button>
              <button onClick={() => submitReview('approved')}
                className="flex-1 flex items-center justify-center gap-1.5 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition text-sm">
                <Check size={14} /> Approve
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Student view ─────────────────────────────────────────────────────────────
function StudentView() {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [form, setForm] = useState({ description: '', image: null });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
<<<<<<< HEAD
  const [submitError, setSubmitError] = useState('');
=======
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
  const fileRef = useRef();

  useEffect(() => {
    Promise.all([api.get('/tasks'), api.get('/submissions')])
      .then(([t, s]) => { setTasks(t.data); setSubmissions(s.data); })
      .catch(() => {});
  }, []);

  const filters = ['all', 'daily', 'weekly', 'mission', ...Object.keys(catIcon)];
  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.category === filter || t.type === filter);
  const isSubmitted = (id) => submissions.some(s => (s.task?._id || s.task) === id);

  const submitTask = async (e) => {
    e.preventDefault();
    if (!selectedTask || !form.description.trim()) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('taskId', selectedTask._id);
      fd.append('description', form.description);
      if (form.image) fd.append('image', form.image);
<<<<<<< HEAD
      const { data } = await api.post('/submissions', fd);
      setSubmissions([data, ...submissions]);
      setSelectedTask(null);
      setForm({ description: '', image: null });
      setSubmitError('');
      setSuccess('Submitted! Your teacher will review it soon.');
      setTimeout(() => setSuccess(''), 4000);
    } catch {
      setSubmitError('Submission failed. Please try again.');
    } finally { setSubmitting(false); }
=======
      const { data } = await api.post('/submissions', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSubmissions([data, ...submissions]);
      setSelectedTask(null);
      setForm({ description: '', image: null });
      setSuccess('Submitted! Your teacher will review it soon.');
      setTimeout(() => setSuccess(''), 4000);
    } catch {} finally { setSubmitting(false); }
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5">
<<<<<<< HEAD
        <h1 className="text-xl font-bold tracking-tight">Civic Hub</h1>
        <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-3)' }}>Complete real-world tasks and upload proof for teacher review</p>
      </div>

      {success && (
        <div className="flex items-center gap-2 text-[13px] text-eco-400 px-4 py-3 rounded-xl mb-4 fade-in-up"
          style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.20)' }}>
          <CheckCircle size={13} /> {success}
=======
        <h1 className="text-xl font-bold">Civic Hub</h1>
        <p className="text-white/40 text-sm mt-0.5">Complete real-world tasks and upload proof for teacher review</p>
      </div>

      {success && (
        <div className="bg-eco-600/10 border border-eco-600/30 text-eco-400 px-4 py-3 rounded-xl mb-4 text-sm fade-in-up flex items-center gap-2">
          <CheckCircle size={14} /> {success}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
<<<<<<< HEAD
            className="px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap capitalize transition-all"
            style={filter === f
              ? { background: 'var(--accent)', color: 'white', border: '1px solid transparent' }
              : { background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-3)' }
            }>
=======
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap capitalize transition-all ${
              filter === f ? 'bg-eco-600 text-white' : 'bg-white/5 border border-white/8 text-white/50 hover:text-white'
            }`}>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
            {catEmoji[f] || ''} {f}
          </button>
        ))}
      </div>

      {/* Task grid */}
      <div className="grid md:grid-cols-2 gap-3 mb-8">
        {filtered.map(task => {
          const Icon = catIcon[task.category] || Leaf;
          const done = isSubmitted(task._id);
          return (
<<<<<<< HEAD
            <div key={task._id} className="rounded-2xl p-4 transition-opacity"
              style={{
                background: 'var(--card)',
                border: `1px solid ${done ? 'var(--border-md)' : 'var(--border)'}`,
                opacity: done ? 0.55 : 1
              }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(22,163,74,0.10)', border: '1px solid rgba(22,163,74,0.20)' }}>
                    <Icon size={14} className="text-eco-400" />
                  </div>
                  <div>
                    <p className="font-medium text-[13px]">{task.title}</p>
                    <div className="flex gap-1.5 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full capitalize"
                        style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}>{task.type}</span>
                      <span className="text-[10px] text-eco-400 font-mono">+{task.xpReward} XP</span>
=======
            <div key={task._id} className={`bg-[#1c1c1e] border rounded-2xl p-4 ${done ? 'border-white/20 opacity-60' : 'border-white/8'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-eco-600/10 border border-eco-600/20 flex items-center justify-center">
                    <Icon size={15} className="text-eco-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <div className="flex gap-1.5 mt-0.5">
                      <span className="text-[10px] bg-white/6 border border-white/8 px-1.5 py-0.5 rounded-full capitalize">{task.type}</span>
                      <span className="text-[10px] text-eco-400">+{task.xpReward} XP</span>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    </div>
                  </div>
                </div>
                {done ? (
<<<<<<< HEAD
                  <span className="flex items-center gap-1 text-[11px] text-eco-400">
                    <CheckCircle size={11} /> Done
                  </span>
                ) : (
                  <button onClick={() => setSelectedTask(task)}
                    className="btn-primary text-[11px] shrink-0" style={{ padding: '0.3rem 0.75rem' }}>
=======
                  <span className="flex items-center gap-1 text-xs text-eco-400"><CheckCircle size={12} /> Done</span>
                ) : (
                  <button onClick={() => setSelectedTask(task)}
                    className="text-xs bg-eco-600 hover:bg-eco-500 text-white font-semibold px-3 py-1.5 rounded-lg transition shrink-0">
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    Do it →
                  </button>
                )}
              </div>
<<<<<<< HEAD
              <p className="text-[12px]" style={{ color: 'var(--text-3)' }}>{task.description}</p>
=======
              <p className="text-xs text-white/40">{task.description}</p>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
            </div>
          );
        })}
        {filtered.length === 0 && (
<<<<<<< HEAD
          <div className="col-span-2 rounded-2xl p-12 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <Leaf size={26} className="mx-auto mb-2" style={{ color: 'var(--text-3)' }} />
            <p className="text-[13px]" style={{ color: 'var(--text-3)' }}>No tasks found</p>
=======
          <div className="col-span-2 bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
            <Leaf size={28} className="text-white/20 mx-auto mb-2" />
            <p className="text-white/30 text-sm">No tasks found</p>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
          </div>
        )}
      </div>

      {/* My submissions */}
<<<<<<< HEAD
      <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-[13px] font-semibold mb-4">My Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-[12px] text-center py-6" style={{ color: 'var(--text-3)' }}>No submissions yet. Complete a task above!</p>
        ) : (
          <div className="space-y-2">
            {submissions.map(sub => (
              <div key={sub._id} className="flex items-center gap-3 rounded-xl p-3"
                style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}>
=======
      <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
        <h2 className="font-semibold text-sm mb-4">My Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-6">No submissions yet. Complete a task above!</p>
        ) : (
          <div className="space-y-2">
            {submissions.map(sub => (
              <div key={sub._id} className="flex items-center gap-3 bg-white/4 border border-white/6 rounded-xl p-3">
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                {sub.imageUrl && (
                  <img src={sub.imageUrl} alt="proof" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
<<<<<<< HEAD
                  <p className="text-[13px] font-medium truncate">{sub.task?.title || 'Task'}</p>
                  <p className="text-[11px] truncate" style={{ color: 'var(--text-3)' }}>{sub.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {sub.teacherScore != null && <span className="text-[11px] font-mono" style={{ color: 'var(--text-3)' }}>{sub.teacherScore}/10</span>}
                  {sub.xpAwarded > 0 && <span className="text-[11px] font-semibold font-mono text-eco-400">+{sub.xpAwarded}</span>}
=======
                  <p className="text-sm font-medium truncate">{sub.task?.title || 'Task'}</p>
                  <p className="text-xs text-white/30 truncate">{sub.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {sub.teacherScore != null && <span className="text-xs text-white/40">{sub.teacherScore}/10</span>}
                  {sub.xpAwarded > 0 && <span className="text-xs font-semibold text-eco-400">+{sub.xpAwarded} XP</span>}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                  {statusBadge(sub.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit modal */}
      {selectedTask && (
<<<<<<< HEAD
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }}>
          <div className="rounded-2xl w-full max-w-md p-5 fade-in-up" style={{ background: 'var(--card)', border: '1px solid var(--border-md)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{catEmoji[selectedTask.category]}</span>
                <div>
                  <h2 className="font-bold text-[14px]">{selectedTask.title}</h2>
                  <p className="text-[11px] text-eco-400 font-mono">+{selectedTask.xpReward} XP on approval</p>
                </div>
              </div>
              <button onClick={() => setSelectedTask(null)} style={{ color: 'var(--text-3)' }}><X size={16} /></button>
            </div>

            <p className="text-[12px] mb-4 rounded-xl p-3" style={{ background: 'var(--tile)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
              {selectedTask.description}
            </p>

            <form onSubmit={submitTask} className="space-y-4">
              <div>
                <label className="label block mb-1.5">What did you do? *</label>
=======
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1e] border border-white/10 rounded-2xl w-full max-w-md p-5 fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{catEmoji[selectedTask.category]}</span>
                <div>
                  <h2 className="font-bold text-sm">{selectedTask.title}</h2>
                  <p className="text-xs text-eco-400">+{selectedTask.xpReward} XP on approval</p>
                </div>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-white/30 hover:text-white"><X size={16} /></button>
            </div>

            <p className="text-xs text-white/40 mb-4 bg-white/4 border border-white/6 rounded-xl p-3">{selectedTask.description}</p>

            <form onSubmit={submitTask} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 block mb-1">What did you do? *</label>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                <textarea className="input min-h-[90px] resize-none" placeholder="Describe your real-world action in detail..."
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>

              <div>
<<<<<<< HEAD
                <label className="label block mb-1.5">Upload Photo / Video</label>
                <div onClick={() => fileRef.current.click()}
                  className="rounded-xl p-4 text-center cursor-pointer transition-colors"
                  style={{ border: '1px dashed var(--border-md)' }}>
                  {form.image ? (
                    <div className="flex items-center justify-center gap-2 text-[13px]" style={{ color: 'var(--text-2)' }}>
                      <Upload size={13} /> {form.image.name}
                      <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                        ({(form.image.size / (1024 * 1024)).toFixed(1)} MB)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1" style={{ color: 'var(--text-3)' }}>
                      <Upload size={18} />
                      <span className="text-[11px]">Click to upload</span>
                      <span className="text-[10px]">Image: max 10 MB &nbsp;·&nbsp; Video: max 50 MB</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*,video/mp4,video/mov,video/avi,video/webm,video/3gpp" className="hidden"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const isImage = file.type.startsWith('image/');
                    const isVideo = file.type.startsWith('video/');
                    if (isImage && file.size > 10 * 1024 * 1024) {
                      setSubmitError('Image must be under 10 MB');
                      e.target.value = '';
                      return;
                    }
                    if (isVideo && file.size > 50 * 1024 * 1024) {
                      setSubmitError('Video must be under 50 MB');
                      e.target.value = '';
                      return;
                    }
                    setSubmitError('');
                    setForm({...form, image: file});
                  }} />
              </div>

              <div className="flex items-center gap-2 text-[12px] rounded-xl p-3"
                style={{ background: 'var(--tile)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
                <span>👨‍🏫</span> Your teacher will review and approve your submission.
              </div>

              {submitError && <p className="text-[12px] text-red-400 text-center">{submitError}</p>}

              <div className="flex gap-3">
                <button type="button" onClick={() => setSelectedTask(null)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">
=======
                <label className="text-xs text-white/50 block mb-1">Upload Photo / Video</label>
                <div onClick={() => fileRef.current.click()}
                  className="border border-dashed border-white/15 rounded-xl p-4 text-center cursor-pointer hover:border-eco-600/50 transition">
                  {form.image ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                      <Upload size={14} /> {form.image.name}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-white/25">
                      <Upload size={20} />
                      <span className="text-xs">Click to upload (max 5MB)</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden"
                  onChange={e => setForm({...form, image: e.target.files[0]})} />
              </div>

              <div className="flex items-center gap-2 text-xs text-white/30 bg-white/4 border border-white/6 rounded-xl p-3">
                <span>👨‍🏫</span> Your teacher will review and approve your submission.
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setSelectedTask(null)}
                  className="flex-1 border border-white/20 text-white/60 py-2.5 rounded-xl hover:bg-white/5 transition text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition text-sm disabled:opacity-50">
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function CivicHub() {
  const { user } = useAuth();

  return (
<<<<<<< HEAD
    <div className="min-h-screen bw-theme" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-56 p-4 md:p-6 pb-20 md:pb-6">
          {user?.role === 'teacher' ? <TeacherView /> : <StudentView />}
        </main>
      </div>
=======
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6">
          {user?.role === 'teacher' ? <TeacherView /> : <StudentView />}
        </main>
      </div>
      <Chatbot />
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
    </div>
  );
}
