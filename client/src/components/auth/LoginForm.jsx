import { useState } from "react";
import api from "../../services/Api";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function LoginForm({ onSignUpClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username: username,
        password: password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login gagal");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col flex-1 px-6 pb-12 max-w-md mx-auto w-full"
      >
        {/* Title */}
        <div className="pt-10 pb-12">
          <h1 className="font-primary tracking-tighter text-[64px] font-bold leading-[0.9] uppercase ">
            Order byme
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold uppercase">Username</label>

            <input
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full neo-border bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 shadow-neo focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xl font-bold uppercase">Password</label>

            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full neo-border bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 shadow-neo focus:outline-none"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined absolute right-4 cursor-pointer"
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button className="text-lg font-bold underline decoration-4 underline-offset-4">
              FORGOT PASSWORD?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-accent text-white neo-border shadow-neo-lg h-20 text-2xl font-black uppercase tracking-widest active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            LOGIN NOW
          </button>
        </form>

        {/* Divider */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <hr className="flex-1 border-2 border-black" />
            <span className="font-bold text-lg">OR</span>
            <hr className="flex-1 border-2 border-black" />
          </div>
          {/* Signup */}
          <div className="mt-auto pt-10 text-center">
            <p className="text-lg font-bold">
              NEW HERE?
              <span
                onClick={onSignUpClick}
                className="underline decoration-4 underline-offset-4 bg-black text-white px-2 py-1 ml-2 cursor-pointer"
              >
                SIGN UP
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
