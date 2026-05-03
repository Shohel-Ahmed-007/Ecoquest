import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { BookOpen, ChevronRight, FileText, Star, ArrowRight, ClipboardList, ExternalLink, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const defaultConcepts = [
  'This chapter covers important environmental concepts.',
  'Understanding this topic helps build awareness about our natural world.',
  'Real-world applications of these concepts can create lasting change.',
  'Practice through civic tasks to reinforce your learning.',
];

export default function LearnPage() {
  const { user } = useAuth();
  const [view, setView] = useState('tests'); // 'tests' | 'learn'
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      api.get(`/quizzes?class=${encodeURIComponent(user.class || '')}`),
      api.get(`/notes?class=${encodeURIComponent(user.class || '')}`),
      api.get('/subjects'),
    ])
      .then(([qr, nr, sr]) => {
        setQuizzes(qr.data);
        setNotes(nr.data);
        setSubjects(sr.data);
        if (sr.data.length) setActiveSubjectId(sr.data[0]._id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const activeSubject = subjects.find(s => s._id === activeSubjectId);
  const activeChapter = activeSubject?.chapters.find(c => c._id === activeChapterId);

  const chapterQuizzes = activeSubject && activeChapter
    ? quizzes.filter(q => q.subject === activeSubject.name && q.chapter?.toLowerCase() === activeChapter.name.toLowerCase())
    : activeSubject
      ? quizzes.filter(q => q.subject === activeSubject.name)
      : [];

  const chapterUploadedNotes = activeSubject && activeChapter
    ? notes.filter(n => n.subject === activeSubject.name && n.chapter?.toLowerCase() === activeChapter.name.toLowerCase())
    : activeSubject
      ? notes.filter(n => n.subject === activeSubject.name)
      : [];

  const viewTabs = [
    { id: 'tests', label: `All Tests (${quizzes.length})`, icon: ClipboardList },
    { id: 'learn', label: 'Learn by Chapter', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bw-theme" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-56 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-5">
              <h1 className="text-xl font-bold tracking-tight">Learning Hub</h1>
              <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-3)' }}>Teacher-curated content for {user?.class}</p>
            </div>

            {/* View toggle */}
            <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              {viewTabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setView(id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all"
                  style={view === id
                    ? { background: 'var(--tile)', color: 'white', border: '1px solid var(--border-md)' }
                    : { color: 'var(--text-3)', border: '1px solid transparent' }
                  }>
                  <Icon size={12} />{label}
=======
import { BookOpen, ChevronRight, FileText, Star, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const subjects = ['Environmental Science', 'Biology', 'Geography', 'Chemistry'];
const chapters = {
  'Environmental Science': ['Ecosystem', 'Biodiversity', 'Climate Change', 'Pollution', 'Conservation'],
  Biology: ['Cell Biology', 'Photosynthesis', 'Ecology', 'Food Chains'],
  Geography: ['Natural Resources', 'Water Cycle', 'Soil', 'Forests'],
  Chemistry: ['Green Chemistry', 'Acid Rain', 'Ozone Layer'],
};

const chapterNotes = {
  Ecosystem: ['An ecosystem includes all living organisms and their physical environment.', 'Energy flows through ecosystems via food chains and food webs.', 'Nutrient cycles (like carbon and nitrogen) are essential for life.', 'Ecosystems can be terrestrial (land) or aquatic (water-based).'],
  Biodiversity: ['Biodiversity refers to the variety of life on Earth.', 'It includes genetic, species, and ecosystem diversity.', 'Human activities are the leading cause of biodiversity loss.', 'Conservation efforts aim to protect endangered species and habitats.'],
  default: ['This chapter covers important environmental concepts.', 'Understanding this topic helps build awareness about our natural world.', 'Real-world applications of these concepts can create lasting change.', 'Practice through civic tasks to reinforce your learning.'],
};

export default function LearnPage() {
  const { user } = useAuth();
  const [subject, setSubject] = useState('Environmental Science');
  const [chapter, setChapter] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/quizzes?class=${encodeURIComponent(user?.class || '')}`)
      .then(r => setQuizzes(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.class]);

  const chapterList = chapters[subject] || [];
  const notes = chapter ? (chapterNotes[chapter] || chapterNotes.default) : [];
  const chapterQuizzes = quizzes.filter(q => q.subject === subject || q.chapter === chapter);

  return (
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-5">
              <h1 className="text-xl font-bold">Learning Hub</h1>
              <p className="text-white/40 text-sm mt-0.5">Teacher-curated content for {user?.class}</p>
            </div>

            {/* Subject tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
              {subjects.map(s => (
                <button key={s} onClick={() => { setSubject(s); setChapter(null); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    subject === s ? 'bg-white text-black' : 'bg-white/5 border border-white/8 text-white/50 hover:text-white'
                  }`}>
                  {s}
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                </button>
              ))}
            </div>

<<<<<<< HEAD
            {/* ── ALL TESTS VIEW ── */}
            {view === 'tests' && (
              <div>
                {loading ? (
                  <div className="space-y-2">{[1,2,3].map(i => (
                    <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'var(--card)' }} />
                  ))}</div>
                ) : quizzes.length === 0 ? (
                  <div className="rounded-2xl p-14 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <FileText size={28} className="mx-auto mb-2" style={{ color: 'var(--text-3)' }} />
                    <p className="text-[13px]" style={{ color: 'var(--text-3)' }}>No tests assigned for your class yet</p>
                    <p className="text-[11px] mt-1" style={{ color: 'var(--text-3)' }}>Your teacher will add tests here</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {quizzes.map(q => (
                      <Link key={q._id} to={`/quiz/${q._id}`}
                        className="flex items-center justify-between rounded-2xl p-4 transition-colors group"
                        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}>
                            <FileText size={16} style={{ color: 'var(--text-3)' }} />
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold">{q.title}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                              {q.subject} · {q.chapter} · {q.class} · {q.questions?.length || 0} questions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[12px] flex items-center gap-1 font-mono font-semibold text-eco-400">
                            <Star size={10} />+{q.xpReward} XP
                          </span>
                          <div className="btn-primary text-[12px]" style={{ padding: '0.35rem 0.85rem' }}>
                            Start <ArrowRight size={11} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── LEARN BY CHAPTER VIEW ── */}
            {view === 'learn' && (
              subjects.length === 0 ? (
                <div className="rounded-2xl p-14 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <BookOpen size={28} className="mx-auto mb-2" style={{ color: 'var(--text-3)' }} />
                  <p className="text-[13px]" style={{ color: 'var(--text-3)' }}>Your teacher hasn't set up the curriculum yet</p>
                </div>
              ) : (
                <>
                  {/* Subject tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                    {subjects.map(s => (
                      <button key={s._id} onClick={() => { setActiveSubjectId(s._id); setActiveChapterId(null); }}
                        className="px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all"
                        style={activeSubjectId === s._id
                          ? { background: 'var(--accent)', color: 'white', border: '1px solid transparent' }
                          : { background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text-2)' }
                        }>
                        {s.name}
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Chapter list */}
                    <div className="rounded-2xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                      <p className="label mb-3">Chapters</p>
                      <div className="space-y-0.5">
                        {(activeSubject?.chapters || []).map((ch, i) => (
                          <button key={ch._id} onClick={() => setActiveChapterId(ch._id)}
                            className="w-full text-left px-3 py-2.5 rounded-lg text-[13px] transition-all flex items-center justify-between"
                            style={activeChapterId === ch._id
                              ? { background: 'rgba(22,163,74,0.12)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.25)' }
                              : { color: 'var(--text-2)', border: '1px solid transparent' }
                            }>
                            <span className="flex items-center gap-2">
                              <span className="text-[10px] font-mono" style={{ color: activeChapterId === ch._id ? 'rgba(74,222,128,0.5)' : 'var(--text-3)' }}>
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              {ch.name}
                            </span>
                            <ChevronRight size={12} style={{ color: activeChapterId === ch._id ? 'rgba(74,222,128,0.5)' : 'var(--text-3)' }} />
                          </button>
                        ))}
                        {!activeSubject?.chapters.length && (
                          <p className="text-[12px] text-center py-4" style={{ color: 'var(--text-3)' }}>No chapters yet</p>
                        )}
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="md:col-span-2 space-y-4">
                      {!activeChapter ? (
                        <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                          <BookOpen size={28} className="mx-auto mb-2" style={{ color: 'var(--text-3)' }} />
                          <p className="text-[13px]" style={{ color: 'var(--text-3)' }}>Select a chapter to start learning</p>
                        </div>
                      ) : (
                        <>
                          <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                            <div className="mb-4">
                              <h2 className="text-lg font-bold tracking-tight">{activeChapter.name}</h2>
                              <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-3)' }}>{activeSubject?.name}</p>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-[12px] font-semibold mb-2.5" style={{ color: 'var(--text-2)' }}>Key Concepts</h3>
                                <ul className="space-y-2">
                                  {defaultConcepts.map((n, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-[13px]" style={{ color: 'var(--text-2)' }}>
                                      <span className="text-eco-400 mt-0.5 shrink-0 text-[10px]">→</span> {n}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="rounded-xl p-3 text-[12px]" style={{ background: 'var(--tile)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
                                🌍 This topic connects to real eco-actions in the Civic Hub. Complete tasks related to this chapter to earn bonus XP.
                              </div>

                              {/* Uploaded study materials */}
                              {chapterUploadedNotes.length > 0 && (
                                <div>
                                  <h3 className="text-[12px] font-semibold mb-2.5" style={{ color: 'var(--text-2)' }}>Study Materials</h3>
                                  <div className="space-y-2">
                                    {chapterUploadedNotes.map(note => (
                                      <a key={note._id}
                                        href={note.fileUrl || note.externalUrl}
                                        target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-between rounded-xl p-3 transition-colors"
                                        style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                                        <div className="flex items-center gap-3">
                                          <span className="text-base">{note.type === 'pdf' ? '📄' : note.type === 'video' ? '🎥' : '🔗'}</span>
                                          <div>
                                            <p className="text-[13px] font-medium">{note.title}</p>
                                            <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>
                                              {note.type === 'pdf' ? note.fileOriginalName || 'PDF Document' : note.type === 'video' ? 'Video' : 'Link'}
                                            </p>
                                          </div>
                                        </div>
                                        {note.type === 'pdf'
                                          ? <Download size={13} style={{ color: 'var(--text-3)' }} />
                                          : <ExternalLink size={13} style={{ color: 'var(--text-3)' }} />
                                        }
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Tests for this chapter */}
                          <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-[13px] font-semibold">Tests for this Chapter</h3>
                              {chapterQuizzes.length > 0 && (
                                <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>{chapterQuizzes.length} available</span>
                              )}
                            </div>
                            {loading ? (
                              <div className="h-12 rounded-xl animate-pulse" style={{ background: 'var(--tile)' }} />
                            ) : chapterQuizzes.length === 0 ? (
                              <div className="text-center py-4">
                                <FileText size={22} className="mx-auto mb-2" style={{ color: 'var(--text-3)' }} />
                                <p className="text-[12px]" style={{ color: 'var(--text-3)' }}>
                                  No tests yet · <button onClick={() => setView('tests')} className="text-eco-400 hover:underline">View all tests</button>
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {chapterQuizzes.map(q => (
                                  <Link key={q._id} to={`/quiz/${q._id}`}
                                    className="flex items-center justify-between rounded-xl p-3 transition-colors"
                                    style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}>
                                    <div>
                                      <p className="text-[13px] font-medium">{q.title}</p>
                                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                                        {q.subject} · {q.chapter} · {q.questions?.length || 0} Qs
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[11px] flex items-center gap-1 font-mono text-eco-400">
                                        <Star size={9} />+{q.xpReward}
                                      </span>
                                      <ArrowRight size={12} style={{ color: 'var(--text-3)' }} />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </main>
      </div>
=======
            <div className="grid md:grid-cols-3 gap-4">
              {/* Chapter list */}
              <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-4">
                <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-3">Chapters</p>
                <div className="space-y-0.5">
                  {chapterList.map((ch, i) => (
                    <button key={ch} onClick={() => setChapter(ch)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group ${
                        chapter === ch ? 'bg-white text-black font-medium' : 'hover:bg-white/5 text-white/60 hover:text-white'
                      }`}>
                      <span className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono ${chapter === ch ? 'text-black/40' : 'text-white/20'}`}>{String(i+1).padStart(2,'0')}</span>
                        {ch}
                      </span>
                      <ChevronRight size={12} className={chapter === ch ? 'text-black/40' : 'text-white/20 group-hover:text-white/50'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content area */}
              <div className="md:col-span-2 space-y-4">
                {!chapter ? (
                  <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-12 text-center">
                    <BookOpen size={32} className="text-white/20 mx-auto mb-2" />
                    <p className="text-white/30 text-sm">Select a chapter to start learning</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-lg font-bold">{chapter}</h2>
                          <p className="text-white/30 text-xs">{subject}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-semibold text-white/70 mb-2">Key Concepts</h3>
                          <ul className="space-y-2">
                            {notes.map((n, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                                <span className="text-white/20 mt-0.5 shrink-0">→</span> {n}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/4 border border-white/6 rounded-xl p-3 text-xs text-white/40">
                          🌍 This topic connects to real eco-actions in the Civic Hub. Complete tasks related to this chapter to earn bonus XP.
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 border border-white/15 text-white/50 text-xs py-2 rounded-xl hover:bg-white/5 hover:text-white transition">📄 Notes (PDF)</button>
                          <button className="flex-1 border border-white/15 text-white/50 text-xs py-2 rounded-xl hover:bg-white/5 hover:text-white transition">🎥 Video</button>
                        </div>
                      </div>
                    </div>

                    {/* Quizzes */}
                    <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-sm">Quizzes</h3>
                        {chapterQuizzes.length > 0 && <span className="text-xs text-white/30">{chapterQuizzes.length} available</span>}
                      </div>
                      {loading ? (
                        <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
                      ) : quizzes.length === 0 ? (
                        <div className="text-center py-4">
                          <FileText size={24} className="text-white/20 mx-auto mb-2" />
                          <p className="text-white/30 text-xs">Teacher hasn't added quizzes for your class yet</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {quizzes.map(q => (
                            <Link key={q._id} to={`/quiz/${q._id}`}
                              className="flex items-center justify-between bg-white/4 border border-white/6 rounded-xl p-3 hover:bg-white/8 transition group">
                              <div>
                                <p className="text-sm font-medium">{q.title}</p>
                                <p className="text-xs text-white/30">{q.subject} · {q.chapter} · {q.questions?.length || 0} Qs</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs flex items-center gap-1 text-white/40"><Star size={10} />+{q.xpReward}</span>
                                <ArrowRight size={13} className="text-white/30 group-hover:text-white transition" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Chatbot />
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
    </div>
  );
}
