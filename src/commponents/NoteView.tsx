import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Download,
  Clock,
} from 'lucide-react'
import { getNoteById, noteConvertToPdf, deleteNotePermanently } from '../services/note'
import toast from 'react-hot-toast'
const NoteView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pdfLoading, setPdfLoading] = useState(false)
  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        if (!id) return
        const res = await getNoteById(id)
        setNote(res.data.note)
      } catch (error) {
        toast.error('Failed to fetch note')
      } finally {
        setLoading(false)
      }
    }
    fetchNoteData()
  }, [id])
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        if (id) await deleteNotePermanently(id)
        toast.success('Note deleted')
        navigate('/app/notes')
      } catch (error) {
        toast.error('Failed to delete note')
      }
    }
  }
  const handleDownloadPdf = async () => {
    if (!id) return
    setPdfLoading(true)
    try {
      const res = await noteConvertToPdf(id)
      if (res.data.pdfUrl) {
        window.open(res.data.pdfUrl, '_blank')
      } else {
        toast.error('Failed to generate PDF.')
      }
    } catch (error) {
      toast.error('Failed to generate PDF.')
    } finally {
      setPdfLoading(false)
    }
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600/30 border-t-transparent"></div>
      </div>
    )
  }
  if (!note) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-[#c33dd8]">Note not found 😕</h2>
        <Link
          to="/app/notes"
          className="text-[#c33dd8] hover:underline mt-4 block"
        >
          Back to Notes
        </Link>
      </div>
    )
  }
  return (
    <div className="max-w-5xl mx-auto pb-20 relative z-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8 sticky top-24 bg-purple-950/90 backdrop-blur-md py-4 z-20 border-b border-[#8A0000]/30 rounded-xl px-4">
        <button
          onClick={() => navigate('/app/notes')}
          className="flex items-center gap-2 text-purple-400 hover:text-[#e731f0] transition font-medium"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-400/10 border border-purple-600/50 text-gray-300 rounded-lg hover:bg-purple-600/40 hover:text-white transition disabled:opacity-50"
          >
            <Download size={18} />
            {pdfLoading ? 'Exporting...' : 'PDF'}
          </button>
          <button
            onClick={() => navigate(`/app/notes/${id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-400 text-[#2f0236] rounded-lg hover:bg-[#dd38f3] transition shadow-lg shadow-[#c33dd8]/20 font-bold"
          >
            <Edit size={18} /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-purple-400 hover:bg-purple-400/10 rounded-lg transition border border-transparent hover:border-purple-500/30"
            title="Delete Note"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Note Content */}
      <div className="bg-purple-400/10 p-8 md:p-12 rounded-3xl shadow-2xl border border-purple-600/50 min-h-[60vh] backdrop-blur-sm">
        {/* Header Info */}
        <div className="border-b border-purple-600/30 pb-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {note.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-purple-400 font-medium">
            <div className="flex items-center gap-2 bg-purple-400/20 px-3 py-1.5 rounded-lg">
              <Calendar size={16} className="text-[#c33dd8]" />
              <span>Created: {formatDate(note.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-400/20 px-3 py-1.5 rounded-lg">
              <Clock size={16} className="text-[#c33dd8]" />
              <span>Updated: {formatDate(note.updatedAt)}</span>
            </div>
            {note.tags && note.tags.length > 0 && (
              <div className="flex items-center gap-2 bg-purple-400/20 px-3 py-1.5 rounded-lg">
                <span className="text-[#c33dd8]"># {note.tags.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* HTML Content */}
        <div
          className="prose prose-lg prose-invert max-w-none 
            prose-headings:text-[#FFF287] 
            prose-a:text-[#c33dd8] hover:prose-a:text-[#FFF287]
            prose-strong:text-white
            prose-code:text-[#FFF287] prose-code:bg-[#8A0000]/30 prose-code:px-1 prose-code:rounded
            prose-blockquote:border-l-purple-600 prose-blockquote:bg-purple-400/10 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-[#8A0000]/30"
          dangerouslySetInnerHTML={{
            __html: note.html,
          }}
        />
      </div>
    </div>
  )
}
export default NoteView
