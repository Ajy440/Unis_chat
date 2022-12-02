import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../Firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const Signup = () => {
  const auth = getAuth(firebaseApp);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  if (user) {
    console.log(user);
  }

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="App">
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
