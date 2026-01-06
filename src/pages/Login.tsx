import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getMyDetials, logIn } from '../services/auth'
import { useAuth } from '../Context/authContext'
import toast from 'react-hot-toast'
import { ArrowLeft, Mail, Lock, Loader2, Sparkles, Eye, EyeOff, CheckCircle } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuth()

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault()
    if (email === '' || password === '') {
      toast.error('Please enter both email and password.')
      return
    }
    setLoading(true)
    try {
      const user = { email, password }
      const res: any = await logIn(user)
      const accessToken = res.data.data.accessToken
      localStorage.setItem('accessToken', accessToken)
      const details: any = await getMyDetials()
      setUser(details.data)
      navigate('/app/dashboard')
      toast.success('Welcome back!')
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[130px] opacity-10"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Info */}
          <div className="hidden lg:block space-y-8">
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
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-purple-300 text-sm font-bold">AI-Powered Learning</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-white mb-2">Welcome</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Back!
                </span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed max-w-md">
                Continue your learning journey with AI-powered summaries, quizzes, and smart study tools.
              </p>

              {/* Feature List */}
              <div className="space-y-4 pt-6">
                {[
                  'Access your personalized dashboard',
                  'Continue where you left off',
                  'Sync across all devices'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-3xl border border-purple-500/30 transform hover:scale-105 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Students learning"
                  className="w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="relative">
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
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>

            {/* Form Card */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 rounded-3xl border border-purple-500/20 shadow-2xl backdrop-blur-xl">
              {/* Mobile Title */}
              <div className="lg:hidden mb-8">
                <h2 className="text-3xl font-black text-white mb-2">Welcome Back!</h2>
                <p className="text-gray-400">Sign in to continue learning</p>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block mb-8">
                <h2 className="text-3xl font-black text-white mb-2">Sign In</h2>
                <p className="text-gray-400">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleLogIn} className="space-y-6">
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
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-bold text-gray-300">
                      Password
                    </label>
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm text-purple-400 hover:text-pink-400 font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-3 ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'group-hover:scale-[1.02] active:scale-95'
                  }`}>
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </div>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800 text-gray-400">New to NoteMind?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link
                to="/auth/signup"
                className="block w-full text-center py-4 rounded-xl border-2 border-purple-500/30 text-purple-300 font-bold hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login