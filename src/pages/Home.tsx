import {auth} from '../config/firebase'

export const Home = () => {
    return(
        <div>
            THis is home

            
            {auth.currentUser?.photoURL && 
                <img src={auth.currentUser.photoURL} alt="user photo"/>
            }
            <p>{auth.currentUser?.displayName}</p>
        </div>
    )
}