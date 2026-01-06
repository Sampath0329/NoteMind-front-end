import { useNavigate } from 'react-router-dom'
import Navbar from '../commponents/Navbar'
import Footer from '../commponents/Footer'
import { Zap, Brain, Lightbulb, ArrowRight, Sparkles, Star, Rocket, CheckCircle, TrendingUp, Users, Award, Clock, FileText } from 'lucide-react'
import React from 'react'

function Welcome() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-black via-purple-950/20 to-black">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[130px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Side: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 border border-purple-500/30 backdrop-blur-sm animate-fade-in">
                <div className="relative">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 bg-purple-400 blur-md opacity-50"></div>
                </div>
                <span className="text-purple-300 text-sm font-bold tracking-wide">
                  Next-Gen AI Study Platform
                </span>
                <Rocket className="w-4 h-4 text-pink-400" />
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1]">
                  <span className="block text-white mb-2">
                    Unlock Your
                  </span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Learning
                  </span>
                  <span className="block text-white relative inline-block mt-2">
                    Potential
                    <svg
                      className="absolute w-full h-5 -bottom-3 left-0"
                      viewBox="0 0 300 20"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="50%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 10 Q 150 18 300 10"
                        stroke="url(#underline-gradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Transform chaotic lecture notes into <span className="text-purple-400 font-semibold">crystal-clear summaries</span>, 
                  interactive <span className="text-pink-400 font-semibold">flashcards</span>, and 
                  personalized <span className="text-blue-400 font-semibold">quizzes</span>. 
                  All powered by advanced AI.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/auth/signup')}
                  className="group relative w-full sm:w-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl transform group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
                    <span>Start Learning Free</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/demo')}
                  className="group w-full sm:w-auto border-2 border-purple-500/50 text-purple-300 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-purple-500/10 hover:border-purple-400 transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
                >
                  <span>Watch Demo</span>
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-12 h-12 rounded-full border-2 border-black shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${['#a855f7', '#ec4899', '#3b82f6', '#8b5cf6'][i]}, ${['#ec4899', '#3b82f6', '#8b5cf6', '#a855f7'][i]})`
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      <span className="text-white font-bold">2,500+</span> students leveling up
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            {/* Right Side: 3D Card Showcase */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div className="relative w-full max-w-2xl perspective-1000">
                {/* Main Card */}
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>
                  
                  {/* Card Container */}
                  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-3 rounded-3xl border-2 border-purple-500/30 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Students collaborating with AI"
                      className="w-full rounded-2xl object-cover shadow-2xl"
                    />
                    
                    {/* Floating Stats Cards */}
                    <div className="absolute -top-6 -left-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-purple-400/50 backdrop-blur-xl transform hover:scale-110 transition-transform">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6" />
                        <div>
                          <p className="text-xs font-medium opacity-90">Learning Speed</p>
                          <p className="text-2xl font-black">3x Faster</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-400/50 backdrop-blur-xl transform hover:scale-110 transition-transform">
                      <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6" />
                        <div>
                          <p className="text-xs font-medium opacity-90">AI Accuracy</p>
                          <p className="text-2xl font-black">98.5%</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 -left-8 bg-gradient-to-br from-pink-600 to-rose-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-pink-400/50 backdrop-blur-xl transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        <p className="font-black text-lg">AI Powered</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Floating Elements */}
                <div className="absolute -top-8 right-16 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-8 left-16 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-purple-950/30 via-pink-950/30 to-purple-950/30 border-y border-purple-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem icon={<Users />} value="2,500+" label="Active Students" />
            <StatItem icon={<FileText />} value="50K+" label="Notes Created" />
            <StatItem icon={<Brain />} value="100K+" label="Quizzes Generated" />
            <StatItem icon={<Award />} value="98%" label="Success Rate" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-purple-300 text-sm font-bold uppercase tracking-wider">
                Powerful Features
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Dominate
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform gives you superhuman study capabilities. 
              Focus on learning, not organizing.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Lightning Summaries"
              description="Upload hours of lectures and get distilled key points in seconds. Our AI reads faster than humanly possible."
              gradient="from-yellow-500 to-orange-500"
              delay="0"
            />

            {/* Feature 2 */}
            <FeatureCard
              icon={<Brain className="w-10 h-10" />}
              title="Smart Quiz Engine"
              description="Adaptive quizzes that learn your weak spots and focus on what you need to master most."
              gradient="from-purple-500 to-pink-500"
              delay="100"
            />

            {/* Feature 3 */}
            <FeatureCard
              icon={<Lightbulb className="w-10 h-10" />}
              title="AI Tutor Explanations"
              description="Confused by complex topics? Get instant breakdowns in simple language, tailored to your learning style."
              gradient="from-blue-500 to-cyan-500"
              delay="200"
            />

            {/* Feature 4 */}
            <FeatureCard
              icon={<Star className="w-10 h-10" />}
              title="Smart Flashcards"
              description="Automatically generated flashcards from your notes with spaced repetition algorithms."
              gradient="from-pink-500 to-rose-500"
              delay="300"
            />

            {/* Feature 5 */}
            <FeatureCard
              icon={<Clock className="w-10 h-10" />}
              title="Study Scheduling"
              description="AI-optimized study plans that adapt to your pace and schedule for maximum retention."
              gradient="from-emerald-500 to-teal-500"
              delay="400"
            />

            {/* Feature 6 */}
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10" />}
              title="Progress Analytics"
              description="Track your improvement with detailed insights and performance metrics over time."
              gradient="from-violet-500 to-purple-500"
              delay="500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-purple-950/30 via-pink-950/30 to-purple-950/30 py-24 overflow-hidden border-y border-purple-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.1),transparent_50%)]"></div>
        
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Study Game?
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of students already studying smarter with AI. 
            Start for free, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4">
            <button
              onClick={() => navigate('/auth/signup')}
              className="group relative w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl transform group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
                <Rocket className="w-6 h-6" />
                <span>Get Started Free</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>

          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Free forever • Upgrade anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const StatItem = ({ icon, value, label }: any) => (
  <div className="text-center group">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mb-4 group-hover:scale-110 transition-transform">
      <div className="text-white">{React.cloneElement(icon, { size: 24 })}</div>
    </div>
    <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">{value}</h3>
    <p className="text-sm text-gray-400 font-medium">{label}</p>
  </div>
)

const FeatureCard = ({ icon, title, description, gradient, delay }: any) => (
  <div
    className="group relative"
    style={{ animation: `slideInUp 0.6s ease-out ${delay}ms both` }}
  >
    {/* Glow Effect */}
    <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
    
    {/* Card */}
    <div className="relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-sm transform hover:translate-y-[-8px] transition-all duration-300 shadow-xl">
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
        <div className="text-white">{icon}</div>
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-6 flex items-center gap-2 text-purple-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Learn more</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
)

// Add animation styles
const style = document.createElement('style')
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient {
    animation: gradient 3s ease infinite;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
`
document.head.appendChild(style)

export default Welcome