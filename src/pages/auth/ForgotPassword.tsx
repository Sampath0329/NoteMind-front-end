import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/auth";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      if (res.status === 200 || res.data.success) {
        setIsSubmitted(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#09090b] font-sans text-white relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-12">
        <div className="relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-900/30 border border-purple-500/30 rounded-full">
            ✨ AI-Powered Learning
          </div>
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Don't <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">worry!</span> 🔐
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            We'll help you recover your account so you can continue your learning journey.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 z-20">
        
        <div className="mb-8">
          <Link
            to="/auth/login"
            className="text-gray-500 hover:text-purple-400 text-sm flex items-center gap-1 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>

        <div className="bg-[#13131a] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
          {!isSubmitted ? (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-bold mb-3">Forgot Password?</h1>
                <p className="text-gray-400">
                  Enter your email address to receive reset instructions.
                </p>
              </div>

              <form onSubmit={handleResetRequest} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1c1c24] border border-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-200 text-white placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform 
                    ${
                      loading
                        ? "bg-purple-900/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    }`}
                >
                  {loading ? "Sending Link..." : "Reset Password"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto border border-purple-500/20 text-purple-400">
                ✉️
              </div>
              <h2 className="text-3xl font-bold mb-4">Check your email</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                A password reset link has been sent to <br />
                <span className="font-semibold text-purple-400">{email}</span>
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => window.open("https://gmail.com", "_blank")}
                  className="w-full py-3.5 rounded-xl border border-white/10 font-bold text-gray-300 hover:bg-white/5 transition-all"
                >
                  Open Email App
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm text-purple-400 font-semibold hover:text-purple-300 underline underline-offset-4"
                >
                  Try another email address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;