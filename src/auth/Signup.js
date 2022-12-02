import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Navbar from "../components/Navbar";

const Signup = () => {
  const auth = getAuth(firebaseApp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  if (user) {
    console.log(user);
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        console.log("pu");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="App">
      <Navbar />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => createUserWithEmailAndPassword(email, password)}>
        Register
      </button>
    </div>
  );
};

export default Signup;
