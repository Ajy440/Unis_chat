import React from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../Firebase/config";
import SendChat from "./sendChat";

const ChatMain = () => {
  const [value, loading, error] = useCollection(
    collection(
      getFirestore(firebaseApp),
      "chats/aj1@gmail.com-chat-aj2@gmail.com/messages"
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (value) {
    //console.log(value);
  }
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <span>
            Collection:{" "}
            {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{" "}
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
      <SendChat />
    </div>
  );
};

export default ChatMain;
