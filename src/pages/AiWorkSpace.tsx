import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, BrainCircuit, Sparkles, ArrowLeft, Zap } from 'lucide-react'
import SummaryView from '../commponents/Summary'
import QuizView from '../commponents/Quiz'

const AiWorkspace = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('summary')
  const [aigeneratedContent] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/app/notes/${id}`)}
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Note</span>
          </button>

          {/* Title Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">
                  AI Study <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Workspace</span>
                </h1>
                <p className="text-gray-400">Supercharge your learning with AI-powered tools</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/20 shadow-2xl p-2">
            <div className="flex gap-2">
              <TabButton
                isActive={activeTab === 'summary'}
                onClick={() => setActiveTab('summary')}
                icon={<FileText className="w-5 h-5" />}
                label="AI Summary"
                description="Get key insights"
                gradient="from-blue-500 to-cyan-500"
              />
              <TabButton
                isActive={activeTab === 'quiz'}
                onClick={() => setActiveTab('quiz')}
                icon={<BrainCircuit className="w-5 h-5" />}
                label="Quiz Generator"
                description="Test knowledge"
                gradient="from-purple-500 to-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'summary' && (
            <SummaryView noteId={id} summaryProps={aigeneratedContent?.summary} />
          )}
          {activeTab === 'quiz' && (
            <QuizView noteId={id} quizProps={aigeneratedContent?.quiz} />
          )}
        </div>
      </div>
    </div>
  )
}

const TabButton = ({ isActive, onClick, icon, label, description, gradient }: any) => (
  <button
    onClick={onClick}
    className={`relative flex-1 group transition-all duration-300 ${
      isActive ? 'scale-105' : 'hover:scale-102'
    }`}
  >
    {isActive && (
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-xl blur-lg opacity-50 animate-pulse`}></div>
    )}
    <div
      className={`relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r ${gradient} text-white shadow-2xl`
          : 'bg-black/30 text-gray-400 hover:bg-black/50 hover:text-white border border-gray-700'
      }`}
    >
      <div className={`${isActive ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="font-bold text-sm sm:text-base">{label}</div>
        <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
          {description}
        </div>
      </div>
      {isActive && <Zap className="w-4 h-4 animate-pulse" />}
    </div>
  </button>
)

export default AiWorkspace