import { useState } from "react";
import api from "../services/Api";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navagate = useNavigate();

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!password_confirmation.trim()) {
      newErrors.password_confirmation = "Please confirm your password";
    } else if (password !== password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Register = async (e) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: name,
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      });

      // Setelah register berhasil
      alert("Register berhasil!");
      navagate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
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
            onClick={() => navagate("/login")}
            className="flex items-center justify-center p-2 border-4 border-black shadow-neo bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined font-bold">
              arrow_back
            </span>
          </button>
          <div className="size-12"></div>
        </div>

        <main className="flex-1 px-6">
          <div className="pt-10 pb-10">
            <h1 className="text-black tracking-tighter text-[64px] font-bold leading-[0.9] text-left uppercase break-words">
              JOIN US
            </h1>
          </div>

          <form onSubmit={Register} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-black text-xl font-bold uppercase tracking-tight"
              >
                Full Name
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
                    }
                  }}
                  placeholder="Enter your full name"
                  className={`form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo ${errors.name ? "" : ""}`}
                />

                {/* Validation Error Name Form */}
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-black text-xl font-bold uppercase tracking-tight"
              >
                Username
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: "",
                      }));
                    }
                  }}
                  placeholder="Choose a username"
                  className={`form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo ${errors.username ? "" : ""}`}
                />
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.username}
                </p>
              </div>
            </div>

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
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-black text-xl font-bold uppercase tracking-tight"
              >
                Password
              </label>

              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
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
                htmlFor="password_confirmation"
                className="text-black text-xl font-bold uppercase tracking-tight"
              >
                Confirm Password
              </label>

              <div className=" relative flex items-center">
                <input
                  type={showPasswordd ? "text" : "password"}
                  id="password_confirmation"
                  name="password_confirmation"
                  autoComplete="new-password"
                  value={password_confirmation}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.password_confirmation) {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        password_confirmation: "",
                      }));
                    }
                  }}
                  placeholder="••••••••"
                  className={`form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo ${errors.password_confirmation ? "" : ""}`}
                />

                <span
                  onClick={() => setShowPasswordd(!showPasswordd)}
                  className="material-symbols-outlined absolute right-4 cursor-pointer"
                >
                  {showPasswordd ? "visibility_off" : "visibility"}
                </span>
              </div>
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.password_confirmation}
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full bg-accent text-white border-4 border-black shadow-neo-lg h-20 text-2xl font-black uppercase tracking-widest active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {/* REGISTER NOW */} {isLoading ? "LOADING..." : "REGISTER NOW"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pb-12">
            <p className="font-bold text-lg">
              ALREADY PART OF THE TRIBE?
              <span
                onClick={() => navagate("/")}
                className="underline decoration-2 underline-offset-4 bg-black text-white px-2 py-1 ml-1 cursor-pointer"
              >
                LOGIN
              </span>
            </p>
          </div>
        </main>
      </motion.div>

      {/* Decorative Shapes */}
      <div className="fixed bottom-[-20px] right-[-20px] size-40 bg-accent neo-border -rotate-12 opacity-50 pointer-events-none z-[-1]"></div>

      <div className="fixed top-20 left-[-30px] size-24 bg-white neo-border rotate-45 opacity-50 pointer-events-none z-[-1]"></div>
    </div>
  );
}
