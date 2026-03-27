import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="overflow-hidden">
      {isLogin ? (
        <LoginForm onSignUpClick={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onLoginClick={() => setIsLogin(true)} />
      )}

      {/* Decorative Shapes */}
      <div className="fixed bottom-[-20px] right-[-20px] size-40 bg-accent neo-border -rotate-12 opacity-50 pointer-events-none z-[-1]"></div>

      <div className="fixed top-20 left-[-30px] size-24 bg-white neo-border rotate-45 opacity-50 pointer-events-none z-[-1]"></div>
    </div>
  );
}
