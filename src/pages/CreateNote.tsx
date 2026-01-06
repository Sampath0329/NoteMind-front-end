import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Edit2, Sparkles, FileText, Tag, Wand2, Rocket, ArrowLeft, CheckCircle2 } from 'lucide-react'
import SubjectSelector from "../commponents/createSubject"
import NotePad from "../commponents/NotePad"
import { createNnote, updateNoteById, getNoteById } from "../services/note"
import toast from 'react-hot-toast'

function CreateNote() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)
  
  const [selectedSubject, setSelectedSubject] = useState('')
  const [title, setTitle] = useState('')
  const [htmlContent, setHtmlContent] = useState('')
  const [jsonContent, setJsonContent] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (isEditMode && id) {
      const loadNote = async () => {
        try {
          const res: any = await getNoteById(id)
          const note = res.data.note
          setTitle(note.title)
          setSelectedSubject(note.subjectId || '')
          setHtmlContent(note.html)
          setJsonContent(note.json)
        } catch (error) {
          console.error('Failed to load note')
          toast.error('Failed to load note')
        }
      }
      loadNote()
    }
  }, [id, isEditMode])

  const handleSaveOrUpdate = async () => {
    if (!title.trim()) {
      toast.error('Please add a title')
      return
    }

    setLoading(true)
    const noteData = {
      title,
      subjectId: selectedSubject,
      html: htmlContent,
      json: jsonContent,
    }

    try {
      if (isEditMode && id) {
        await updateNoteById(id, noteData)
        setSaveSuccess(true)
        setTimeout(() => {
          navigate(`/app/notes/${id}`)
          toast.success('Note updated successfully!')
        }, 1000)
      } else {
        await createNnote(noteData)
        setSaveSuccess(true)
        setTimeout(() => {
          navigate('/app/notes')
          toast.success('Note created successfully!')
        }, 1000)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to save note.')
    } finally {
      setTimeout(() => {
        setLoading(false)
        setSaveSuccess(false)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/app/notes')}
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Notes</span>
          </button>

          {/* Title Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  {isEditMode ? <Edit2 className="w-6 h-6 text-white" /> : <FileText className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white">
                    {isEditMode ? 'Edit Note' : 'Create Note'}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    {isEditMode ? 'Update your existing note' : 'Start writing your new note'}
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveOrUpdate}
              disabled={loading || saveSuccess}
              className="group relative overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className={`relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-3 ${
                loading || saveSuccess ? 'opacity-70 cursor-not-allowed' : 'group-hover:scale-105 active:scale-95'
              }`}>
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 animate-bounce" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    {isEditMode ? <Edit2 className="w-5 h-5 group-hover:rotate-12 transition-transform" /> : <Rocket className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />}
                    <span>{isEditMode ? 'Update Note' : 'Save Note'}</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Metadata */}
          <div className="lg:col-span-4 space-y-6">
            {/* Title Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl border border-purple-500/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Note Title
                    </label>
                    <p className="text-xs text-gray-500">Give your note a name</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500 font-medium"
                  placeholder="e.g., Physics Chapter 5 Notes"
                />
              </div>
            </div>

            {/* Subject Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl border border-purple-500/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Subject
                    </label>
                    <p className="text-xs text-gray-500">Categorize your note</p>
                  </div>
                </div>
                <SubjectSelector
                  selectedSubjectId={selectedSubject}
                  onSelect={(id) => setSelectedSubject(id)}
                />
              </div>
            </div>

            {/* AI Features Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl border border-purple-500/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                      AI Tools
                    </h3>
                    <p className="text-xs text-gray-500">Available after saving</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <AIFeatureButton
                    icon={<Sparkles className="w-4 h-4" />}
                    title="Generate Summary"
                    description="AI-powered summaries"
                    gradient="from-purple-500 to-pink-500"
                    disabled={!id}
                  />
                  <AIFeatureButton
                    icon={<FileText className="w-4 h-4" />}
                    title="Create Flashcards"
                    description="Study cards from notes"
                    gradient="from-blue-500 to-cyan-500"
                    disabled={!id}
                  />
                  <AIFeatureButton
                    icon={<Tag className="w-4 h-4" />}
                    title="Generate Quiz"
                    description="Test your knowledge"
                    gradient="from-emerald-500 to-teal-500"
                    disabled={!id}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Editor */}
          <div className="lg:col-span-8">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden">
                {/* Editor Header */}
                <div className="bg-black/30 px-6 py-4 border-b border-purple-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Editor
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Auto-saving enabled</span>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="p-6">
                  <NotePad
                    content={htmlContent}
                    setContent={setHtmlContent}
                    setJson={setJsonContent}
                  />
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Pro Tip</h4>
                  <p className="text-sm text-gray-400">
                    Use <kbd className="px-2 py-1 bg-gray-800 rounded text-xs text-purple-400 border border-gray-700">Ctrl + S</kbd> to save quickly. 
                    After saving, you can generate AI summaries and quizzes!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AIFeatureButton = ({ icon, title, description, gradient, disabled }: any) => (
  <button
    disabled={disabled}
    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
      disabled
        ? 'bg-gray-800/50 border-gray-700/50 opacity-50 cursor-not-allowed'
        : 'bg-black/30 border-gray-700 hover:border-purple-500/50 hover:bg-black/50 group/btn'
    }`}
  >
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center ${!disabled && 'group-hover/btn:scale-110 transition-transform'}`}>
      <div className="text-white">{icon}</div>
    </div>
    <div className="flex-1 text-left">
      <p className="text-sm font-semibold text-gray-300">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </button>
)

export default CreateNote