import axios from "axios";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate }  from "react-router-dom";

export default function LogoutButton() {
  const { setAuth} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
        const res = await axios.post("/api/auth/logout", {}, {
            withCredentials : true,
        });
        console.log(res);
        setAuth(null);
        navigate("/signin");

    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <LogOut
        size={18}
        className = "cursor-pointer text-gray-500 hover:text-black"
        onClick = {handleLogout}
    />
  )
}
