import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import { span } from "motion/react-client";
import { useEffect } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/auth/forgot-password", {
        email: email,
      });
      navigate("/confirm-email", { state: { email: email } });
    } catch (error) {
      // console.log(error);
      alert("Email not found. Please check your email address and try again.");
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
        <div className="flex items-center p-6 justify-between">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center p-2 border-4 border-black shadow-neo bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined font-bold">
              arrow_back
            </span>
          </button>
          <div className="size-12"></div>
        </div>

        <main className="flex-1 px-6 py-8">
          <div className="pt-10 pb-12">
            <h1 className="text-black tracking-tighter text-[64px] font-bold leading-[0.9] text-left uppercase break-words">
              Forgot Password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-black text-xl font-bold uppercase tracking-tight"
              >
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
                    }
                  }}
                  placeholder="Enter your email address"
                  className={`form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo ${errors.email ? "" : ""}`}
                />

                {/* Validation Error Email Form */}
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.email}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-accent text-white border-4 border-black shadow-neo-lg h-20 text-2xl font-black uppercase tracking-widest active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {/* REGISTER NOW */}
                {isLoading ? (
                  "LOADING..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Reset Link
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
