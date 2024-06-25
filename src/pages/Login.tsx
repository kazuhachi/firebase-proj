import {auth, provider} from "../config/firebase";
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const navigate = useNavigate();
    
    const signInGoogleHandler = async() => {
        const result = await signInWithPopup(auth, provider);
        
        if (result){
            console.log(result);
            navigate("/post");
        }
        
    }
    return(
        <div>
            THis is login page



            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="login-card">
                <p>Sign in with goole!</p>
                <button onClick={signInGoogleHandler}>Sign in with Goole</button>


                {auth.currentUser?.photoURL && 
                    <img src={auth.currentUser.photoURL} alt="user photo"/>
                }
                {
                    auth.currentUser?.displayName && 
                    <p>{auth.currentUser?.displayName}</p>
                }
            </div>

        </div>
    )
}