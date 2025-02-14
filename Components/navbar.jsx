import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import React from "react";


const Navbar = () => {
  const location = useLocation();
  const pageName = location.pathname === "/" ? "Home" :
    location.pathname === "/about" ? "About" :
    location.pathname === "/spain" ? "Spain" :
    location.pathname === "/oceania" ? "Oceania" :
    location.pathname === "/russia" ? "Russia" :
    location.pathname === "/contact" ? "Contact" : "Page";

  return (
    <header className="navbar">
     
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/spain">Spain</Link></li>
        
        </ul>
      </nav>
      <div className="navbar-title">
        <h1>{pageName}</h1> {/* Page Name */}
      </div>
    </header>
  );
};

export default Navbar;
