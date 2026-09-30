import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const firstLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/products" className="logo">
        Rammal Store
      </Link>

      <div className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {user ? (
          <div className="user-menu">
            <button
              className="user-avatar"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {firstLetter}
            </button>

            {menuOpen && (
              <div className="user-dropdown">
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>

                <div className="dropdown-divider"></div>

                <button onClick={() => navigate("/products")}>
                  My Account
                </button>

                <button onClick={() => navigate("/cart")}>
                  My Orders
                </button>

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;