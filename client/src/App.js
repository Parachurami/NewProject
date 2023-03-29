// import './App.css';
import Home from './pages/home/Home';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile"
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={user ? Home : Register} />
        <Route path='/login' element={user ? (<Navigate replace to={"/"} />) : (<Login/>)} />
        <Route path='/register' element={user ? (<Navigate replace to={"/"} />) : (<Register/>)} />
        <Route path='/profile/:username' Component={Profile} />
      </Routes>
    </Router>
  );
}

export default App;
