import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { z } from "zod"

//schema
let usernameschema = z.string().min(6,"username must be atleast 6 characters")
let passwordschema = z.string().min(8,"password must be atleast 8 characters")



function Login(setisauth) {
  //username password
  
  const [username,setusername]=useState('')
  const [password,setpassword]=useState('')
  let navigate=useNavigate()


  //validation function
  function validation(schema,value){
  if(!value) return ""
 let result= schema.safeParse(value)
 console.log(result)
  if(result.success) return "valid"
  return result.error.issues[0].message
}

  //send these credentials(username,password) to the backend   to an endpoint   auth/login
  let senddetails=async (event)=>{
   event.preventDefault();  //stops reloading the page when we submit the form
   //post request

  try {

   let token= localStorage.getItem("token")
    
    let response=await fetch('https://backend-v4ql.onrender.com/auth/login',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
      let data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token)
        setisauth(true)
        navigate('/products')
      } else {
        alert(data.msg || "Login failed")
      }
    } catch (error) {
      console.log(error)
      alert("something went wrong")
    }
  }
  return (
   <>
   <form onSubmit={senddetails}  >
   <h2>Login</h2>
   <p>Welcome back!</p>

  <div>
    <label>Username</label>  <br />
   <input    onChange={(e)=>{setusername(e.target.value)}}  type="text" placeholder="username" />
   <p>{validation(usernameschema,username)}</p>
  </div>

  <div>
  <label>Password</label>  <br />
   <input    onChange={(e)=>{setpassword(e.target.value)}}   type="password" placeholder="password" />
   <p>{validation(passwordschema,password)}</p>
  </div>

  <br />
   
   <button type="submit" >Login</button>

  
   </form>
   </>
  )
}

export default Login