import React from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";
import { signOut } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { getAuth, sendEmailVerification } from "firebase/auth";


export default function Navbar() {
  const [user] = useAuthState(auth);

  const passwordChange = () =>{
    const newPass = window.prompt('Please enter new password: ');
    const newPass2 = window.prompt('Please enter your password again: ');
    if(newPass.length >= 8){
      if(newPass === newPass2){
        updatePassword(user, newPass);
        toast("Password is changed successfully!", { type: "success" });
      }else{
        toast("Passwords must be same!", { type: "error" });
      }
    }else{
      toast("Password must contain at least 8 characters!", { type: "error" });
    }
  }

  const profileInfo = () =>{
    if (user !== null) {
      user.providerData.forEach((profile) => {
        alert("\nName: " + profile.displayName + "\nEmail: " + profile.email);
      });
    }
  }

  const verifyAcc = () =>{
    sendEmailVerification(auth.currentUser)
  .then(() => {
    toast("Email sent successfully!", {type: "success"});
  });
  }

  const delUser = () => {
    var a = prompt("Please type 'yes' to delete your account!");
    if(a==='yes'){
      deleteUser(user);
    }else{
      toast("Unsuccessful deletion!", {type: "error"});
    }
  }
  return (
    <div className="fixed-top border" style={{ backgroundColor: "whitesmoke" }}>
      <nav className="navbar">
        <div>
          <img
            src="logo192.png"
            width={30}
            height={30}
            alt="logo"
            className="ms-5"
          />
        </div>
        <Link className="nav-link" to="/">
          Home{" "}
        </Link>
        <div>
          {user && (
            <>
              <span className="pe-4">
                Signed is as {user.displayName || user.email}
              </span>
              <button className="btn btn-primary btn-sm me-3"
              onClick={()=>{signOut(auth)}}
              >Logout</button>
              <button className="btn btn-primary btn-sm me-3"
              onClick={()=>{delUser()}}
              >Delete user</button>
              <button className="btn btn-primary btn-sm me-3" type="password"
              onClick={()=>{passwordChange()}}
              >Change Password</button>
              <button className="btn btn-primary btn-sm me-3"
              onClick={()=>{profileInfo()}}
              >Show Profile Information</button>
              <button className="btn btn-primary btn-sm me-3"
              onClick={()=>{verifyAcc()}}
              >Verify Account</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}





