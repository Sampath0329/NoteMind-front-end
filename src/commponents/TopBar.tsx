import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../Context/authContext'
import {
  Search,
  Menu,
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  X,
  Sparkles,
  User,
} from 'lucide-react'
import { logOut } from '../services/auth'

const TopBar = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const navItems = [
    {
      path: '/app/dashboard',
      name: 'Overview',
      icon: LayoutDashboard,
    },
    {
      path: '/app/notes',
      name: 'My Notes',
      icon: FileText,
    },
    {
      path: '/app/notes/new',
      name: 'Create',
      icon: PlusCircle,
    },
  ]

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (query.trim()) {
        navigate(`/app/notes?search=${query}`)
      } else {
        navigate(`/app/notes`)
      }
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    await logOut()
    navigate('/auth/login')
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 border-b border-purple-500/20 backdrop-blur-xl bg-black/80 px-4 sm:px-6 flex items-center justify-between z-50">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/app/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NoteMind
              </h1>
              <p className="text-[10px] text-gray-500 -mt-1">AI Powered</p>
            </div>
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center justify-center">
          <div className="flex items-center bg-gray-900/50 p-1.5 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl -z-10"></div>
                  )}
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:block relative w-56 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full bg-gray-900/50 pl-10 pr-4 py-2.5 rounded-xl border border-purple-500/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none text-sm text-white placeholder-gray-500 transition-all"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-purple-500/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-purple-500/30 shadow-lg group-hover:scale-110 transition-transform">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-sm font-bold text-white">{user?.username || 'User'}</p>
                <p className="text-xs text-gray-400">View Profile</p>
              </div>
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-14 w-64 bg-gray-900 border border-purple-500/20 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-purple-500/20 mb-2">
                  <p className="text-sm font-bold text-white">{user?.username}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <Link
                  to="/app/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:bg-purple-500/10 hover:text-white transition-all"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-2 border-t border-purple-500/20"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-gradient-to-br from-gray-900 to-black border-r border-purple-500/20 shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Menu Header */}
            <div className="p-6 border-b border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">NoteMind</h2>
                  <p className="text-xs text-gray-400">AI Powered</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-400 hover:bg-purple-500/10 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* User Section */}
            <div className="absolute bottom-6 left-4 right-4 space-y-3">
              <div className="bg-gray-800/50 border border-purple-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user?.username}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/app/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center py-2.5 rounded-xl border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all text-sm font-medium"
                >
                  View Profile
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-bold"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TopBar