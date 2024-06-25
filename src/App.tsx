
import './App.scss';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Post } from './pages/Post';

import { auth } from './config/firebase';

import { useAuthState } from 'react-firebase-hooks/auth'
import { LogoutButton } from './component/LogoutButton';


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
        <Router>
          <header>
            <Link to="/home" >Home</Link>
            <Link to="/post" >Post</Link>
            {
              !user ? 
                <Link to="/login" >Login</Link> : 
                <LogoutButton />
            }

            {
              auth && (
                <div className='user-log-info'>
                  {auth.currentUser?.photoURL && 
                      <img src={auth.currentUser.photoURL} alt="user photo"/>
                  }

                  <h3>
                    {auth.currentUser?.displayName}
                  </h3>
                </div>
              )
            }
          </header>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/post" element={<Post/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
