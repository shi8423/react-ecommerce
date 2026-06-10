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

      console.log(res.data);

      if (res.data.token) {

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert("Login Successful");

      } else {

        alert(res.data.msg);

      }

    } catch (error) {

      console.log(error);

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
          value={formdata.username}
          onChange={handlechange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdata.password}
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