import { useContext } from 'react'
import './App.css'

import Login from './pages/login.jsx';
import Signup from './pages/Signup';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

import Admin from './pages/Admin';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { AuthContext } from './Contexts/auth.context';
import SidebarLayout from './components/SidebarLayout';

function App() {
  const {user} = useContext(AuthContext)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Guest Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Navigate to='/' />} />
          
          <Route path="/login" element={!user ? <Login/> : <Navigate to='/dashboard' />} />
          <Route path="/signup" element={!user ? <Signup/> : <Navigate to='/dashboard'/>}/>
          
          {/* Protected Dashboard Routes */}
          <Route element={user ? <SidebarLayout /> : <Navigate to='/login' />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Navigate to='/' />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

