import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/Api";
import { span } from "motion/react-client";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm New Password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!token || !email) {
      alert("Invalid password reset link. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/auth/reset-password", {
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.status === 200) {
        alert(
          "Password reset successful! Please log in with your new password.",
        );
        navigate("/login");
      }
    } catch (error) {
      alert("Failed to reset password. Please try again.");
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden overflow-y-hidden max-w-md mx-auto font-display text-black"
      >
        <main className="flex-1 px-6 py-8">
          <div className="pt-10 pb-12">
            <h1 className="text-black tracking-tighter text-[64px] font-bold leading-[0.9] text-left uppercase break-words">
              Reset Password
            </h1>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="new-password"
                className="text-black text-xl font-bold uppercase tracking-tight"
              >
                New Password
              </label>

              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="new-password"
                  name="new-password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: "",
                      }));
                    }
                  }}
                  placeholder="••••••••"
                  className={`form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo ${errors.password ? "" : ""}`}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="material-symbols-outlined absolute right-4 cursor-pointer"
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.password}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm-password"
                className="text-black text-xl font-bold uppercase tracking-tight"
              >
                Confirm New Password
              </label>

              <div className="relative flex items-center">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  autoComplete="new-password"
                  type={showPasswordd ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        confirmPassword: "",
                      }));
                    }
                  }}
                  placeholder="••••••••"
                  className={`form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo ${errors.confirmPassword ? "" : ""}`}
                />

                <span
                  onClick={() => setShowPasswordd(!showPasswordd)}
                  className="material-symbols-outlined absolute right-4 cursor-pointer"
                >
                  {showPasswordd ? "visibility_off" : "visibility"}
                </span>
              </div>
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.confirmPassword}
              </p>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className={`w-full bg-accent text-white border-4 border-black shadow-neo-lg h-20 text-2xl font-black uppercase tracking-widest active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {/* REGISTER NOW */}
                {isLoading ? (
                  "LOADING..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Reset Password
                    <span
                      className="material-symbols-outlined"
                      data-icon="arrow_forward"
                    >
                      arrow_forward
                    </span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </main>
      </motion.div>

      {/* Decorative Shapes */}
      <div className="fixed bottom-[-20px] right-[-20px] size-40 bg-accent neo-border -rotate-12 opacity-50 pointer-events-none z-[-1]"></div>

      <div className="fixed top-20 left-[-30px] size-24 bg-white neo-border rotate-45 opacity-50 pointer-events-none z-[-1]"></div>
    </div>
  );
}
