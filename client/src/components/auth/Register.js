import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../components/context/UserContext";
import "./AuthForm.scss";

function Register() {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordVerify, setFormPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const regData = {
      email: formEmail,
      password: formPassword,
      passwordVerify: formPasswordVerify,
    };

    try {
      await axios.post("http://localhost:5005/auth/", regData);
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
      <h2>Register an account</h2>
      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
      <form className="form" onSubmit={register}>
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
        <label htmlFor="form-passwordverify">Verify password</label>
        <input
          id="form-passwordverify"
          type="password"
          value={formPasswordVerify}
          onChange={(e) => setFormPasswordVerify(e.target.value)}
        />
        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Click here to login</Link>
      </p>
    </div>
  );
}

export default Register;
