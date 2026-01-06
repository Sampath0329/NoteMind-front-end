import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-4 px-6 sm:px-8 border-b border-purple-500/20 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              NoteMind
            </span>
            <span className="text-[10px] text-gray-500 -mt-1 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              AI Powered
            </span>
          </div>
        </Link>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/auth/login"
            className="text-gray-300 hover:text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
          >
            Log in
          </Link>
          <button
            onClick={() => navigate('/auth/signup')}
            className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 active:scale-95"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-purple-500/20 space-y-3">
          <Link
            to="/features"
            className="block text-gray-300 hover:text-purple-400 font-medium text-sm py-2 hover:bg-white/5 px-4 rounded-lg transition-all"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="block text-gray-300 hover:text-purple-400 font-medium text-sm py-2 hover:bg-white/5 px-4 rounded-lg transition-all"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="block text-gray-300 hover:text-purple-400 font-medium text-sm py-2 hover:bg-white/5 px-4 rounded-lg transition-all"
          >
            About
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/auth/login"
              className="text-center text-gray-300 hover:text-white font-medium text-sm py-2 hover:bg-white/5 rounded-lg transition-all"
            >
              Log in
            </Link>
            <button
              onClick={() => navigate('/auth/signup')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-purple-500/30"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar