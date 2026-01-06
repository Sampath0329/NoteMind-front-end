import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/authContext'
import { getDashboardOverview } from '../services/dashboard'
import toast from 'react-hot-toast'
import {
  FileText,
  Sparkles,
  Brain,
  Target,
  ArrowRight,
  Plus,
  TrendingUp,
  Clock,
  Eye,
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getDashboardOverview()
        setData(res.data.data)
        setLoading(false)
        setError(false)
      } catch (err) {
        toast.error('Something went wrong. Please try again.')
        setError(true)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 font-medium animate-pulse">Loading your dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <span className="text-4xl">⚠️</span>
        </div>
        <p className="text-xl font-semibold text-white mb-2">Oops! Something went wrong.</p>
        <p className="text-gray-400 mb-6">We couldn't load your dashboard data.</p>
        <button
          onClick={() => window.location.reload()}
          className="group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold transform group-hover:scale-105 active:scale-95 transition-all">
            Try Again
          </div>
        </button>
      </div>
    )
  }

  // Empty State
  if (data?.totals?.notes === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4 space-y-8 max-w-2xl">
          {/* Animated Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-6xl border-4 border-purple-500/30 shadow-2xl transform hover:scale-110 transition-transform">
              📝
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Welcome, {user?.username || 'Friend'}! 👋
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Your dashboard is looking a bit empty. Create your first smart note to unlock AI-powered summaries, quizzes, and more!
            </p>
          </div>

          {/* CTA Button */}
          <Link
            to="/app/notes/new"
            className="group relative inline-flex overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl transform group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-lg">Create First Note</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <span className="text-sm text-purple-400 font-semibold uppercase tracking-wider">
              {getGreeting()}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Hey, {user?.username}! 
          </h1>
          <p className="text-gray-400 text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Here's your learning journey today
          </p>
        </div>
        
        <Link
          to="/app/notes/new"
          className="group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            <span>Create Note</span>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Notes"
          count={data.totals.notes}
          icon={<FileText className="w-7 h-7" />}
          gradient="from-blue-500 to-cyan-500"
          delay="0"
        />
        <StatsCard
          title="AI Summaries"
          count={data.totals.summaries}
          icon={<Sparkles className="w-7 h-7" />}
          gradient="from-purple-500 to-pink-500"
          delay="100"
        />
        <StatsCard
          title="Quizzes Generated"
          count={data.totals.quizzes}
          icon={<Brain className="w-7 h-7" />}
          gradient="from-pink-500 to-rose-500"
          delay="200"
        />
        <StatsCard
          title="Quiz Attempts"
          count={data.graphs.quizActivity.reduce(
            (acc: any, curr: any) => acc + curr.attempts,
            0,
          )}
          icon={<Target className="w-7 h-7" />}
          gradient="from-emerald-500 to-teal-500"
          delay="300"
        />
      </div>

      {/* Recent Notes Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
        
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-black/30 px-8 py-6 border-b border-purple-500/20 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Recent Notes</h3>
                <p className="text-sm text-gray-400">Your latest creations</p>
              </div>
            </div>
            
            <Link
              to="/app/notes"
              className="group/link flex items-center gap-2 text-purple-400 hover:text-pink-400 font-bold transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Table */}
          <div className="p-6 overflow-x-auto">
            {data.recentNotes.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                  <FileText className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-gray-500 text-lg">No recent notes found.</p>
                <p className="text-gray-600 text-sm mt-2">Start creating notes to see them here!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.recentNotes.map((note: any, index: number) => (
                  <Link
                    key={note._id}
                    to={`/app/notes/${note._id}`}
                    className="group/note block"
                    style={{ animation: `slideIn 0.3s ease-out ${index * 50}ms both` }}
                  >
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-purple-500/10 hover:border-purple-500/30 hover:bg-black/40 transition-all">
                      {/* Icon */}
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/note:scale-110 transition-transform">
                        <FileText className="w-5 h-5 text-white" />
                      </div>

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white group-hover/note:text-purple-300 transition-colors truncate">
                          {note.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{new Date(note.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}</span>
                          </div>
                          {note.tags && note.tags.length > 0 && (
                            <>
                              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                              <span className="text-xs text-purple-400 font-medium">
                                {note.tags[0]}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center gap-2 opacity-0 group-hover/note:opacity-100 transition-opacity">
                        <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span>Open</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const StatsCard = ({ title, count, icon, gradient, delay }: any) => (
  <div
    className="group relative"
    style={{ animation: `slideInUp 0.6s ease-out ${delay}ms both` }}
  >
    <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
    
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-sm shadow-xl hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex items-center gap-5">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          <div className="text-white">{icon}</div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">
            {title}
          </p>
          <h3 className="text-4xl font-black text-white">{count}</h3>
        </div>
      </div>
    </div>
  </div>
)

// Add animation styles
const style = document.createElement('style')
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`
document.head.appendChild(style)

export default Dashboard