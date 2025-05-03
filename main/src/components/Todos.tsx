import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface UserInfo {
  username: string;
  email: string;
  iat: number;
  exp: number;
}

function Todos() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/verify", {
        withCredentials: true,
      });

      setUserInfo({
        username: response.data.user.user.username,
        email: response.data.user.user.email,
        iat: response.data.user.iat,
        exp: response.data.user.exp,
      });
    } catch (error) {
      toast.error("Error fetching user information.");
      console.error("Error fetching user information:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out.");
      console.error("Error logging out:", error);
    }
  };

  const openBrowser = async () => {
    window.open(
      "http://localhost:5173",
      "_blank",
      "width=400, height=450, left=1200, top=400,"
    )
  };

  return (
    <div className="text-center">
      <header>
        <h2 className="mb-4 text-2xl font-bold">Hello, {userInfo?.username}</h2>
        <button
          onClick={handleLogout}
          className="p-2 mb-4 text-white bg-red-500 rounded-full"
        >
          Logout
        </button>
      </header>
      {/* {userInfo && (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      )} */}
      <button 
        onClick={openBrowser} 
        className="p-2 mb-4 text-white bg-gray-400 rounded-full">
          Intrasense Assistant
      </button>
    </div>
  );
}

export default Todos;
