import React, { useEffect, useState, useRef } from 'react'
import { User, Mail, Lock, Camera, Save, Loader2 } from 'lucide-react'
import { useAuth } from '../Context/authContext'
import {
  getUserDetails,
  profileUpload,
  updateUserDetails,
} from '../services/Profile'
import toast from 'react-hot-toast'
function Profile() {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await getUserDetails()
        const userData = res.data.user
        setFormData({
          username: userData.username,
          email: userData.email,
          password: '',
        })
        setPreviewImage(userData.imageUrl || '')
      } catch (error) {
        toast.error('Something went wrong. Please try again.')
      }
    }
    fetchData()
  }, [])
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.password) {
      toast.error('Please enter your password to save changes.')
      return
    }
    setLoading(true)
    try {
      const res: any = await updateUserDetails(formData)
      setUser(res.data.user)
      setFormData({
        ...formData,
        password: '',
      })
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile. Check your password.')
    } finally {
      setLoading(false)
    }
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const localUrl = URL.createObjectURL(file)
    setPreviewImage(localUrl)
    setImageLoading(true)
    try {
      const res: any = await profileUpload(file)
      setUser(res.data.user)
      toast.success('Profile image updated!')
    } catch (error) {
      toast.error('Failed to upload image.')
    } finally {
      setImageLoading(false)
    }
  }
  return (
    <div className="max-w-5xl mx-auto pb-10 relative z-10">
      <h1 className="text-3xl font-bold text-[#c33dd8] mb-8">
        Account Settings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Image */}
        <div className="space-y-6">
          <div className="bg-purple-400/10 p-8 rounded-2xl shadow-sm border border-purple-600/30 flex flex-col items-center backdrop-blur-sm">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600/30 shadow-lg bg-purple-400/20">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#c33dd8]">
                    {formData.username
                      ? formData.username.charAt(0).toUpperCase()
                      : 'U'}
                  </div>
                )}
                {imageLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="animate-spin text-[#c33dd8]" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2.5 bg-[#c33dd8] text-[#ffffff] rounded-full shadow-md hover:bg-purple-600/80 transition border border-[#3B060A]"
                title="Change Photo"
              >
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#e78ff5]">
              {formData.username}
            </h2>
            <p className="text-[#efc7f5] text-sm">{formData.email}</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2">
          <div className="bg-[#3b0639]/10 p-8 rounded-2xl shadow-sm border border-purple-600/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-[#c33dd8] mb-6">
              Edit Details
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#e78ff5] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-3.5 text-[#e78ff5]"
                    size={20}
                  />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-600/30 bg-[#3b0639]/50 text-white focus:ring-1 focus:ring-[#e859ed] focus:border-purple-600/30 outline-none transition placeholder-white/60"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e78ff5] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-3.5 text-[#e78ff5]"
                    size={20}
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-600/30 bg-[#3b0639]/50 text-white focus:ring-1 focus:ring-[#e859ed] focus:border-purple-600/30 outline-none transition placeholder-white/60"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#e78ff5] mb-2">
                  New Password{' '}
                  <span className="text-xs text-[#e78ff5] font-normal">
                    (Required to save changes)
                  </span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-3.5 text-[#e78ff5]"
                    size={20}
                  />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-600/30 bg-[#3b0639]/50 text-white focus:ring-1 focus:ring-[#e859ed] focus:border-purple-600/30 outline-none transition placeholder-white/60"
                    placeholder="Enter new password to update"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ee02fb] text-[#210121] px-8 py-3 rounded-xl font-bold hover:bg-[#a207a0] transition shadow-lg shadow-[#ee32eb]/50 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
