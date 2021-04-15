import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/context/UserContext";

import "./Navbar.scss";

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  async function logOut() {
    await axios.get("http://localhost:5005/auth/logOut");

    getUser();
  }

  return (
    <div className="navbar">
      <Link to="/">Snippet manager</Link>
      <div>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="btn-logout" onClick={logOut}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
