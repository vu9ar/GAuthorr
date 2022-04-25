import { signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { signInWithGoogle } from '../../firebaseConfig.js'
import { Link } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };

  return (
    <div className="border p-3 bg-light mx-auto"
    style={{maxWidth:400, marginTop:60}}
    >
      <h1>Login</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <br></br>
      <br></br>
      <button className="btn btn-primary black" onClick={handleGoogleLogin}>
        Sign In With Google
      </button>
      <br></br>
      <br></br>
      <Link className="nav-link" to="/register">
        Don't you have an account?{" "}
      </Link>

    </div>
  );
}
