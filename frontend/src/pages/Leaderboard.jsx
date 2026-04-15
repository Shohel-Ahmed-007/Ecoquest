import { useState, useEffect } from 'react';
import { Trophy, Flame, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Leaderboard() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [scope, setScope] = useState('global');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = scope === 'class' ? `?scope=class&class=${encodeURIComponent(user?.class || '')}` : '?scope=global';
    api.get(`/leaderboard${params}`)
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [scope]);

  const myEntry = data.find(d => d._id === user?.id || d._id === user?._id);
  const top3 = data.slice(0, 3);

  return (
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-5">
              <h1 className="text-xl font-bold">Leaderboard</h1>
              <p className="text-white/40 text-sm mt-0.5">Compete. Improve. Lead.</p>
            </div>

            {/* Scope toggle */}
            <div className="flex gap-2 mb-5">
              {[{ v:'global', l:'🌍 Global' }, { v:'class', l:'🎓 My Class' }].map(s => (
                <button key={s.v} onClick={() => setScope(s.v)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    scope === s.v ? 'bg-white text-black' : 'bg-white/5 border border-white/8 text-white/50 hover:text-white'
                  }`}>{s.l}</button>
              ))}
            </div>

            {/* Podium */}
            {!loading && top3.length >= 3 && (
              <div className="flex items-end justify-center gap-3 mb-8">
                {[top3[1], top3[0], top3[2]].map((entry, idx) => {
                  const isFirst = idx === 1;
                  const medals = ['🥈', '🥇', '🥉'];
                  const heights = ['h-16', 'h-24', 'h-12'];
                  return (
                    <div key={entry._id} className="flex flex-col items-center gap-1.5">
                      {isFirst && <Trophy size={20} className="text-white/50" />}
                      <div className={`${isFirst ? 'w-16 h-16' : 'w-12 h-12'} rounded-full bg-white/15 flex items-center justify-center font-black text-lg`}>
                        {entry.name?.[0]}
                      </div>
                      <p className="text-xs font-medium text-center max-w-16 truncate">{entry.name?.split(' ')[0]}</p>
                      <p className="text-[10px] text-white/30">{entry.xp} XP</p>
                      <div className={`bg-white/8 border border-white/10 rounded-t-xl w-14 ${heights[idx]} flex items-center justify-center`}>
                        <span className="text-lg">{medals[idx]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* My rank banner */}
            {myEntry && (
              <div className="bg-white/8 border border-white/20 rounded-xl p-3 mb-3 flex items-center gap-3 text-sm">
                <Trophy size={14} className="text-white/50" />
                <span>Your rank: <strong>#{myEntry.rank}</strong></span>
                <span className="text-white/30">·</span>
                <span className="text-white/60">{myEntry.xp} XP</span>
              </div>
            )}

            {/* Full list */}
            <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl overflow-hidden">
              {loading ? (
                <div className="p-4 space-y-2">{[...Array(8)].map((_,i) => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />)}</div>
              ) : data.length === 0 ? (
                <p className="text-white/30 text-center py-10 text-sm">No students found</p>
              ) : (
                <div className="divide-y divide-white/5">
                  {data.map(entry => {
                    const isMe = entry._id === user?.id || entry._id === user?._id;
                    return (
                      <div key={entry._id} className={`flex items-center gap-3 px-4 py-3 transition ${isMe ? 'bg-white/8' : 'hover:bg-white/3'}`}>
                        <span className={`text-sm font-black w-7 text-center ${entry.rank <= 3 ? 'text-white' : 'text-white/20'}`}>
                          {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank-1] : `#${entry.rank}`}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                          {entry.name?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{entry.name} {isMe && <span className="text-white/40 text-xs">(you)</span>}</p>
                          <p className="text-xs text-white/30 truncate">{entry.class} · Lv.{entry.level}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold flex items-center gap-1"><Star size={11} className="text-white/40" />{entry.xp}</p>
                          <p className="text-[10px] text-white/30 flex items-center gap-0.5 justify-end"><Flame size={9} className="text-orange-400" />{entry.streak}d</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
