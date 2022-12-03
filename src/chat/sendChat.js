import React, { useState } from "react";
import { firebaseApp } from "../Firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

const SendChat = () => {
  const auth = getAuth(firebaseApp);
  const [msg, updateMsg] = useState("");

  const data = {
    body: msg,
    ts: Date.now(),
    sender: auth?.currentUser?.email,
  };

  const addData = async () => {
    await setDoc(
      doc(
        db,
        "chats/aj1@gmail.com-chat-aj2@gmail.com/messages",
        `${Date.now()}`
      ),
      data
    );
  };

  return (
    <div>
      <input
        type="text"
        value={msg}
        onChange={(e) => {
          updateMsg(e.target.value);
        }}
      ></input>
      <button onClick={addData}>send</button>
    </div>
  );
};

export default SendChat;
