// UI Plan:
// - Home: URL shortener form, show shortened URL result
// - Login: User login form
// - Signup: User registration form
// - Dashboard: List/manage user URLs (requires login)
// - Admin: Admin controls (optional, if backend supports)
// Components: Button, Input, Card, Label (already present in ui/)
// API integration: Use service/Api.jsx for backend calls
import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './pages/login.jsx';
import Signup from './pages/Signup';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

import Admin from './pages/Admin';
import { AuthContext } from './Contexts/auth.context';



function App() {
  const {user} = useContext(AuthContext)

  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login/> : <Navigate to='/Home' />} />
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to='/Home'/>}/>
        <Route path="/Home" element={user ? <Home/> : <Navigate to='/login'/>}/>
        <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to='/login'/>}/>
        <Route path="/admin" element={user ? <Admin/> : <Navigate to='/login'/>}/>
        <Route path="*" element={<Navigate to='/login' />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
