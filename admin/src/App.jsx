import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add.jsx';
import List from './pages/List.jsx';
import Orders from './pages/Orders.jsx';
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl=import.meta.env.VITE_BACKEND_URL
export const currency='$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");
  useEffect(()=>{
    localStorage.setItem('token',token);
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === "" ? <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path="/add" element={<Add token={token} />}></Route>
                  <Route path="/list" element={<List token={token} />}></Route>
                  <Route path="/orders" element={<Orders token={token} />}></Route>
                </Routes>
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default App
