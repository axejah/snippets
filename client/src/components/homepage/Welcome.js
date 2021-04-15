import React from "react";
import { Link } from "react-router-dom";

import "./Welcome.scss";

function Welcome() {
  return (
    <div className="welcome-container">
      <div>
        <h2>Welcome to the Snippet Manager</h2>
        <span>An easy way to store your notes.</span>
        <img
          alt="borat high five"
          src="https://media4.giphy.com/media/l0ErFafpUCQTQFMSk/giphy.gif"
        />
      </div>
      <p>
        <Link to="/login">Click here to log in</Link> or{" "}
        <Link to="/register">Click here to register an account</Link>
      </p>
    </div>
  );
}

export default Welcome;
