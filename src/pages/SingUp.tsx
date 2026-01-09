import { useState, type FormEvent } from 'react'
import { signUp } from '../services/auth'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, User, Mail, Lock, Loader2, Sparkles, Eye, EyeOff, Zap, Brain, TrendingUp } from 'lucide-react'

function SignUp() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    if (username === '' || email === '' || password === '') {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const user = { username, email, password }
      await signUp(user)
      toast.success('Account created successfully!')
      navigate('/auth/login')
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[140px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[130px] opacity-10"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Form */}
          <div className="relative order-2 lg:order-1">
            {/* Mobile Back Button */}
            <div className="lg:hidden mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>

            {/* Card Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20"></div>

            {/* Form Card */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 rounded-3xl border border-purple-500/20 shadow-2xl backdrop-blur-xl">
              {/* Title */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
                <p className="text-gray-400">Start your AI-powered learning journey</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-5">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-300">
                    Username
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-300">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-300">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-black/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-white placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`relative bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-3 ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'group-hover:scale-[1.02] active:scale-95'
                  }`}>
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Create Account</span>
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Terms */}
              <p className="mt-6 text-center text-xs text-gray-500">
                By signing up, you agree to our{' '}
                <a href="#" className="text-purple-400 hover:text-pink-400 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-400 hover:text-pink-400 transition-colors">
                  Privacy Policy
                </a>
              </p>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800 text-gray-400">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <Link
                to="/auth/login"
                className="block w-full text-center py-4 rounded-xl border-2 border-purple-500/30 text-purple-300 font-bold hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300"
              >
                Sign In Instead
              </Link>
            </div>
          </div>

          {/* Right Side - Branding & Features */}
          <div className="hidden lg:block space-y-8 order-1 lg:order-2">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>

            {/* Hero Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                <span className="text-pink-300 text-sm font-bold">Join 2,500+ Students</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-white mb-2">Start Learning</span>
                <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Smarter Today
                </span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed max-w-md">
                Join thousands of students using AI to transform their study experience and achieve better results.
              </p>

              {/* Feature Cards */}
              <div className="space-y-4 pt-6">
                <FeatureBadge 
                  icon={<Zap className="w-5 h-5" />}
                  text="Instant AI summaries"
                  gradient="from-yellow-500 to-orange-500"
                />
                <FeatureBadge 
                  icon={<Brain className="w-5 h-5" />}
                  text="Smart quiz generation"
                  gradient="from-purple-500 to-pink-500"
                />
                <FeatureBadge 
                  icon={<TrendingUp className="w-5 h-5" />}
                  text="Track your progress"
                  gradient="from-emerald-500 to-teal-500"
                />
              </div>
            </div>

            {/* Decorative Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-3xl border border-purple-500/30 transform hover:scale-105 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Students learning"
                  className="w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureBadge = ({ icon, text, gradient }: any) => (
  <div className="flex items-center gap-3 group cursor-default">
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
      <div className="text-white">{icon}</div>
    </div>
    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{text}</span>
  </div>
)


export default SignUp