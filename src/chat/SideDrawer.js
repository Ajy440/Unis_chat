import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import AddFriend from "./AddFriend";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../Firebase/config";

const db = getFirestore(firebaseApp);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
}));

const SideDrawer = (props) => {
  const auth = getAuth(firebaseApp);
  const [getcontacts, updateContacts] = useState({});

  const theme = useTheme();

  const [value, loading, error] = useCollection(
    collection(
      getFirestore(firebaseApp),
      "userFriends/" + auth.currentUser?.email + "/friends"
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [gValue] = useCollection(
    collection(getFirestore(firebaseApp), "users/global/data"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value) {
      const users = [];
      value.docs.map((doc) => {
        //console.log(doc.id);
        if (gValue) {
          gValue.docs.map((doc2) => {
            if (doc2.data().email === doc.id) {
              users.push(doc2.data());
            }
          });
        }
      });
      console.log(users);
      updateContacts(users);
    }
  }, [value, gValue]);

  let renderedContacts = "";
  renderedContacts = getcontacts.map((contact) => {
    return (
      <Card
        sx={{ display: "flex", p: 1, backgroundColor: "#ede7f6" }}
        key={contact.email}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar
              alt="Remy Sharp"
              src={contact.photoURL}
              sx={{ width: 32, height: 32, display: "flex" }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography component="div" variant="h8" sx={{ display: "flex" }}>
              {contact.name}
            </Typography>
            <Typography
              color="text.secondary"
              component="div"
              sx={{ fontSize: "12px" }}
            >
              {contact.email}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  });

  return (
    <>
      <DrawerHeader>
        <h1>Chats</h1>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <IconButton onClick={() => props.handleDrawerClose()}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
      </DrawerHeader>
      <AddFriend />

      <div style={{ padding: 5 }}>{renderedContacts}</div>
    </>
  );
};

export default SideDrawer;
