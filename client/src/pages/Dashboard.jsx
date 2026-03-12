import { useNavigate } from "react-router-dom";
import api from "../services/Api";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Logout gagal");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2">
        Logout
      </button>
    </div>
  );
}
