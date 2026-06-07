import { useState } from "react";
import axios from "axios";

function Signup() {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer"
  });

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        "https://backend-v4ql.onrender.com/auth/register",
        formdata
      );

      alert(res.data.msg);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handlesubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handlechange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <select name="role" onChange={handlechange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <br /><br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;