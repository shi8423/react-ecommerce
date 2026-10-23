
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/vite.svg";

function Header({ setsearchquery, setisauth }) {
  const navigate = useNavigate();

  function togglemode() {
    document.body.classList.toggle("dark");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setisauth(false);
    navigate("/auth/login", { replace: true });
  }

  return (
    <>
      <header>
        <img src={logo} alt="LOGO" />

        <input
          onChange={(e) => setsearchquery(e.target.value)}
          placeholder="Search products"
        />

        <nav style={{ display: "flex", gap: "10px" }}>
          <Link to="/products">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/products">PRODUCTS</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>

        <button onClick={togglemode}>dark/light</button>
      </header>
    </>
  );
}

export default Header;
