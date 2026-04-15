import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Star, Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/quizzes/${id}`)
      .then(r => { setQuiz(r.data); setAnswers(new Array(r.data.questions.length).fill(null)); })
      .catch(() => navigate('/learn'))
      .finally(() => setLoading(false));
  }, [id]);

  const select = (idx) => {
    const a = [...answers]; a[current] = idx; setAnswers(a);
  };

  const submitQuiz = async () => {
    try {
      const { data } = await api.post(`/quizzes/${id}/submit`, { answers });
      setResult(data);
    } catch {}
  };

  if (loading) return (
    <div className="min-h-screen bg-black bw-theme flex items-center justify-center">
      <p className="text-white/30 animate-pulse">Loading quiz...</p>
    </div>
  );
  if (!quiz) return null;

  const q = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;
  const answered = answers.filter(a => a !== null).length;

  // Results screen
  if (result) return (
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6 flex items-center justify-center">
          <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl w-full max-w-lg p-6 text-center fade-in-up">
            <div className="text-5xl mb-3">{result.score >= 70 ? '🏆' : result.score >= 50 ? '👍' : '📚'}</div>
            <h2 className="text-2xl font-black mb-1">{result.score >= 70 ? 'Excellent!' : result.score >= 50 ? 'Good Job!' : 'Keep Practicing!'}</h2>
            <p className="text-white/40 text-sm mb-5">{result.correct} / {result.total} correct</p>

            <div className="flex justify-center gap-8 mb-6">
              <div>
                <p className="text-3xl font-black">{result.score}%</p>
                <p className="text-xs text-white/40 mt-0.5">Score</p>
              </div>
              <div>
                <p className="text-3xl font-black flex items-center gap-1">+{result.xpEarned}<Star size={16} className="text-white/50" /></p>
                <p className="text-xs text-white/40 mt-0.5">XP Earned</p>
              </div>
            </div>

            {/* Result breakdown */}
            <div className="text-left space-y-2 max-h-48 overflow-y-auto mb-5">
              {result.results.map((r, i) => (
                <div key={i} className={`flex items-start gap-2 bg-white/4 border rounded-xl p-2.5 ${r.isCorrect ? 'border-white/15' : 'border-red-500/20'}`}>
                  {r.isCorrect ? <CheckCircle size={13} className="text-white/60 mt-0.5 shrink-0" /> : <XCircle size={13} className="text-red-400 mt-0.5 shrink-0" />}
                  <div>
                    <p className="text-xs font-medium">{r.question}</p>
                    {!r.isCorrect && r.explanation && <p className="text-[10px] text-white/30 mt-0.5">{r.explanation}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link to="/learn" className="flex-1 border border-white/20 text-white/60 hover:text-white hover:bg-white/5 py-2.5 rounded-xl transition text-sm text-center">← Back to Learn</Link>
              <Link to="/dashboard" className="flex-1 bg-eco-600 hover:bg-eco-500 text-white font-semibold py-2.5 rounded-xl transition text-sm text-center">Dashboard</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="font-bold">{quiz.title}</h1>
                <p className="text-xs text-white/30">{quiz.subject} · {quiz.class}</p>
              </div>
              <span className="text-xs text-white/40">{current+1}/{quiz.questions.length}</span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/8 rounded-full overflow-hidden mb-5">
              <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width:`${progress}%` }} />
            </div>

            <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5 fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs bg-white/8 border border-white/10 px-2 py-0.5 rounded-full">Q{current+1}</span>
                <span className="text-xs text-white/30 flex items-center gap-1"><Star size={10} />+{Math.round(quiz.xpReward/quiz.questions.length)} XP</span>
              </div>

              <p className="text-base font-semibold mb-5">{q.question}</p>

              <div className="space-y-2 mb-6">
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => select(i)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                      answers[current] === i
                        ? 'bg-white text-black border-white font-medium'
                        : 'bg-white/4 border-white/8 text-white/70 hover:bg-white/8 hover:text-white'
                    }`}>
                    <span className="font-mono text-white/30 mr-2 text-xs">{String.fromCharCode(65+i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button onClick={() => setCurrent(c => c-1)} disabled={current === 0} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white disabled:opacity-20 transition">
                  <ArrowLeft size={14} /> Prev
                </button>
                <span className="text-xs text-white/30">{answered}/{quiz.questions.length} answered</span>
                {current === quiz.questions.length - 1 ? (
                  <button onClick={submitQuiz} disabled={answered === 0} className="flex items-center gap-1.5 bg-eco-600 hover:bg-eco-500 text-white text-sm font-semibold px-4 py-2 rounded-xl disabled:opacity-50 transition">
                    <Trophy size={14} /> Submit
                  </button>
                ) : (
                  <button onClick={() => setCurrent(c => c+1)} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition">
                    Next <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Question nav dots */}
            <div className="flex flex-wrap gap-1.5 justify-center mt-4">
              {quiz.questions.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    i === current ? 'bg-white text-black' :
                    answers[i] !== null ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'
                  }`}>{i+1}</button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
