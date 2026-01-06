import React, { useEffect, useState } from 'react'
import { Plus, FolderOpen, X, Check, Folder, Sparkles, Trash2 } from 'lucide-react'
import { getAll, saveSubject, deleteSubject } from '../services/subject'
import toast from 'react-hot-toast'

interface SubjectSelectorProps {
  selectedSubjectId: string
  onSelect: (id: string) => void
}

const SubjectSelector = ({ selectedSubjectId, onSelect }: SubjectSelectorProps) => {
  const [subjects, setSubjects] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    try {
      const res = await getAll()
      setSubjects(res.data.data)
    } catch (error) {
      toast.error('Failed to load subjects')
    }
  }

  const handleCreate = async () => {
    if (!newSubjectName.trim()) {
      toast.error('Please enter a folder name')
      return
    }
    setLoading(true)
    try {
      const res = await saveSubject(newSubjectName)
      const newSub = res.data.data
      setSubjects([...subjects, newSub])
      onSelect(newSub._id)
      setIsModalOpen(false)
      setNewSubjectName('')
      toast.success('Folder created successfully!')
    } catch (error) {
      toast.error('Failed to create subject')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Are you sure you want to delete this folder?')) return
    try {
      await deleteSubject(id)
      setSubjects(subjects.filter((sub) => sub._id !== id))
      if (selectedSubjectId === id) onSelect('')
      toast.success('Folder deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete subject')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Folder className="w-5 h-5 text-purple-400" />
        <label className="block text-sm font-bold text-gray-300 uppercase tracking-wider">
          Subject Folder
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        {subjects.map((sub) => {
          const isSelected = selectedSubjectId === sub._id
          return (
            <div
              key={sub._id}
              className="group relative"
            >
              {isSelected && (
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md opacity-75"></div>
              )}
              <div
                onClick={() => onSelect(sub._id)}
                className={`relative cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border transition-all duration-300 select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white font-bold shadow-lg'
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-purple-500/50 hover:bg-gray-800'
                }`}
              >
                {isSelected ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <Folder className="w-4 h-4" />
                )}
                <span>{sub.name}</span>
                <button
                  onClick={(e) => handleDelete(sub._id, e)}
                  className={`ml-1 p-1 rounded-lg transition ${
                    isSelected
                      ? 'text-white/70 hover:text-white hover:bg-white/20'
                      : 'text-gray-500 hover:text-red-400 hover:bg-red-500/20'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}

        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
          <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-purple-500/50 text-purple-400 text-sm hover:bg-purple-500/10 transition font-medium">
            <Plus className="w-4 h-4" />
            <span>New Folder</span>
          </div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md mx-4 animate-in zoom-in duration-300">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-purple-500/20 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">Create Folder</h3>
                      <p className="text-sm text-gray-400">Organize your notes</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Input */}
                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-bold text-gray-300">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="e.g., Mathematics, History, Science..."
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-white placeholder-gray-500 transition-all"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700 font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={loading || !newSubjectName.trim()}
                    className="group/btn relative flex-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                    <div className={`relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-bold transition-all ${
                      loading || !newSubjectName.trim() ? 'opacity-50 cursor-not-allowed' : 'group-hover/btn:scale-105 active:scale-95'
                    }`}>
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Create Folder
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubjectSelector