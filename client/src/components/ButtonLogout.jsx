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
    <button onClick={logout} className="bg-red-500 text-white px-4 py-2">
      Logout
    </button>
  );
}
