import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Login = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

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
        className="flex flex-col flex-1 px-6 pb-12 max-w-md mx-auto w-full"
      >
        {/* Title */}
        <div className="pt-10 pb-12">
          <h1 className="font-primary tracking-tighter text-[64px] font-bold leading-[0.9] uppercase ">
            Order byme
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={Login} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xl font-bold uppercase">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) {
                  setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
                }
              }}
              className={`w-full neo-border bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 shadow-neo focus:outline-none ${
                errors.username ? "" : ""
              }`}
            />

            {/* Validation Error Form */}
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xl font-bold uppercase">
              Password
            </label>

            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                placeholder="••••••••"
                className={`w-full neo-border bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 shadow-neo focus:outline-none ${
                  errors.password ? "" : ""
                }`}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined absolute right-4 cursor-pointer"
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>

            {/* Validation Error Form */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-lg font-bold underline decoration-4 underline-offset-4"
            >
              FORGOT PASSWORD?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full bg-accent text-white neo-border shadow-neo-lg h-20 text-2xl font-black uppercase tracking-widest active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {/* LOGIN NOW */} {isLoading ? "LOADING..." : "LOGIN NOW"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4">
            <hr className="flex-1 border-2 border-black" />
            <span className="font-bold text-lg">OR</span>
            <hr className="flex-1 border-2 border-black" />
          </div>
          {/* Signup */}
          <div className="mt-auto text-center">
            <p className="text-lg font-bold">
              NEW HERE?
              <span
                onClick={() => navigate("/register")}
                className="underline decoration-2 underline-offset-4 bg-black text-white px-2 py-1 ml-2 cursor-pointer"
              >
                SIGN UP
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative Shapes */}
      <div className="fixed bottom-[-20px] right-[-20px] size-40 bg-accent neo-border -rotate-12 opacity-50 pointer-events-none z-[-1]"></div>

      <div className="fixed top-20 left-[-30px] size-24 bg-white neo-border rotate-45 opacity-50 pointer-events-none z-[-1]"></div>
    </div>
  );
}
