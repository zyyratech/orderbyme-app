import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import { useLocation } from "react-router-dom";

export default function ConfirmEmail() {
  const navigate = useNavigate();

  const location = useLocation();
  const emaill = location.state?.email || "";
  const [time, setTime] = useState(120); // 2 minutes minus 1 second

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedExpiry = localStorage.getItem("reset_expiry");

    if (location.state?.resetTimer) {
      const newExpiry = Date.now() + 120000;

      localStorage.setItem("reset_expiry", newExpiry);
      setTime(120);
    } else if (savedExpiry) {
      const remaining = Math.floor((savedExpiry - Date.now()) / 1000);
      setTime(remaining > 0 ? remaining : 0);
    } else {
      // 🔥 INI YANG KAMU KURANG
      const newExpiry = Date.now() + 120000;

      localStorage.setItem("reset_expiry", newExpiry);
      setTime(120);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = localStorage.getItem("reset_expiry");

      if (!expiry) return;

      const remaining = Math.floor((expiry - Date.now()) / 1000);
      setTime(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      localStorage.removeItem("reset_expiry");
    }
  }, [time]);

  const resendLink = async () => {
    try {
      setLoading(true);

      await api.post("/auth/forgot-password", {
        email: emaill,
      });

      const newExpiry = Date.now() + 120000;

      localStorage.setItem("reset_expiry", newExpiry);

      setTime(120);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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

        <main className="flex-1 px-6">
          <div className="pt-10 pb-12">
            <h1 className="text-black tracking-tighter text-[60px] font-bold leading-[0.9] text-left uppercase break-words ">
              Email Confirmation
            </h1>
          </div>

          <div className=" mb-5 text-lg font-medium text-center">
            <h1>Email Confirmed</h1>
            <p>Your email has been confirmed successfully!</p>
          </div>

          <div className="w-full max-w-lg bg-white border-4 border-black neo-shadow-lg p-8 md:p-12 flex flex-col items-center text-center shadow-neo">
            <span
              className="material-symbols-outlined text-green-500 text-6xl"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mark_email_read
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
              CHECK YOUR EMAIL
            </h2>
            <p className="text-lg font-medium mb-10 max-w-sm text-neutral-600 uppercase">
              WE'VE SENT A SECURE LINK TO YOUR INBOX. IT WILL EXPIRE SOON.
            </p>
            <div className="w-full bg-[#f5f5f5] border-4 border-black p-6 mb-10 flex flex-col items-center justify-center relative overflow-hidden shadow-neo">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]"></div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 bg-black text-white px-2 py-0.5">
                ESTIMATED ARRIVAL
              </span>
              <div className="text-7xl font-black tracking-tighter leading-none font-mono">
                {formatTime()}
              </div>
            </div>
            <div className="w-full space-y-4">
              <button
                onClick={resendLink}
                disabled={time > 0 || loading}
                className={`w-full h-16 border-4 border-black font-black uppercase tracking-widest text-xl transition-all ${
                  time > 0
                    ? "bg-blue-600 text-white opacity-60 cursor-not-allowed pointer-events-none"
                    : "bg-blue-600 text-white neo-shadow active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                }`}
              >
                {loading
                  ? "SENDING..."
                  : time > 0
                    ? `RESEND IN ${formatTime()}`
                    : "RESEND LINK"}
              </button>
            </div>
            <div className="mt-8">
              <button
                onClick={() =>
                  navigate("/forgot-password", {
                    state: { email: emaill, resetTimer: true },
                  })
                }
                className="underline decoration-2 underline-offset-4 inline-block bg-black text-white px-4 py-1 font-bold uppercase tracking-tighter transition-colors"
                href="#"
              >
                WRONG EMAIL ADDRESS?
              </button>
            </div>
          </div>
        </main>
      </motion.div>

      {/* Decorative Shapes */}
      <div className="fixed bottom-[-20px] right-[-20px] size-40 bg-accent neo-border -rotate-12 opacity-50 pointer-events-none z-[-1]"></div>

      <div className="fixed top-20 left-[-30px] size-24 bg-white neo-border rotate-45 opacity-50 pointer-events-none z-[-1]"></div>
    </div>
  );
}
