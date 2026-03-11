import { useState } from "react";
import api from "../services/Api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login gagal");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex flex-col flex-1 px-6 pb-12 max-w-md mx-auto w-full">
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
            <label className="text-xl font-bold uppercase">Email</label>

            <input
              type="email"
              placeholder="USER@DOMAIN.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <span className="underline decoration-4 underline-offset-4 bg-black text-white px-2 py-1 ml-2">
                SIGN UP
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="fixed bottom-[-20px] right-[-20px] size-40 bg-accent neo-border -rotate-12 opacity-50"></div>

      <div className="fixed top-20 left-[-30px] size-24 bg-white neo-border rotate-45 opacity-50"></div>
    </div>
  );
}
