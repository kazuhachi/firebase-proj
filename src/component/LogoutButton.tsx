
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"


export const LogoutButton = () => {
    const navigate = useNavigate();

    const signOuthandler = async () => {
        await signOut(auth);
        navigate("/login")
    }
    return (
        
        <button onClick={signOuthandler}>Signout</button>
    )   
}