import { useState } from "react";
import axios from "axios";

function Signin() {

  const [formdata, setformdata] = useState({
    username: "",
    password: ""
  });

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        "https://backend-v4ql.onrender.com/auth/login",
        formdata
      );

      alert(res.data.msg);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Signin</h1>

      <form onSubmit={handlesubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handlechange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlechange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default Signin;