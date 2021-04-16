import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../components/context/UserContext";
import "./AuthForm.scss";

function Login() {
  const domain = process.env.REACT_APP_BACKEND_DOMAIN;
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await axios.post(`${domain}/auth/login/`, loginData);
      await getUser();

      history.push("/");
    } catch (error) {
      if (error.response) {
        if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        }
      }
      return;
    }
  }
  return (
    <div className="auth-form">
      <h2>Log in</h2>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      <form className="form" onSubmit={login}>
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={formPassword}
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <button type="submit" className="btn-login">
          Log in
        </button>
      </form>
      <p>
        No account yet? <Link to="/register">Click here to register</Link>
      </p>
    </div>
  );
}

export default Login;
