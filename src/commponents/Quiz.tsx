import { useEffect, useState } from 'react'
import {
  BrainCircuit,
  CheckCircle,
  XCircle,
  Trophy,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Target,
  Award,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { saveQuizAttempt } from '../services/quizeattempt'
import { getQuiz } from '../services/ai'
import toast from 'react-hot-toast'

interface SummaryViewProps {
  noteId: string | undefined
  quizProps: any
}

interface IQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

interface IQuizData {
  quizId: string
  questions: IQuestion[]
}

function Quiz({ noteId, quizProps }: SummaryViewProps) {
  const [quizData, setQuizData] = useState<IQuizData | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [answers, setAnswers] = useState<{ question: string; correct: boolean }[]>([])

  useEffect(() => {
    if (quizProps && quizProps.questions) {
      setQuizData(quizProps)
    }
  }, [quizProps])

  const handleGenerateQuiz = async () => {
    if (!noteId) return
    setLoading(true)
    try {
      const res: any = await getQuiz(noteId)
      setQuizData({
        quizId: res.data.quizId,
        questions: res.data.questions,
      })
      setCurrentQuestionIndex(0)
      setScore(0)
      setQuizFinished(false)
      setAnswers([])
      resetQuestionState()
      toast.success('Quiz generated successfully!')
    } catch (error) {
      toast.error('Failed to generate quiz.')
    } finally {
      setLoading(false)
    }
  }

  const handleOptionClick = async (option: string) => {
    if (isAnswerChecked || !quizData) return
    setSelectedOption(option)
    setIsAnswerChecked(true)

    const currentQuestion = quizData.questions[currentQuestionIndex]
    const isCorrect = option === currentQuestion.correctAnswer

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    setAnswers([...answers, { question: currentQuestion.question, correct: isCorrect }])

    try {
      await saveQuizAttempt(quizData.quizId, {
        userAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
        quizIndex: currentQuestionIndex,
      })
    } catch (error) {
      toast.error('Failed to save attempt.')
    }
  }

  const handleNextQuestion = () => {
    if (!quizData) return
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1)
      resetQuestionState()
    } else {
      setQuizFinished(true)
    }
  }

  const resetQuestionState = () => {
    setSelectedOption(null)
    setIsAnswerChecked(false)
  }

  const percentage = quizData ? Math.round((score / quizData.questions.length) * 100) : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 border-4 border-purple-500/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
            <BrainCircuit className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-purple-400" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-white animate-pulse">Generating Quiz...</p>
            <p className="text-sm text-gray-400">AI is creating personalized questions</p>
          </div>
        </div>
      </div>
    )
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-purple-500/30 shadow-2xl">
                <BrainCircuit className="w-16 h-16 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-purple-300 text-sm font-bold">AI Quiz Generator</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-white">
                Test Your <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Knowledge</span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Generate an AI-powered quiz based on your notes to reinforce learning and track your progress
              </p>
            </div>

            <button
              onClick={handleGenerateQuiz}
              className="group relative overflow-hidden inline-flex"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl transform group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
                <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="text-lg">Generate Quiz</span>
              </div>
            </button>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4 pt-12">
              <FeatureItem
                icon={<Target className="w-6 h-6" />}
                title="Adaptive"
                description="Questions tailored to your notes"
                gradient="from-blue-500 to-cyan-500"
              />
              <FeatureItem
                icon={<TrendingUp className="w-6 h-6" />}
                title="Track Progress"
                description="Monitor your improvement"
                gradient="from-purple-500 to-pink-500"
              />
              <FeatureItem
                icon={<Award className="w-6 h-6" />}
                title="Instant Feedback"
                description="Learn from your mistakes"
                gradient="from-emerald-500 to-teal-500"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (quizFinished) {
    const isPerfect = score === quizData.questions.length
    const isGood = percentage >= 70
    const isOkay = percentage >= 50

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          {isPerfect && (
            <>
              <div className="absolute top-20 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </>
          )}
        </div>

        <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
          <div className="relative group">
            <div className={`absolute -inset-4 bg-gradient-to-r ${isPerfect ? 'from-yellow-500 to-orange-500' : 'from-purple-600 to-pink-600'} rounded-3xl blur-2xl opacity-30 animate-pulse`}></div>

            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 shadow-2xl p-8 sm:p-12">
              <div className="text-center space-y-8">
                {/* Trophy Icon */}
                <div className="relative inline-block">
                  <div className={`absolute inset-0 bg-gradient-to-r ${isPerfect ? 'from-yellow-500 to-orange-500' : isGood ? 'from-emerald-500 to-teal-500' : 'from-purple-500 to-pink-500'} rounded-full blur-3xl opacity-50 animate-pulse`}></div>
                  <div className={`relative w-32 h-32 bg-gradient-to-br ${isPerfect ? 'from-yellow-500 to-orange-500' : isGood ? 'from-emerald-500 to-teal-500' : 'from-purple-500 to-pink-500'} rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl transform hover:scale-110 transition-transform`}>
                    {isPerfect ? <Award className="w-16 h-16 text-white" /> : <Trophy className="w-16 h-16 text-white" />}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h2 className="text-4xl sm:text-5xl font-black text-white">
                    {isPerfect ? '🎉 Perfect Score!' : isGood ? '👏 Well Done!' : isOkay ? '💪 Good Effort!' : '📚 Keep Learning!'}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {isPerfect ? "Outstanding! You've mastered this topic!" : isGood ? "Great job! You're doing well!" : isOkay ? "Not bad! Keep practicing!" : "Don't worry, practice makes perfect!"}
                  </p>
                </div>

                {/* Score Display */}
                <div className="inline-block bg-black/30 border border-purple-500/20 rounded-3xl p-8">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        {score}
                      </div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Correct</p>
                    </div>
                    <div className="text-4xl text-gray-600">/</div>
                    <div className="text-center">
                      <div className="text-6xl font-black text-white mb-2">
                        {quizData.questions.length}
                      </div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Total</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="w-full max-w-xs h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${isPerfect ? 'from-yellow-500 to-orange-500' : isGood ? 'from-emerald-500 to-teal-500' : 'from-purple-500 to-pink-500'} transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold text-white">{percentage}%</span>
                  </div>
                </div>

                {/* Performance Breakdown - FIXED: This was the missing closing div */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-3xl font-black text-white mb-1">{score}</p>
                    <p className="text-sm text-gray-400">Correct Answers</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                    <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <p className="text-3xl font-black text-white mb-1">{quizData.questions.length - score}</p>
                    <p className="text-sm text-gray-400">Incorrect Answers</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button
                    onClick={handleGenerateQuiz}
                    className="group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl blur-lg opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform group-hover/btn:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" />
                      <span>Try Another Quiz</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Quiz Time</h2>
                <p className="text-sm text-gray-400">Test your knowledge</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white">{score}</div>
              <p className="text-sm text-gray-400">Score</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-400">
              <span>Question {currentQuestionIndex + 1} of {quizData.questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 ease-out rounded-full shadow-lg shadow-purple-500/50"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>

          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 shadow-2xl p-8">
            <div className="space-y-6">
              {/* Question */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-lg">{currentQuestionIndex + 1}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid gap-3 pt-4">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = option === currentQuestion.correctAnswer
                  const isSelected = option === selectedOption
                  const isWrong = isSelected && !isCorrect

                  let buttonClass = 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800 text-gray-300'

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      buttonClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    } else if (isWrong) {
                      buttonClass = 'bg-red-500/20 border-red-500/50 text-red-300 shadow-lg shadow-red-500/20'
                    } else {
                      buttonClass = 'bg-gray-800/30 border-gray-700/50 text-gray-500 opacity-50'
                    }
                  } else if (isSelected) {
                    buttonClass = 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20'
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      disabled={isAnswerChecked}
                      className={`relative group/option w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex justify-between items-center ${buttonClass} ${!isAnswerChecked && 'hover:scale-[1.02] active:scale-[0.98]'}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                          isAnswerChecked && isCorrect ? 'bg-emerald-500 text-white' :
                          isAnswerChecked && isWrong ? 'bg-red-500 text-white' :
                          isSelected ? 'bg-purple-500 text-white' :
                          'bg-gray-700 text-gray-400'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>

                      {isAnswerChecked && isCorrect && (
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      )}
                      {isAnswerChecked && isWrong && (
                        <XCircle className="w-6 h-6 text-red-400" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Next Button */}
              {isAnswerChecked && (
                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleNextQuestion}
                    className="group/next relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-70 group-hover/next:opacity-100 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform group-hover/next:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
                      <span>{currentQuestionIndex + 1 === quizData.questions.length ? 'Finish Quiz' : 'Next Question'}</span>
                      <ArrowRight className="w-5 h-5 group-hover/next:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureItem = ({ icon, title, description, gradient }: any) => (
  <div className="group relative">
    <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-center">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  </div>
)

export default Quiz

// import { useEffect, useState } from 'react'
// import {
//   BrainCircuit,
//   CheckCircle,
//   XCircle,
//   Trophy,
//   RefreshCw,
//   ArrowRight,
//   Sparkles,
//   Target,
//   Award,
//   Zap,
//   TrendingUp,
// } from 'lucide-react'
// import { saveQuizAttempt } from '../services/quizeattempt'
// import { getQuiz } from '../services/ai'
// import toast from 'react-hot-toast'

// interface SummaryViewProps {
//   noteId: string | undefined
//   quizProps: any
// }

// interface IQuestion {
//   question: string
//   options: string[]
//   correctAnswer: string
// }

// interface IQuizData {
//   quizId: string
//   questions: IQuestion[]
// }

// function Quiz({ noteId, quizProps }: SummaryViewProps) {
//   const [quizData, setQuizData] = useState<IQuizData | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
//   const [selectedOption, setSelectedOption] = useState<string | null>(null)
//   const [isAnswerChecked, setIsAnswerChecked] = useState(false)
//   const [score, setScore] = useState(0)
//   const [quizFinished, setQuizFinished] = useState(false)
//   const [answers, setAnswers] = useState<{ question: string; correct: boolean }[]>([])

//   useEffect(() => {
//     if (quizProps && quizProps.questions) {
//       setQuizData(quizProps)
//     }
//   }, [quizProps])

//   const handleGenerateQuiz = async () => {
//     if (!noteId) return
//     setLoading(true)
//     try {
//       const res: any = await getQuiz(noteId)
//       setQuizData({
//         quizId: res.data.quizId,
//         questions: res.data.questions,
//       })
//       setCurrentQuestionIndex(0)
//       setScore(0)
//       setQuizFinished(false)
//       setAnswers([])
//       resetQuestionState()
//       toast.success('Quiz generated successfully!')
//     } catch (error) {
//       toast.error('Failed to generate quiz.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleOptionClick = async (option: string) => {
//     if (isAnswerChecked || !quizData) return
//     setSelectedOption(option)
//     setIsAnswerChecked(true)

//     const currentQuestion = quizData.questions[currentQuestionIndex]
//     const isCorrect = option === currentQuestion.correctAnswer

//     if (isCorrect) {
//       setScore((prev) => prev + 1)
//     }

//     setAnswers([...answers, { question: currentQuestion.question, correct: isCorrect }])

//     try {
//       await saveQuizAttempt(quizData.quizId, {
//         userAnswer: option,
//         correctAnswer: currentQuestion.correctAnswer,
//         quizIndex: currentQuestionIndex,
//       })
//     } catch (error) {
//       toast.error('Failed to save attempt.')
//     }
//   }

//   const handleNextQuestion = () => {
//     if (!quizData) return
//     if (currentQuestionIndex + 1 < quizData.questions.length) {
//       setCurrentQuestionIndex((prev) => prev + 1)
//       resetQuestionState()
//     } else {
//       setQuizFinished(true)
//     }
//   }

//   const resetQuestionState = () => {
//     setSelectedOption(null)
//     setIsAnswerChecked(false)
//   }

//   const percentage = quizData ? Math.round((score / quizData.questions.length) * 100) : 0

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
//         <div className="text-center space-y-6">
//           <div className="relative inline-block">
//             <div className="w-24 h-24 border-4 border-purple-500/20 rounded-full"></div>
//             <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
//             <BrainCircuit className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-purple-400" />
//           </div>
//           <div className="space-y-2">
//             <p className="text-xl font-bold text-white animate-pulse">Generating Quiz...</p>
//             <p className="text-sm text-gray-400">AI is creating personalized questions</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!quizData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
//         {/* Background */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[140px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
//         </div>

//         <div className="max-w-3xl mx-auto px-4 py-20 relative z-10">
//           <div className="text-center space-y-8">
//             <div className="relative inline-block">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
//               <div className="relative w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-purple-500/30 shadow-2xl">
//                 <BrainCircuit className="w-16 h-16 text-white" />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
//                 <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
//                 <span className="text-purple-300 text-sm font-bold">AI Quiz Generator</span>
//               </div>

//               <h1 className="text-4xl sm:text-5xl font-black text-white">
//                 Test Your <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Knowledge</span>
//               </h1>

//               <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//                 Generate an AI-powered quiz based on your notes to reinforce learning and track your progress
//               </p>
//             </div>

//             <button
//               onClick={handleGenerateQuiz}
//               className="group relative overflow-hidden inline-flex"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
//               <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl transform group-hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
//                 <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
//                 <span className="text-lg">Generate Quiz</span>
//               </div>
//             </button>

//             {/* Features */}
//             <div className="grid sm:grid-cols-3 gap-4 pt-12">
//               <FeatureItem
//                 icon={<Target className="w-6 h-6" />}
//                 title="Adaptive"
//                 description="Questions tailored to your notes"
//                 gradient="from-blue-500 to-cyan-500"
//               />
//               <FeatureItem
//                 icon={<TrendingUp className="w-6 h-6" />}
//                 title="Track Progress"
//                 description="Monitor your improvement"
//                 gradient="from-purple-500 to-pink-500"
//               />
//               <FeatureItem
//                 icon={<Award className="w-6 h-6" />}
//                 title="Instant Feedback"
//                 description="Learn from your mistakes"
//                 gradient="from-emerald-500 to-teal-500"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (quizFinished) {
//     const isPerfect = score === quizData.questions.length
//     const isGood = percentage >= 70
//     const isOkay = percentage >= 50

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0 pointer-events-none">
//           {isPerfect && (
//             <>
//               <div className="absolute top-20 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
//               <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
//               <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
//             </>
//           )}
//         </div>

//         <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
//           <div className="relative group">
//             <div className={`absolute -inset-4 bg-gradient-to-r ${isPerfect ? 'from-yellow-500 to-orange-500' : 'from-purple-600 to-pink-600'} rounded-3xl blur-2xl opacity-30 animate-pulse`}></div>

//             <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 shadow-2xl p-8 sm:p-12">
//               <div className="text-center space-y-8">
//                 {/* Trophy Icon */}
//                 <div className="relative inline-block">
//                   <div className={`absolute inset-0 bg-gradient-to-r ${isPerfect ? 'from-yellow-500 to-orange-500' : isGood ? 'from-emerald-500 to-teal-500' : 'from-purple-500 to-pink-500'} rounded-full blur-3xl opacity-50 animate-pulse`}></div>
//                   <div className={`relative w-32 h-32 bg-gradient-to-br ${isPerfect ? 'from-yellow-500 to-orange-500' : isGood ? 'from-emerald-500 to-teal-500' : 'from-purple-500 to-pink-500'} rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl transform hover:scale-110 transition-transform`}>
//                     {isPerfect ? <Award className="w-16 h-16 text-white" /> : <Trophy className="w-16 h-16 text-white" />}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <div className="space-y-2">
//                   <h2 className="text-4xl sm:text-5xl font-black text-white">
//                     {isPerfect ? '🎉 Perfect Score!' : isGood ? '👏 Well Done!' : isOkay ? '💪 Good Effort!' : '📚 Keep Learning!'}
//                   </h2>
//                   <p className="text-gray-400 text-lg">
//                     {isPerfect ? "Outstanding! You've mastered this topic!" : isGood ? "Great job! You're doing well!" : isOkay ? "Not bad! Keep practicing!" : "Don't worry, practice makes perfect!"}
//                   </p>
//                 </div>

//                 {/* Score Display */}
//                 <div className="inline-block bg-black/30 border border-purple-500/20 rounded-3xl p-8">
//                   <div className="flex items-center justify-center gap-8">
//                     <div className="text-center">
//                       <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//                         {score}
//                       </div>
//                       <p className="text-sm text-gray-400 uppercase tracking-wider">Correct</p>
//                     </div>
//                     <div className="text-4xl text-gray-600">/</div>
//                     <div className="text-center">
//                       <div className="text-6xl font-black text-white mb-2">
//                         {quizData.questions.length}
//                       </div>
//                       <p className="text-sm text-gray-400 uppercase tracking-wider">Total</p>
//                     </div>
//                   </div>
//                   <div className="mt-6 flex items-center justify-center gap-2">
//                     <div className="w-full max-w-xs h-3 bg-gray-700 rounded-full overflow-hidden">
//                       <div
//                         className={`h-full bg-gradient-to-r ${isPerfect ? 'from-yellow-500 to-orange-500' : isGood ? 'from-emerald-500 to-teal-500' : 'from-purple-500 to-pink-500'} transition-all duration-1000 ease-out`}
//                         style={{ width: `${percentage}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-2xl font-bold text-white">{percentage}%</span>
//                   </div>
//                 </div>

//                 {/* Performance Breakdown - FIXED: This was the missing closing div */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
//                     <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
//                     <p className="text-3xl font-black text-white mb-1">{score}</p>
//                     <p className="text-sm text-gray-400">Correct Answers</p>
//                   </div>
//                   <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
//                     <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
//                     <p className="text-3xl font-black text-white mb-1">{quizData.questions.length - score}</p>
//                     <p className="text-sm text-gray-400">Incorrect Answers</p>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//                   <button
//                     onClick={handleGenerateQuiz}
//                     className="group/btn relative overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl blur-lg opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
//                     <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform group-hover/btn:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
//                       <RefreshCw className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" />
//                       <span>Try Another Quiz</span>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const currentQuestion = quizData.questions[currentQuestionIndex]
//   const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-20 relative overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
//                 <BrainCircuit className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-black text-white">Quiz Time</h2>
//                 <p className="text-sm text-gray-400">Test your knowledge</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-3xl font-black text-white">{score}</div>
//               <p className="text-sm text-gray-400">Score</p>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm font-medium text-gray-400">
//               <span>Question {currentQuestionIndex + 1} of {quizData.questions.length}</span>
//               <span>{Math.round(progress)}%</span>
//             </div>
//             <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
//               <div
//                 className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 ease-out rounded-full shadow-lg shadow-purple-500/50"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         {/* Question Card */}
//         <div className="relative group mb-8">
//           <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>

//           <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-purple-500/20 shadow-2xl p-8">
//             <div className="space-y-6">
//               {/* Question */}
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                   <span className="text-white font-black text-lg">{currentQuestionIndex + 1}</span>
//                 </div>
//                 <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
//                   {currentQuestion.question}
//                 </h3>
//               </div>

//               {/* Options */}
//               <div className="grid gap-3 pt-4">
//                 {currentQuestion.options.map((option, idx) => {
//                   const isCorrect = option === currentQuestion.correctAnswer
//                   const isSelected = option === selectedOption
//                   const isWrong = isSelected && !isCorrect

//                   let buttonClass = 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50 hover:bg-gray-800 text-gray-300'

//                   if (isAnswerChecked) {
//                     if (isCorrect) {
//                       buttonClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20'
//                     } else if (isWrong) {
//                       buttonClass = 'bg-red-500/20 border-red-500/50 text-red-300 shadow-lg shadow-red-500/20'
//                     } else {
//                       buttonClass = 'bg-gray-800/30 border-gray-700/50 text-gray-500 opacity-50'
//                     }
//                   } else if (isSelected) {
//                     buttonClass = 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20'
//                   }

//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => handleOptionClick(option)}
//                       disabled={isAnswerChecked}
//                       className={`relative group/option w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex justify-between items-center ${buttonClass} ${!isAnswerChecked && 'hover:scale-[1.02] active:scale-[0.98]'}`}
//                     >
//                       <div className="flex items-center gap-4 flex-1">
//                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
//                           isAnswerChecked && isCorrect ? 'bg-emerald-500 text-white' :
//                           isAnswerChecked && isWrong ? 'bg-red-500 text-white' :
//                           isSelected ? 'bg-purple-500 text-white' :
//                           'bg-gray-700 text-gray-400'
//                         }`}>
//                           {String.fromCharCode(65 + idx)}
//                         </div>
//                         <span className="font-medium">{option}</span>
//                       </div>

//                       {isAnswerChecked && isCorrect && (
//                         <CheckCircle className="w-6 h-6 text-emerald-400" />
//                       )}
//                       {isAnswerChecked && isWrong && (
//                         <XCircle className="w-6 h-6 text-red-400" />
//                       )}
//                     </button>
//                   )
//                 })}
//               </div>

//               {/* Next Button */}
//               {isAnswerChecked && (
//                 <div className="flex justify-end pt-6">
//                   <button
//                     onClick={handleNextQuestion}
//                     className="group/next relative overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-70 group-hover/next:opacity-100 transition-opacity"></div>
//                     <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform group-hover/next:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3">
//                       <span>{currentQuestionIndex + 1 === quizData.questions.length ? 'Finish Quiz' : 'Next Question'}</span>
//                       <ArrowRight className="w-5 h-5 group-hover/next:translate-x-1 transition-transform" />
//                     </div>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const FeatureItem = ({ icon, title, description, gradient }: any) => (
//   <div className="group relative">
//     <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
//     <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all text-center">
//       <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
//         <div className="text-white">{icon}</div>
//       </div>
//       <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
//       <p className="text-xs text-gray-400">{description}</p>
//     </div>
//   </div>
// )

// export default Quiz