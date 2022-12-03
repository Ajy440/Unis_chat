import React, { useEffect, useState } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../Firebase/config";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import ChatBubble from "./ChatBubble";
import NotificationSound from "../assets/note.mp3";

const ChatMain = () => {
  const auth = getAuth(firebaseApp);
  const userState = useSelector((state) => state.chat.selectedUserData);
  const messagesEndRef = React.useRef(null);
  const [update, forceUpdate] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  };

  const audioPlayer = React.useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  const collectionpath = auth.currentUser?.email + "-chat-" + userState.email;

  const [value, loading, error] = useCollection(
    collection(
      getFirestore(firebaseApp),
      "chats/" + collectionpath + "/messages"
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (value) {
    //console.log(value);
    scrollToBottom();
  }

  useEffect(() => {
    console.log("cal");
    forceUpdate(!update);
  }, [userState.email]);

  return (
    <Paper
      elevation="0"
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: "68vh",
        borderRadius: "18px",
        p: 2,
        mt: 1,
        mb: 1,
        overflowX: "scroll",
      }}
    >
      {value && (
        <span ref={messagesEndRef}>
          {value.docs.map((doc) => (
            <ChatBubble data={doc.data()} scrollToBottom={scrollToBottom} />
          ))}
        </span>
      )}
      <audio ref={audioPlayer} src={NotificationSound} />
    </Paper>
  );
};

export default ChatMain;
