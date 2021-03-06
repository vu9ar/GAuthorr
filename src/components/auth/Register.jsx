import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setCPassword] = useState("");
  let navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if(password.length >= 8){
        if(cpassword === password){
          await createUserWithEmailAndPassword(auth, email, password);
          updateProfile(auth.currentUser, { displayName: name });
          navigate("/");
        }else{
          toast("Passwords must be same!", { type: "error" });
        }
      }
      else{
        toast("Password must contain at least 8 characthers!", { type: "error" });
      }
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };


  return (
    <div className="border p-3 bg-light " style={{ marginTop: 70 }}>
      <h1>Register</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
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
        <label>Confirm your password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleSignup}>
        Register
      </button>
      <br></br>
      <br></br>
      <Link className="nav-link" to="/signin">
        Do you already have an account?{" "}
      </Link>
    </div>
  );
}
