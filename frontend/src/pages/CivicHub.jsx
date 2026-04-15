import { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle, Clock, XCircle, Leaf, Droplets, Zap, Recycle, Sparkles, TreePine, X, Check, ChevronDown, ChevronUp, Image } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const catIcon = { waste: Recycle, water: Droplets, energy: Zap, cleanliness: Sparkles, plantation: TreePine };
const catEmoji = { waste: '♻️', water: '💧', energy: '⚡', cleanliness: '🧹', plantation: '🌱' };

const statusBadge = (s) => {
  if (s === 'approved') return <span className="flex items-center gap-1 text-xs text-eco-400"><CheckCircle size={11} /> Approved</span>;
  if (s === 'rejected') return <span className="flex items-center gap-1 text-xs text-red-400"><XCircle size={11} /> Rejected</span>;
  return <span className="flex items-center gap-1 text-xs text-yellow-400"><Clock size={11} /> Pending</span>;
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
        <h1 className="text-xl font-bold">Submissions</h1>
        <p className="text-white/40 text-sm mt-0.5">Review student task submissions</p>
      </div>

      <div className="flex gap-2 mb-5">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === f ? 'bg-eco-600 text-white' : 'bg-white/5 border border-white/8 text-white/50 hover:text-white'
            }`}>
            {f} {f === 'pending' && submissions.filter(s => s.status === 'pending').length > 0
              ? `(${submissions.filter(s => s.status === 'pending').length})` : ''}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_,i) => <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
          <CheckCircle size={28} className="text-white/20 mx-auto mb-2" />
          <p className="text-white/30 text-sm">No submissions{filter !== 'all' ? ` with status "${filter}"` : ''}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(sub => (
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
                      Review
                    </button>
                  )}
                  {sub.teacherScore != null && (
                    <span className="text-xs text-white/40 font-medium">{sub.teacherScore}/10</span>
                  )}
                  <button onClick={() => setExpanded(expanded === sub._id ? null : sub._id)} className="text-white/30 hover:text-white transition">
                    {expanded === sub._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {expanded === sub._id && (
                <div className="px-4 pb-4 border-t border-white/6 pt-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {sub.imageUrl && (
                      <img src={sub.imageUrl} alt="proof" className="w-full h-40 object-cover rounded-xl" />
                    )}
                    <div>
                      <p className="text-xs text-white/40 mb-1">What they did</p>
                      <p className="text-sm text-white/70">{sub.description}</p>
                      {sub.xpAwarded > 0 && (
                        <p className="text-xs text-eco-400 mt-2 font-semibold">+{sub.xpAwarded} XP awarded</p>
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
              </div>
              {reviewModal.sub.imageUrl && (
                <img src={reviewModal.sub.imageUrl} alt="proof" className="w-full h-36 object-cover rounded-lg mb-2" />
              )}
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
      const { data } = await api.post('/submissions', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSubmissions([data, ...submissions]);
      setSelectedTask(null);
      setForm({ description: '', image: null });
      setSuccess('Submitted! Your teacher will review it soon.');
      setTimeout(() => setSuccess(''), 4000);
    } catch {} finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-bold">Civic Hub</h1>
        <p className="text-white/40 text-sm mt-0.5">Complete real-world tasks and upload proof for teacher review</p>
      </div>

      {success && (
        <div className="bg-eco-600/10 border border-eco-600/30 text-eco-400 px-4 py-3 rounded-xl mb-4 text-sm fade-in-up flex items-center gap-2">
          <CheckCircle size={14} /> {success}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap capitalize transition-all ${
              filter === f ? 'bg-eco-600 text-white' : 'bg-white/5 border border-white/8 text-white/50 hover:text-white'
            }`}>
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
                    </div>
                  </div>
                </div>
                {done ? (
                  <span className="flex items-center gap-1 text-xs text-eco-400"><CheckCircle size={12} /> Done</span>
                ) : (
                  <button onClick={() => setSelectedTask(task)}
                    className="text-xs bg-eco-600 hover:bg-eco-500 text-white font-semibold px-3 py-1.5 rounded-lg transition shrink-0">
                    Do it →
                  </button>
                )}
              </div>
              <p className="text-xs text-white/40">{task.description}</p>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-2 bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
            <Leaf size={28} className="text-white/20 mx-auto mb-2" />
            <p className="text-white/30 text-sm">No tasks found</p>
          </div>
        )}
      </div>

      {/* My submissions */}
      <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
        <h2 className="font-semibold text-sm mb-4">My Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-6">No submissions yet. Complete a task above!</p>
        ) : (
          <div className="space-y-2">
            {submissions.map(sub => (
              <div key={sub._id} className="flex items-center gap-3 bg-white/4 border border-white/6 rounded-xl p-3">
                {sub.imageUrl && (
                  <img src={sub.imageUrl} alt="proof" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{sub.task?.title || 'Task'}</p>
                  <p className="text-xs text-white/30 truncate">{sub.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {sub.teacherScore != null && <span className="text-xs text-white/40">{sub.teacherScore}/10</span>}
                  {sub.xpAwarded > 0 && <span className="text-xs font-semibold text-eco-400">+{sub.xpAwarded} XP</span>}
                  {statusBadge(sub.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit modal */}
      {selectedTask && (
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
                <textarea className="input min-h-[90px] resize-none" placeholder="Describe your real-world action in detail..."
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
              </div>

              <div>
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
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6">
          {user?.role === 'teacher' ? <TeacherView /> : <StudentView />}
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
