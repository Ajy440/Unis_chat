import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../Firebase/config";

const Login = () => {
  const auth = getAuth(firebaseApp);

  const login = () => {
    signInWithEmailAndPassword(auth, "ajy9582@gmail.com", "1234567890");
  };
  const logout = () => {
    signOut(auth);
  };

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    console.log("loading");
  }
  if (error) {
    console.log(error);
  }
  if (user) {
    console.log(user.email);
  }
  return (
    <>
      <button onClick={login}>Log in</button>{" "}
      <button onClick={logout}>Log out</button>
    </>
  );
};

export default Login;
