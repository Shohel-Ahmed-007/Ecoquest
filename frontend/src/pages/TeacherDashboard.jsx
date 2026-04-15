import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X, Check, Users, Inbox, ClipboardList, FileText, Star, Trash2, ChevronDown, ChevronUp, Image } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const CLASSES = ['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12','College Year 1','College Year 2','College Year 3'];
const SUBJECTS = ['Environmental Science','Biology','Geography','Chemistry','General'];
const CATEGORIES = ['waste','water','energy','cleanliness','plantation'];
const catIcon = { waste: '♻️', water: '💧', energy: '⚡', cleanliness: '🧹', plantation: '🌱' };
const emptyQ = () => ({ question: '', options: ['','','',''], correctIndex: 0, explanation: '' });

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [taskModal, setTaskModal] = useState(false);
  const [quizModal, setQuizModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(null);
  const [expandedSub, setExpandedSub] = useState(null);

  // Forms
  const [taskForm, setTaskForm] = useState({ title:'', description:'', category:'waste', type:'daily', xpReward:50 });
  const [quizForm, setQuizForm] = useState({ title:'', subject:'Environmental Science', chapter:'', class:'Class 9', xpReward:100 });
  const [questions, setQuestions] = useState([emptyQ()]);

  useEffect(() => {
    Promise.all([
      api.get('/users/students'),
      api.get('/submissions'),
      api.get('/tasks'),
      api.get('/quizzes'),
    ]).then(([s, sub, t, q]) => {
      setStudents(s.data);
      setSubmissions(sub.data);
      setTasks(t.data);
      setQuizzes(q.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const pending = submissions.filter(s => s.status === 'pending');

  // Task CRUD
  const createTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/tasks', taskForm);
      setTasks([data, ...tasks]);
      setTaskModal(false);
      setTaskForm({ title:'', description:'', category:'waste', type:'daily', xpReward:50 });
    } catch {}
  };
  const deleteTask = async (id) => {
    try { await api.delete(`/tasks/${id}`); setTasks(tasks.filter(t => t._id !== id)); } catch {}
  };

  // Quiz CRUD
  const addQ = () => setQuestions([...questions, emptyQ()]);
  const removeQ = (i) => setQuestions(questions.filter((_, idx) => idx !== i));
  const updateQ = (i, field, val) => setQuestions(questions.map((q, idx) => idx === i ? { ...q, [field]: val } : q));
  const updateOpt = (qi, oi, val) => setQuestions(questions.map((q, i) => {
    if (i !== qi) return q;
    const opts = [...q.options]; opts[oi] = val; return { ...q, options: opts };
  }));
  const createQuiz = async (e) => {
    e.preventDefault();
    const filled = questions.filter(q => q.question.trim() && q.options.every(o => o.trim()));
    if (!filled.length) return;
    try {
      const { data } = await api.post('/quizzes', { ...quizForm, questions: filled });
      setQuizzes([data, ...quizzes]);
      setQuizModal(false);
      setQuizForm({ title:'', subject:'Environmental Science', chapter:'', class:'Class 9', xpReward:100 });
      setQuestions([emptyQ()]);
    } catch {}
  };

  // Review
  const submitReview = async (status) => {
    if (!reviewModal) return;
    try {
      const { data } = await api.put(`/submissions/${reviewModal.sub._id}/review`, { teacherScore: reviewModal.score, status });
      setSubmissions(submissions.map(s => s._id === reviewModal.sub._id ? { ...s, ...data, status } : s));
      setReviewModal(null);
    } catch {}
  };

  const tabs = [
    { id:'overview', label:'Overview', icon: ClipboardList },
    { id:'submissions', label:`Reviews${pending.length ? ` (${pending.length})` : ''}`, icon: Inbox },
    { id:'tasks', label:'Tasks', icon: ClipboardList },
    { id:'quizzes', label:'Quizzes', icon: FileText },
    { id:'students', label:'Students', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-bold">Teacher Dashboard</h1>
                <p className="text-white/40 text-sm">{user?.name} · {user?.school}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setQuizModal(true)} className="flex items-center gap-1.5 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm px-3 py-2 rounded-lg transition">
                  <Plus size={14} /> Quiz
                </button>
                <button onClick={() => setTaskModal(true)} className="flex items-center gap-1.5 bg-eco-600 hover:bg-eco-500 text-white text-sm font-semibold px-3 py-2 rounded-lg transition">
                  <Plus size={14} /> Task
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white/4 border border-white/8 rounded-xl p-1 mb-5 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    tab === id ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                  }`}>
                  <Icon size={13} />{label}
                </button>
              ))}
            </div>

            {/* ── OVERVIEW ── */}
            {tab === 'overview' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: Users, label:'Students', value: students.length, tab:'students' },
                    { icon: Inbox, label:'Pending Reviews', value: pending.length, tab:'submissions' },
                    { icon: ClipboardList, label:'Active Tasks', value: tasks.length, tab:'tasks' },
                    { icon: FileText, label:'Quizzes', value: quizzes.length, tab:'quizzes' },
                  ].map(s => (
                    <button key={s.label} onClick={() => setTab(s.tab)} className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-4 text-left hover:bg-white/5 transition">
                      <s.icon size={18} className="text-white/40 mb-2" />
                      <p className="text-2xl font-black">{s.value}</p>
                      <p className="text-xs text-white/40">{s.label}</p>
                    </button>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-semibold text-sm">Latest Pending</h2>
                      <button onClick={() => setTab('submissions')} className="text-xs text-white/40 hover:text-white transition">View all →</button>
                    </div>
                    {pending.slice(0,3).map(sub => (
                      <div key={sub._id} className="flex items-center justify-between bg-white/4 border border-white/6 rounded-xl p-3 mb-2">
                        <div>
                          <p className="text-sm font-medium">{sub.student?.name}</p>
                          <p className="text-xs text-white/30">{sub.task?.title}</p>
                        </div>
                        <button onClick={() => setReviewModal({ sub, score: 7 })} className="text-xs bg-eco-600 hover:bg-eco-500 text-white font-semibold px-3 py-1.5 rounded-lg transition">Review</button>
                      </div>
                    ))}
                    {pending.length === 0 && <p className="text-white/30 text-sm text-center py-4">All caught up! ✓</p>}
                  </div>

                  <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="font-semibold text-sm">Top Students</h2>
                      <Link to="/leaderboard" className="text-xs text-white/40 hover:text-white transition">Leaderboard →</Link>
                    </div>
                    {[...students].sort((a,b) => b.xp-a.xp).slice(0,5).map((s, i) => (
                      <div key={s._id} className="flex items-center gap-3 bg-white/4 border border-white/6 rounded-xl p-3 mb-2">
                        <span className="text-xs font-black w-5 text-center text-white/30">#{i+1}</span>
                        <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold">{s.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{s.name}</p>
                          <p className="text-xs text-white/30">{s.class}</p>
                        </div>
                        <span className="text-sm font-bold">{s.xp} <span className="text-xs text-white/40">XP</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── SUBMISSIONS ── */}
            {tab === 'submissions' && (
              <div className="space-y-3">
                <div className="flex gap-2 mb-2">
                  {['all','pending','approved','rejected'].map(f => (
                    <button key={f} onClick={() => {}} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg capitalize text-white/60 hover:text-white hover:bg-white/10 transition">{f}</button>
                  ))}
                </div>
                {submissions.length === 0 ? (
                  <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
                    <Inbox size={32} className="text-white/20 mx-auto mb-2" />
                    <p className="text-white/30">No submissions yet</p>
                  </div>
                ) : submissions.map(sub => (
                  <div key={sub._id} className="bg-[#1c1c1e] border border-white/8 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">{sub.student?.name?.[0]}</div>
                        <div>
                          <p className="font-medium text-sm">{sub.student?.name}</p>
                          <p className="text-xs text-white/40">{sub.task?.title} · {new Date(sub.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                          sub.status === 'approved' ? 'bg-white/10 border-white/20 text-white' :
                          sub.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                          'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                        }`}>{sub.status}</span>
                        {sub.status === 'pending' && (
                          <button onClick={() => setReviewModal({ sub, score: 7 })} className="text-xs bg-eco-600 hover:bg-eco-500 text-white font-semibold px-3 py-1.5 rounded-lg transition">Review</button>
                        )}
                        <button onClick={() => setExpandedSub(expandedSub === sub._id ? null : sub._id)} className="text-white/30 hover:text-white transition">
                          {expandedSub === sub._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>
                    {expandedSub === sub._id && (
                      <div className="px-4 pb-4 border-t border-white/6 pt-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {sub.imageUrl && (
                            <img src={sub.imageUrl} alt="proof" className="w-full h-40 object-cover rounded-xl" />
                          )}
                          <div>
                            <p className="text-xs text-white/40 mb-1">Description</p>
                            <p className="text-sm text-white/70">{sub.description}</p>
                            {sub.teacherScore != null && <p className="text-xs text-white/40 mt-2">Score: {sub.teacherScore}/10 · +{sub.xpAwarded} XP</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── TASKS ── */}
            {tab === 'tasks' && (
              <div>
                <div className="flex justify-end mb-4">
                  <button onClick={() => setTaskModal(true)} className="flex items-center gap-1.5 bg-eco-600 hover:bg-eco-500 text-white text-sm font-semibold px-3 py-2 rounded-lg transition">
                    <Plus size={14} /> Create Task
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tasks.map(task => (
                    <div key={task._id} className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xl">{catIcon[task.category]}</span>
                        <button onClick={() => deleteTask(task._id)} className="text-white/20 hover:text-red-400 transition"><Trash2 size={14} /></button>
                      </div>
                      <p className="font-medium text-sm mb-1">{task.title}</p>
                      <p className="text-xs text-white/40 line-clamp-2 mb-3">{task.description}</p>
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="text-[10px] bg-white/8 border border-white/10 px-2 py-0.5 rounded-full capitalize">{task.type}</span>
                        <span className="text-[10px] bg-white/8 border border-white/10 px-2 py-0.5 rounded-full capitalize">{task.category}</span>
                        <span className="text-[10px] bg-white/8 border border-white/10 px-2 py-0.5 rounded-full">+{task.xpReward} XP</span>
                      </div>
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="col-span-3 bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
                      <ClipboardList size={28} className="text-white/20 mx-auto mb-2" />
                      <p className="text-white/30 text-sm">No tasks yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── QUIZZES ── */}
            {tab === 'quizzes' && (
              <div>
                <div className="flex justify-end mb-4">
                  <button onClick={() => setQuizModal(true)} className="flex items-center gap-1.5 bg-eco-600 hover:bg-eco-500 text-white text-sm font-semibold px-3 py-2 rounded-lg transition">
                    <Plus size={14} /> Create Quiz
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {quizzes.map(quiz => (
                    <div key={quiz._id} className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <FileText size={18} className="text-white/40" />
                        <span className="text-[10px] bg-white/8 border border-white/10 px-2 py-0.5 rounded-full">+{quiz.xpReward} XP</span>
                      </div>
                      <p className="font-medium text-sm mb-1">{quiz.title}</p>
                      <p className="text-xs text-white/40 mb-3">{quiz.subject} · {quiz.chapter} · {quiz.class}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/30">{quiz.questions?.length || 0} questions</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${quiz.isActive ? 'border-white/20 text-white/60' : 'border-white/10 text-white/20'}`}>
                          {quiz.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {quizzes.length === 0 && (
                    <div className="col-span-3 bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
                      <FileText size={28} className="text-white/20 mx-auto mb-2" />
                      <p className="text-white/30 text-sm">No quizzes yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── STUDENTS ── */}
            {tab === 'students' && (
              <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl overflow-hidden">
                {loading ? (
                  <div className="p-6 space-y-3">{[...Array(5)].map((_,i) => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/8">
                      <tr className="text-white/30 text-xs">
                        <th className="text-left px-5 py-3">Name</th>
                        <th className="text-left px-5 py-3 hidden sm:table-cell">Class</th>
                        <th className="text-right px-5 py-3">XP</th>
                        <th className="text-right px-5 py-3 hidden md:table-cell">Level</th>
                        <th className="text-right px-5 py-3 hidden md:table-cell">Streak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[...students].sort((a,b) => b.xp-a.xp).map((s, i) => (
                        <tr key={s._id} className="hover:bg-white/3 transition">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{s.name[0]}</div>
                              <span className="font-medium">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-white/40 hidden sm:table-cell">{s.class}</td>
                          <td className="px-5 py-3 text-right font-bold">{s.xp}</td>
                          <td className="px-5 py-3 text-right text-white/50 hidden md:table-cell">Lv.{s.level}</td>
                          <td className="px-5 py-3 text-right text-white/50 hidden md:table-cell">{s.streak}🔥</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Create Task Modal ── */}
      {taskModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1e] border border-white/10 rounded-2xl w-full max-w-md p-5 fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Create Task</h2>
              <button onClick={() => setTaskModal(false)} className="text-white/30 hover:text-white"><X size={16} /></button>
            </div>
            <form onSubmit={createTask} className="space-y-3">
              <div>
                <label className="text-xs text-white/50 block mb-1">Title</label>
                <input className="input" placeholder="Plant a tree near school" value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} required />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Description</label>
                <textarea className="input min-h-[80px] resize-none" placeholder="What should students do?" value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/50 block mb-1">Category</label>
                  <select className="input" value={taskForm.category} onChange={e => setTaskForm({...taskForm, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#1c1c1e] capitalize">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Type</label>
                  <select className="input" value={taskForm.type} onChange={e => setTaskForm({...taskForm, type: e.target.value})}>
                    {['daily','weekly','mission'].map(t => <option key={t} value={t} className="bg-[#1c1c1e] capitalize">{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">XP Reward: <span className="text-white font-bold">{taskForm.xpReward}</span></label>
                <input type="range" min="10" max="200" step="10" className="w-full" value={taskForm.xpReward} onChange={e => setTaskForm({...taskForm, xpReward:+e.target.value})} />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setTaskModal(false)} className="flex-1 border border-white/20 text-white/60 py-2.5 rounded-xl hover:bg-white/5 transition text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition text-sm">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Create Quiz Modal ── */}
      {quizModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1c1c1e] border border-white/10 rounded-2xl w-full max-w-2xl p-5 my-4 fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Create Quiz</h2>
              <button onClick={() => { setQuizModal(false); setQuestions([emptyQ()]); }} className="text-white/30 hover:text-white"><X size={16} /></button>
            </div>
            <form onSubmit={createQuiz} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs text-white/50 block mb-1">Quiz Title</label>
                  <input className="input" placeholder="e.g. Ecosystem Basics" value={quizForm.title} onChange={e => setQuizForm({...quizForm, title: e.target.value})} required />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Subject</label>
                  <select className="input" value={quizForm.subject} onChange={e => setQuizForm({...quizForm, subject: e.target.value})}>
                    {SUBJECTS.map(s => <option key={s} className="bg-[#1c1c1e]">{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Chapter</label>
                  <input className="input" placeholder="e.g. Ecosystem" value={quizForm.chapter} onChange={e => setQuizForm({...quizForm, chapter: e.target.value})} required />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Class</label>
                  <select className="input" value={quizForm.class} onChange={e => setQuizForm({...quizForm, class: e.target.value})}>
                    {CLASSES.map(c => <option key={c} className="bg-[#1c1c1e]">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">XP Reward: <span className="text-white font-bold">{quizForm.xpReward}</span></label>
                  <input type="range" min="50" max="300" step="25" className="w-full mt-1.5" value={quizForm.xpReward} onChange={e => setQuizForm({...quizForm, xpReward:+e.target.value})} />
                </div>
              </div>

              {/* Questions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold">Questions <span className="text-white/30 font-normal">({questions.length})</span></h3>
                  <button type="button" onClick={addQ} className="flex items-center gap-1 text-xs border border-white/20 px-2.5 py-1.5 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition">
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                  {questions.map((q, qi) => (
                    <div key={qi} className="bg-white/4 border border-white/8 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white/50">Q{qi+1}</span>
                        {questions.length > 1 && (
                          <button type="button" onClick={() => removeQ(qi)} className="text-white/20 hover:text-red-400 transition"><X size={13} /></button>
                        )}
                      </div>
                      <input className="input text-sm mb-3" placeholder="Question..." value={q.question} onChange={e => updateQ(qi,'question',e.target.value)} required />
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="flex items-center gap-2">
                            <button type="button" onClick={() => updateQ(qi,'correctIndex',oi)}
                              className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${q.correctIndex === oi ? 'border-white bg-white' : 'border-white/20 hover:border-white/50'}`} />
                            <input className="input text-xs py-1.5 flex-1" placeholder={`Option ${String.fromCharCode(65+oi)}`} value={opt} onChange={e => updateOpt(qi,oi,e.target.value)} required />
                          </div>
                        ))}
                      </div>
                      <input className="input text-xs py-1.5" placeholder="Explanation (optional)" value={q.explanation} onChange={e => updateQ(qi,'explanation',e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setQuizModal(false); setQuestions([emptyQ()]); }} className="flex-1 border border-white/20 text-white/60 py-2.5 rounded-xl hover:bg-white/5 transition text-sm">Cancel</button>
                <button type="submit" className="flex-1 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition text-sm">Publish Quiz ({questions.length}Q)</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Review Modal ── */}
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
              <input type="range" min="1" max="10" className="w-full" value={reviewModal.score} onChange={e => setReviewModal({...reviewModal, score:+e.target.value})} />
              <div className="flex justify-between text-[10px] text-white/20 mt-0.5"><span>1</span><span>5</span><span>10</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => submitReview('rejected')} className="flex-1 flex items-center justify-center gap-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 py-2.5 rounded-xl transition text-sm font-medium">
                <X size={14} /> Reject
              </button>
              <button onClick={() => submitReview('approved')} className="flex-1 flex items-center justify-center gap-1.5 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition text-sm">
                <Check size={14} /> Approve
              </button>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
}
