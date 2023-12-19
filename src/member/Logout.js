import { useNavigate } from "react-router-dom";

export const Logout = () => {
    
    const navigate = useNavigate();

    window.sessionStorage.removeItem("id");
    navigate('/Signin');
}