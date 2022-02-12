import React from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

const OAuth = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      // Check if User exists
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // Create User if it doesnt Exist
      if (!docSnap.exists()) {
        setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("failed to Authorize with Google");
    }
  };
  return (
    <div className="socialLogin">
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img src={googleIcon} className="socialIconImg" alt="google" />
      </button>
    </div>
  );
};

export default OAuth;
