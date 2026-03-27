import { useState } from "react";
import api from "../../services/Api";
import { motion } from "motion/react";

export default function RegisterForm({ onLoginClick }) {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordd, setShowPasswordd] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

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
      onLoginClick(); // Kembali ke login
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden overflow-y-hidden max-w-md mx-auto font-display text-black"
    >
      <div className="flex items-center p-6 justify-between">
        <button
          onClick={onLoginClick}
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
            JOIN US
          </h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-black text-xl font-bold uppercase tracking-tight">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-xl font-bold uppercase tracking-tight">
              Username
            </label>

            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Choose a username"
                className="form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-xl font-bold uppercase tracking-tight">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-xl font-bold uppercase tracking-tight">
              Password
            </label>

            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined absolute right-4 cursor-pointer"
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black text-xl font-bold uppercase tracking-tight">
              Confirm Password
            </label>

            <div className=" relative flex items-center">
              <input
                type={showPasswordd ? "text" : "password"}
                value={password_confirmation}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input w-full border-4 border-black bg-white h-16 px-4 text-xl font-bold placeholder:text-gray-400 focus:ring-0 focus:outline-none shadow-neo"
              />

              <span
                onClick={() => setShowPasswordd(!showPasswordd)}
                className="material-symbols-outlined absolute right-4 cursor-pointer"
              >
                {showPasswordd ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-accent text-white border-4 border-black shadow-neo-lg h-20 text-2xl font-black uppercase tracking-widest active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              REGISTER NOW
            </button>
          </div>
        </form>

        <div className="mt-8 text-center pb-12">
          <p className="font-bold text-lg">
            ALREADY PART OF THE TRIBE?
            <span
              onClick={onLoginClick}
              className="underline decoration-4 underline-offset-4 bg-black text-white px-2 py-1 ml-1 cursor-pointer"
            >
              LOGIN
            </span>
          </p>
        </div>
      </main>
    </motion.div>
  );
}
