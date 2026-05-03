import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
=======
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
import { Star, CheckCircle, Clock, FileText, Users, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeatMap from '../components/HeatMap';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

<<<<<<< HEAD
const CHART_COLORS = ['#16a34a','#f59e0b','#3b82f6','#a78bfa','#f472b6','#4ade80','#fb923c','#38bdf8'];
const tooltipStyle = { background:'#141414', border:'1px solid rgba(255,255,255,0.10)', borderRadius:'10px', color:'#fff', fontSize:'12px' };
const PieLabel = ({ name, x, y, cx }) => (
  <text x={x} y={y} fill="rgba(255,255,255,0.5)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>
=======
const CHART_COLORS = ['#22c55e','#f59e0b','#3b82f6','#a78bfa','#f472b6','#4ade80','#fb923c','#38bdf8'];
const tooltipStyle = { background:'#1c1c1e', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px', color:'#fff', fontSize:'12px' };
const PieLabel = ({ name, x, y, cx }) => (
  <text x={x} y={y} fill="rgba(255,255,255,0.65)" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
    {name}
  </text>
);

<<<<<<< HEAD
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
    <Icon size={15} className="mb-2" style={{ color: 'var(--text-3)' }} />
    <p className="text-2xl font-bold font-mono">{value}</p>
    <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-3)' }}>{label}</p>
  </div>
);

=======
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
export default function Analytics() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = user?.role === 'teacher' ? '/analytics/teacher' : '/analytics/student';
    api.get(endpoint)
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.role]);

  if (loading) return (
<<<<<<< HEAD
    <div className="min-h-screen bw-theme" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-56 p-6 pb-20 md:pb-6 flex items-center justify-center">
          <p className="text-[13px] animate-pulse" style={{ color: 'var(--text-3)' }}>Loading analytics...</p>
=======
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-6 flex items-center justify-center">
          <p className="text-white/30 animate-pulse">Loading analytics...</p>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
        </main>
      </div>
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="min-h-screen bw-theme" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-56 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-6xl mx-auto space-y-5">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Analytics</h1>
              <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-3)' }}>
                {user?.role === 'teacher' ? 'Class performance overview' : 'Your learning progress'}
              </p>
