import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {z} from 'zod'
//usenavigate
//schema

 let usernameschema=z.string().min(6,"username must be atleast 6 characters")
  let emailschema=z.string().email("invalid email format")
 let  passwordschema=z.string().min(8,"password must be atleast 8 characters")
  let roleschema=z.string().min(1,"role is required")



function Signup({setisauth}) {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [role, setrole] = useState('')
  let navigate=useNavigate()

 
  function validate(schema,value){
if(!value) return ""
 let result= schema.safeParse(value)
  if(result.success) return "valid"
  return result.error.issues[0].message
}

  let onsubmit = async (event) => {
    event.preventDefault()
    
    try {
      let userdetails = { username, password, email, role }
      let resultfetch = await fetch('https://backend-v4ql.onrender.com/auth/register',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userdetails)
      })

      let finalresponse = await resultfetch.json()

      if (finalresponse.token) {
        localStorage.setItem("token", finalresponse.token)
        setisauth(true)
        navigate('/products')
      } else {
        alert(finalresponse.msg || "something went wrong")
      }
    } catch (error) {
      console.log(error)
      alert("something went wrong")
    }
  }


  return (
    <>
    <form onSubmit={onsubmit} >
     <h2>Create your account</h2>
     <p>Welcome! Please fill in the details to get started.</p>
     <div>
        <label >username</label>
        <input onChange={(e)=>{
            setusername(e.target.value)
        }}  type="text"   placeholder="username"   />
        <p>{validate(usernameschema,username)}</p>
     </div>

     <div>
        <label >email</label>
        <input onChange={(e)=>{
               setemail(e.target.value)
        }}     type="email" placeholder="email" />
        <p>{validate(emailschema,email)}</p>
     </div>

     <div>
         <label>password</label>
         <input onChange={(e)=>{
            setpassword(e.target.value)
         }} type="password" placeholder="password" />
         <p>{validate(passwordschema,password)}</p>
     </div>

     <div>
       <label>role</label>
        <input onChange={(e)=>{
             setrole(e.target.value)
        }}    type="text" placeholder="role" />
        <p>{validate(roleschema,role)}</p>
     </div>
      <button type="submit" >register</button>
    </form>

    </>
  )
}

export default Signup