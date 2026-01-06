import { useEffect, useState } from 'react'
import { Sparkles, RefreshCw, AlertCircle, Copy, Check, Zap, FileText, Download, Share2 } from 'lucide-react'
import { getSummary } from '../services/ai'
import toast from 'react-hot-toast'

interface SummaryViewProps {
  noteId: string | undefined
  summaryProps: any
}

function Summary({ noteId, summaryProps }: SummaryViewProps) {
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setSummary(summaryProps?.summaryText || '')
  }, [summaryProps])

  const handleGenerateSummary = async () => {
    if (!noteId) return
    setLoading(true)
    setError('')
    setSummary('')
    setShowAnimation(false)

    try {
      const res: any = await getSummary(noteId)
      setSummary(res.data.summary)
      setShowAnimation(true)
      toast.success('Summary generated successfully!')
    } catch (err) {
      toast.error('Failed to generate summary. Please try again.')
      setError('Failed to generate summary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'summary.txt'
    a.click()
    toast.success('Summary downloaded!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10 space-y-8">
        {/* Hero Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-purple-300 text-sm font-bold">AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            Smart <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Summary</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get instant AI-generated summaries that capture the essence of your notes
          </p>
        </div>

        {/* Main Content Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden">
            {/* Header Bar */}
            <div className="bg-black/30 px-6 py-4 border-b border-purple-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-75 animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">AI Summary</h2>
                  <p className="text-sm text-gray-400">Powered by advanced language models</p>
                </div>
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={loading}
                className="group/btn relative overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl blur-lg opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                <div className={`relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'group-hover/btn:scale-105 active:scale-95'
                }`}>
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                      <span>{summary ? 'Regenerate' : 'Generate Summary'}</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8">
              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-purple-500/20 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-bold text-white animate-pulse">Analyzing your notes...</p>
                    <p className="text-sm text-gray-400">AI is processing your content</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex items-center gap-3 p-4 text-red-300 bg-red-900/20 border border-red-500/30 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={24} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Summary Content */}
              {summary && !loading && (
                <div className={`space-y-6 ${showAnimation ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : ''}`}>
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pb-4 border-b border-purple-500/20">
                    <ActionButton
                      icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      label={copied ? 'Copied!' : 'Copy'}
                      onClick={handleCopy}
                      gradient={copied ? 'from-green-600 to-emerald-600' : 'from-blue-600 to-cyan-600'}
                    />
                    <ActionButton
                      icon={<Download className="w-4 h-4" />}
                      label="Download"
                      onClick={handleDownload}
                      gradient="from-purple-600 to-pink-600"
                    />
                    <ActionButton
                      icon={<Share2 className="w-4 h-4" />}
                      label="Share"
                      // onClick={() => toast.info('Share feature coming soon!')}
                      onClick={() => toast.success('Share feature coming soon!')}
                      gradient="from-pink-600 to-rose-600"
                    />
                  </div>

                  {/* Summary Text */}
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full"></div>
                    <div className="pl-6 space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-white">Key Points</h3>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line space-y-3">
                          {summary.split('\n').map((line, index) => (
                            line.trim() && (
                              <p key={index} className="text-base leading-relaxed hover:text-white transition-colors">
                                {line}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Footer */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-purple-500/20">
                    <StatItem label="Words" value={summary.split(' ').length} />
                    <StatItem label="Characters" value={summary.length} />
                    <StatItem label="Lines" value={summary.split('\n').filter(l => l.trim()).length} />
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!summary && !loading && !error && (
                <div className="flex flex-col items-center justify-center py-20 space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-4 border-purple-500/20">
                      <Sparkles className="w-16 h-16 text-purple-400 opacity-50" />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-white">No Summary Yet</h3>
                    <p className="text-gray-400 max-w-md">
                      Click the "Generate Summary" button above to create an AI-powered summary of your notes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <InfoCard
            icon={<Zap className="w-6 h-6" />}
            title="Lightning Fast"
            description="Get summaries in seconds"
            gradient="from-yellow-500 to-orange-500"
          />
          <InfoCard
            icon={<Sparkles className="w-6 h-6" />}
            title="AI-Powered"
            description="Advanced language models"
            gradient="from-purple-500 to-pink-500"
          />
          <InfoCard
            icon={<FileText className="w-6 h-6" />}
            title="Key Insights"
            description="Extract important points"
            gradient="from-blue-500 to-cyan-500"
          />
        </div>
      </div>
    </div>
  )
}

const ActionButton = ({ icon, label, onClick, gradient }: any) => (
  <button
    onClick={onClick}
    className="group/action flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 border border-purple-500/20 hover:border-purple-500/40 transition-all"
  >
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover/action:scale-110 transition-transform`}>
      <div className="text-white">{icon}</div>
    </div>
    <span className="text-sm font-medium text-gray-300 group-hover/action:text-white transition-colors">{label}</span>
  </button>
)

const StatItem = ({ label, value }: any) => (
  <div className="text-center p-3 bg-black/30 rounded-xl border border-purple-500/20">
    <p className="text-2xl font-black text-white mb-1">{value}</p>
    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
  </div>
)

const InfoCard = ({ icon, title, description, gradient }: any) => (
  <div className="group relative">
    <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  </div>
)

export default Summary