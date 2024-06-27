import React, { useEffect,useContext } from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { AuthContext, FirebaseContext } from './store/Context';

/**
 * ?  =====Import Components=====
*/
import Signup from './Pages/Signup'
import LoginPage from './Pages/Login';
import Home from './Pages/Home';
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import Post from './store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext);
  const {auth} = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        
        setUser(currentUser); // Update user state in AuthContext
      } else {
        setUser(null); // Clear user state in AuthContext
      }
  });
    
    return () => unsubscribe();
  }, [auth, setUser]); 

  
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>    
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/post' element={<ViewPost/>}/>
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
