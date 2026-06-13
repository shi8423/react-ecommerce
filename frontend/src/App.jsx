import Header from './header'
import About from './About'
import Signup from './Signup'
import Login from './Login'
import { Route, Routes, Navigate } from 'react-router-dom'
import Products from './Products'
import { useState } from 'react'
import './App.css'


function ProtectedRoute({children}){
 const token=localStorage.getItem('token')
 if(!token) return <Navigate to='auth/login' replace  />
 return children
}




function App() {
  const [searchquery, setsearchquery] = useState('')
  const [isauth,setisauth]=useState(!!localStorage.getItem('token'))

  return (
    <>
    {isauth&&<Header setsearchquery={setsearchquery} />}
      
      <Routes>
        <Route path='/' element={<Login setisauth={setisauth} />} />

        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      
        <Route
          path="/products" element={<ProtectedRoute><Products searchquery={searchquery} /></ProtectedRoute>}
        />
        <Route path='/auth/register' element={<Signup    setisauth={setisauth}     />}  />
        <Route path='/auth/login' element={<Login    setisauth={setisauth}      />}  />
    
      </Routes>
    </>
  )
}

export default App