=======
    <div className="min-h-screen bg-black bw-theme">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-14 md:ml-52 p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-5">
            <div>
              <h1 className="text-xl font-bold">Analytics</h1>
              <p className="text-white/40 text-sm mt-0.5">{user?.role === 'teacher' ? 'Class performance overview' : 'Your learning progress'}</p>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
            </div>

            {/* ── STUDENT ANALYTICS ── */}
            {user?.role === 'student' && data && (
              <>
<<<<<<< HEAD
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard icon={Star} label="Total XP" value={data.user?.xp || 0} />
                  <StatCard icon={CheckCircle} label="Approved" value={data.approvedSubmissions} />
                  <StatCard icon={Clock} label="Pending" value={data.pendingSubmissions} />
                  <StatCard icon={FileText} label="Quizzes Taken" value={data.totalQuizAttempts} />
                </div>

                <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <h2 className="text-[13px] font-semibold mb-4">XP Earned — Last 14 Days</h2>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={data.xpChart} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill:'rgba(255,255,255,0.25)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:'rgba(255,255,255,0.25)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill:'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="xp" fill="#16a34a" radius={[4,4,0,0]} />
=======
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: Star, label:'Total XP', value: data.user?.xp || 0 },
                    { icon: CheckCircle, label:'Approved', value: data.approvedSubmissions },
                    { icon: Clock, label:'Pending', value: data.pendingSubmissions },
                    { icon: FileText, label:'Quizzes Taken', value: data.totalQuizAttempts },
                  ].map(s => (
                    <div key={s.label} className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-4">
                      <s.icon size={16} className="text-white/30 mb-2" />
                      <p className="text-2xl font-black">{s.value}</p>
                      <p className="text-xs text-white/40">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* XP over time */}
                <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                  <h2 className="font-semibold text-sm mb-4">XP Earned — Last 14 Days</h2>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={data.xpChart} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill:'rgba(255,255,255,0.3)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:'rgba(255,255,255,0.3)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill:'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="xp" fill="#22c55e" radius={[4,4,0,0]} />
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
<<<<<<< HEAD
                  <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <h2 className="text-[13px] font-semibold mb-4">Category Mastery</h2>
                    <div className="space-y-3">
                      {Object.entries(data.categoryStats || {}).map(([cat, pct]) => (
                        <div key={cat}>
                          <div className="flex justify-between text-[12px] mb-1">
                            <span className="capitalize" style={{ color: 'var(--text-2)' }}>{cat}</span>
                            <span className="font-semibold font-mono">{pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background: 'var(--accent)' }} />
=======
                  {/* Category mastery */}
                  <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                    <h2 className="font-semibold text-sm mb-4">Category Mastery</h2>
                    <div className="space-y-3">
                      {Object.entries(data.categoryStats || {}).map(([cat, pct]) => (
                        <div key={cat}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/60 capitalize">{cat}</span>
                            <span className="text-white font-semibold">{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                            <div className="h-full bg-eco-500 rounded-full transition-all" style={{ width:`${pct}%` }} />
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

<<<<<<< HEAD
                  {data.categoryDist?.length > 0 && (
                    <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                      <h2 className="text-[13px] font-semibold mb-4">Tasks by Category</h2>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={data.categoryDist} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                            label={PieLabel} labelLine={{ stroke: 'rgba(255,255,255,0.15)' }}>
=======
                  {/* Category distribution pie */}
                  {data.categoryDist?.length > 0 && (
                    <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                      <h2 className="font-semibold text-sm mb-4">Tasks by Category</h2>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={data.categoryDist} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                            label={PieLabel} labelLine={{ stroke: 'rgba(255,255,255,0.2)' }}>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                            {data.categoryDist.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

<<<<<<< HEAD
                <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <h2 className="text-[13px] font-semibold mb-4">Activity Heatmap</h2>
                  <HeatMap activityLog={data.user?.activityLog || []} />
                </div>

                {data.recentAttempts?.length > 0 && (
                  <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                    <h2 className="text-[13px] font-semibold mb-4">Recent Quiz Attempts</h2>
                    <div className="space-y-2">
                      {data.recentAttempts.map((a, i) => (
                        <div key={i} className="flex items-center justify-between rounded-xl p-3"
                          style={{ background: 'var(--tile)', border: '1px solid var(--border)' }}>
                          <div>
                            <p className="text-[13px] font-medium">{a.quiz?.title || 'Quiz'}</p>
                            <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>{new Date(a.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold font-mono">{a.score}%</span>
                            <span className="text-[11px] font-mono text-eco-400">+{a.xpEarned} XP</span>
=======
                {/* Heatmap */}
                <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                  <h2 className="font-semibold text-sm mb-4">Activity Heatmap</h2>
                  <HeatMap activityLog={data.user?.activityLog || []} />
                </div>

                {/* Recent quiz attempts */}
                {data.recentAttempts?.length > 0 && (
                  <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                    <h2 className="font-semibold text-sm mb-4">Recent Quiz Attempts</h2>
                    <div className="space-y-2">
                      {data.recentAttempts.map((a, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/4 border border-white/6 rounded-xl p-3">
                          <div>
                            <p className="text-sm font-medium">{a.quiz?.title || 'Quiz'}</p>
                            <p className="text-xs text-white/30">{new Date(a.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold">{a.score}%</span>
                            <span className="text-xs text-white/40">+{a.xpEarned} XP</span>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── TEACHER ANALYTICS ── */}
            {user?.role === 'teacher' && data && (
              <>
<<<<<<< HEAD
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard icon={Users} label="Students" value={data.totalStudents} />
                  <StatCard icon={CheckCircle} label="Approved" value={data.approvedCount} />
                  <StatCard icon={Clock} label="Pending Reviews" value={data.pendingReviews} />
                  <StatCard icon={TrendingUp} label="Avg XP" value={data.avgXP} />
                </div>

                <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <h2 className="text-[13px] font-semibold mb-4">Submissions — Last 14 Days</h2>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={data.activityChart} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill:'rgba(255,255,255,0.25)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:'rgba(255,255,255,0.25)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill:'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="count" fill="#16a34a" radius={[4,4,0,0]} />
=======
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: Users, label:'Students', value: data.totalStudents },
                    { icon: CheckCircle, label:'Approved', value: data.approvedCount },
                    { icon: Clock, label:'Pending Reviews', value: data.pendingReviews },
                    { icon: TrendingUp, label:'Avg XP', value: data.avgXP },
                  ].map(s => (
                    <div key={s.label} className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-4">
                      <s.icon size={16} className="text-white/30 mb-2" />
                      <p className="text-2xl font-black">{s.value}</p>
                      <p className="text-xs text-white/40">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Activity chart */}
                <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                  <h2 className="font-semibold text-sm mb-4">Submissions — Last 14 Days</h2>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={data.activityChart} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill:'rgba(255,255,255,0.3)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:'rgba(255,255,255,0.3)', fontSize:10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill:'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="count" fill="#22c55e" radius={[4,4,0,0]} />
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
<<<<<<< HEAD
                  {data.statusDist?.length > 0 && (
                    <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                      <h2 className="text-[13px] font-semibold mb-4">Submission Status</h2>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={data.statusDist} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                            label={PieLabel} labelLine={{ stroke: 'rgba(255,255,255,0.15)' }}>
=======
                  {/* Status distribution */}
                  {data.statusDist?.length > 0 && (
                    <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                      <h2 className="font-semibold text-sm mb-4">Submission Status</h2>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={data.statusDist} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                            label={PieLabel} labelLine={{ stroke: 'rgba(255,255,255,0.2)' }}>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                            {data.statusDist.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}

<<<<<<< HEAD
                  {data.categoryDist?.length > 0 && (
                    <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                      <h2 className="text-[13px] font-semibold mb-4">Tasks by Category</h2>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={data.categoryDist} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                            label={PieLabel} labelLine={{ stroke: 'rgba(255,255,255,0.15)' }}>
=======
                  {/* Category distribution */}
                  {data.categoryDist?.length > 0 && (
                    <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl p-5">
                      <h2 className="font-semibold text-sm mb-4">Tasks by Category</h2>
                      <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                          <Pie data={data.categoryDist} cx="50%" cy="50%" outerRadius={65} dataKey="value"
                            label={PieLabel} labelLine={{ stroke: 'rgba(255,255,255,0.2)' }}>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                            {data.categoryDist.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

<<<<<<< HEAD
                <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                    <h2 className="text-[13px] font-semibold">Student Performance</h2>
                  </div>
                  <table className="w-full text-[13px]">
                    <thead style={{ borderBottom: '1px solid var(--border)' }}>
                      <tr className="text-[11px]" style={{ color: 'var(--text-3)' }}>
=======
                {/* Top students table */}
                <div className="bg-[#1c1c1e] border border-white/8 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/8">
                    <h2 className="font-semibold text-sm">Student Performance</h2>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/8">
                      <tr className="text-white/30 text-xs">
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                        <th className="text-left px-5 py-3">Name</th>
                        <th className="text-left px-5 py-3 hidden sm:table-cell">Class</th>
                        <th className="text-right px-5 py-3">XP</th>
                        <th className="text-right px-5 py-3 hidden md:table-cell">Level</th>
                        <th className="text-right px-5 py-3 hidden md:table-cell">Streak</th>
                      </tr>
                    </thead>
<<<<<<< HEAD
                    <tbody>
                      {data.topStudents?.map((s, i) => (
                        <tr key={s._id} className="transition-colors" style={{ borderBottom: i < data.topStudents.length - 1 ? '1px solid var(--border)' : 'none' }}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono w-4" style={{ color: 'var(--text-3)' }}>#{i+1}</span>
                              <span className="font-medium">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 hidden sm:table-cell" style={{ color: 'var(--text-3)' }}>{s.class}</td>
                          <td className="px-5 py-3 text-right font-bold font-mono">{s.xp}</td>
                          <td className="px-5 py-3 text-right hidden md:table-cell" style={{ color: 'var(--text-3)' }}>Lv.{s.level}</td>
                          <td className="px-5 py-3 text-right hidden md:table-cell" style={{ color: 'var(--text-3)' }}>{s.streak}🔥</td>
=======
                    <tbody className="divide-y divide-white/5">
                      {data.topStudents?.map((s, i) => (
                        <tr key={s._id} className="hover:bg-white/3 transition">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-white/20 w-4">#{i+1}</span>
                              <span className="font-medium">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-white/40 hidden sm:table-cell">{s.class}</td>
                          <td className="px-5 py-3 text-right font-bold">{s.xp}</td>
                          <td className="px-5 py-3 text-right text-white/40 hidden md:table-cell">Lv.{s.level}</td>
                          <td className="px-5 py-3 text-right text-white/40 hidden md:table-cell">{s.streak}🔥</td>
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
