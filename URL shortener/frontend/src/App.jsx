import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login.jsx'
import Signup from './pages/Signup'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthContext } from './Contexts/auth.context'



function App() {
  const {user} = useContext(AuthContext)

  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login/> : <Navigate to='/Home' />} />
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to='/Home'/>}/>
         <Route path="/Home" element={user ? <Home/> : <Navigate to='/login'/>}/>
       {/* <Route path="/completed" element={user ? <CompeletedTodo/> : <Navigate to='/login'/>}/>
        <Route path="/pending" element={user ? <PendingTodo/> : <Navigate to='/login'/>}/> */}
        <Route path="*" element={<Navigate to='/login' />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
