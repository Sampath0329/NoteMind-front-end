import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/auth";
import toast from "react-hot-toast";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await resetPassword({ token, password });
      if (res.status === 200 || res.data.success) {
        toast.success("Password reset successfully!");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password. Link may be expired.");
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
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Almost <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">there!</span> 🚀
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Set your new password securely to get back into your account.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 z-20">
        <div className="bg-[#13131a] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-3">Reset Password</h1>
            <p className="text-gray-400">Please enter your new password below.</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[#1c1c24] border border-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-200 text-white placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[#1c1c24] border border-white/10 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-200 text-white placeholder:text-gray-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform 
                ${loading 
                  ? "bg-purple-900/50 cursor-not-allowed" 
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                }`}
            >
              {loading ? "Updating..." : "Set New Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;