import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                </button>
              ))}
            </div>

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
    </div>
  );
}
