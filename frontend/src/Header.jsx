import { Link } from "react-router-dom";
import logo from "./assets/vite.svg";

function Header({ setsearchquery }) {

  function togglemode() {
    document.body.classList.toggle('dark');
  }

  return (
    <>
      <header>
        <img src={logo} alt="LOGO" />

        <input
          onChange={(e) => setsearchquery(e.target.value)}
          placeholder="Search products"
        />

        <nav style={{ display: 'flex', gap: '10px' }}>
          <Link to="/products">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/products">PRODUCTS</Link>
          <Link to="/auth/register">Signup</Link>
          <Link to="/auth/login">Signin</Link>
        </nav>

        <button onClick={togglemode}>
          dark/light
        </button>
      </header>
    </>
  );
}

export default Header;