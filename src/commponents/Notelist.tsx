import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  FileText,
  Trash2,
  Edit,
  Eye,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  X,
  FolderOpen,
} from 'lucide-react'
import { getAllNotes, deleteNoteId, searchNotes } from '../services/note'
import toast from 'react-hot-toast'

const NoteList = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const LIMIT = 9

  useEffect(() => {
    fetchData()
  }, [page, searchQuery])

  const fetchData = async () => {
    setLoading(true)
    try {
      let res
      if (searchQuery) {
        res = await searchNotes(searchQuery)
        setNotes(res.data.notes)
        setTotalPages(1)
      } else {
        res = await getAllNotes(page, LIMIT)
        setNotes(res.data.notes)
        setTotalPages(res.data.totalPages)
      }
    } catch (error) {
      toast.error('Failed to fetch notes')
      setNotes([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNoteId(id)
        toast.success('Note deleted successfully!')
        fetchData()
      } catch (error) {
        toast.error('Failed to delete note')
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-75"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  {searchQuery ? <Search className="w-7 h-7 text-white" /> : <FolderOpen className="w-7 h-7 text-white" />}
                </div>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  {searchQuery ? (
                    <>Search Results</>
                  ) : (
                    <>My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Notes</span></>
                  )}
                </h1>
                <p className="text-gray-400 mt-1">
                  {searchQuery
                    ? `Found ${notes.length} notes matching "${searchQuery}"`
                    : 'Manage and organize your study materials'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {searchQuery && (
              <button
                onClick={() => navigate('/app/notes')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-purple-500/30 text-purple-300 font-bold hover:bg-purple-500/10 hover:border-purple-500/50 transition-all"
              >
                <X className="w-5 h-5" />
                <span>Clear Search</span>
              </button>
            )}
            <Link
              to="/app/notes/new"
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-2xl transform group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Create Note</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-400 animate-pulse">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 shadow-2xl p-16 text-center">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center border-4 border-purple-500/20">
                    <FileText className="w-12 h-12 text-purple-400 opacity-50" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Notes Found</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchQuery
                  ? `No notes match your search for "${searchQuery}"`
                  : 'Start by creating your first note to see it here'}
              </p>
              <Link
                to="/app/notes/new"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 font-bold transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your First Note</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="group relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Gradient Accent */}
                  <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      {note.tags && note.tags.length > 0 && (
                        <span className="text-xs font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                          {note.tags[0]}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {note.title}
                    </h3>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto pt-4 border-t border-purple-500/20 flex items-center justify-between">
                      <button
                        onClick={() => navigate(`/app/ai-workspace/${note._id}`)}
                        className="group/ai relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover/ai:opacity-100 transition-opacity blur-md"></div>
                        <div className="relative flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white bg-purple-500/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg transition-all border border-purple-500/30">
                          <Sparkles className="w-4 h-4" />
                          <span>AI Tools</span>
                        </div>
                      </button>

                      <div className="flex gap-1">
                        <ActionButton
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => navigate(`/app/notes/${note._id}`)}
                          color="text-gray-400 hover:text-white hover:bg-white/10"
                          title="View"
                        />
                        <ActionButton
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => navigate(`/app/notes/${note._id}/edit`)}
                          color="text-gray-400 hover:text-blue-400 hover:bg-blue-500/20"
                          title="Edit"
                        />
                        <ActionButton
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={(e:any) => handleDelete(note._id, e)}
                          color="text-gray-400 hover:text-red-400 hover:bg-red-500/20"
                          title="Delete"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {notes.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                page === 1
                  ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 border border-purple-500/20 hover:border-purple-500/40'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold shadow-lg">
              <span>{page}</span>
              <span className="text-white/60">/</span>
              <span>{totalPages}</span>
            </div>
            <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            page === totalPages
              ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600 border border-purple-500/20 hover:border-purple-500/40'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    )}
  </div>
</div>
)
}
const ActionButton = ({ icon, onClick, color, title }: any) => (
<button
  onClick={onClick}
  className={`p-2 rounded-lg transition-all ${color}`}
  title={title}
>
  {icon}
</button>
)
export default NoteList