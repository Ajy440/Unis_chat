import React, { useState, useFocus } from "react";
import { firebaseApp } from "../Firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";

const db = getFirestore(firebaseApp);
const options = [
  "😀",
  "😁",
  "😆",
  "😂",
  "🤣",
  "🥲",
  "🥹",
  "😊",
  "😇",
  "🙃 ",
  "😉",
  "😍",
  "🥰",
  "😘",
  "😎",
];

const ITEM_HEIGHT = 48;

const ChatFooter = () => {
  const auth = getAuth(firebaseApp);
  const [msg, updateMsg] = useState("");
  const userState = useSelector((state) => state.chat.selectedUserData);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (emoji) => {
    setAnchorEl(null);
    if (options.includes(emoji)) {
      updateMsg(msg + emoji);
    }
  };

  const data = {
    body: msg,
    ts: Date.now(),
    sender: auth?.currentUser?.email,
  };

  const collectionpath = auth.currentUser?.email + "-chat-" + userState.email;
  const scollectionpath = userState.email + "-chat-" + auth.currentUser?.email;

  const addData = async () => {
    if (msg === "") {
      notify("Body cant be balnk", "error");
    } else {
      await setDoc(
        doc(db, "chats/" + collectionpath + "/messages", `${Date.now()}`),
        data
      );
      await setDoc(
        doc(db, "chats/" + scollectionpath + "/messages", `${Date.now()}`),
        data
      );
      updateMsg("");
    }
  };

  const textFieldHandler = (e) => {
    if (e.key === "Enter") {
      addData();
    }
    //
  };

  const notify = (msg, type) => {
    if (type === "error") {
      toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (type === "success") {
      toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Paper
      elevation="0"
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: "8vh",
        borderRadius: "18px",
        p: 2,
      }}
    >
      <TextField
        id="size-small"
        size="small"
        variant="standard"
        sx={{ width: "70%", borderRadius: "18px", mr: 2 }}
        value={msg}
        onKeyPress={textFieldHandler}
        onChange={(e) => {
          updateMsg(e.target.value);
        }}
      />

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "#5e35b1" }}
      >
        <SentimentVerySatisfiedIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <Grid container spacing={2} sx={{ p: 1 }}>
          {options.map((option) => (
            <Grid item xs={2}>
              <Box
                key={option}
                onClick={() => handleClose(option)}
                sx={{ cursor: "pointer" }}
              >
                {option}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Menu>

      <IconButton
        aria-label="fingerprint"
        sx={{
          backgroundColor: "#1e88e5",
          color: "white",
          ml: 2,
          "&:hover": {
            backgroundColor: "#1e88f7",
          },
        }}
        onClick={addData}
      >
        <SendIcon />
      </IconButton>

      <ToastContainer />
    </Paper>
  );
};

export default ChatFooter;
