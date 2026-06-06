  import { Link } from "react-router-dom"
  import logo from "./assets/vite.svg"

  function Header({ setsearchquery }) {
    //function which will toggle dark/light mode
    function togglemode() {
      document.body.classList.toggle('dark')
    }

    return (
      <>
        <header>
          <img src={logo} alt="LOGO" />

          <input onChange={(e)=>setsearchquery(e.target.value)} placeholder="Search products" />

          <nav>
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/products">PRODUCT</Link>
            <Link to="/register">SIGNUP</Link>
            <Link to="/login">SIGNIN</Link>
          </nav>

          <button onClick={togglemode}>dark/Light</button>
        </header>
      </>
    )
  }

  export default Header
