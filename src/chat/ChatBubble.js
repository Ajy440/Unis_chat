import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ChatBubble = (props) => {
  const userState = useSelector((state) => state.chat.selectedUserData);

  useEffect(() => {
    props.scrollToBottom();
  }, [props]);
  return (
    <div>
      <Grid container sx={{ float: "left" }}>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          {props.data.sender === userState.email ? (
            <Paper
              sx={{
                float: "left",
                backgroundColor: "#5e35b1",
                color: "white",
                mt: 2,
                mr: 6,
                mb: 1,
                borderRadius: "16px",
                maxWidth: "40vw",
                wordWrap: "break-word",
              }}
            >
              <Typography sx={{ p: 1.5 }}>{props.data.body}</Typography>
            </Paper>
          ) : (
            <Paper
              sx={{
                float: "right",
                backgroundColor: "#1e88e5",
                color: "white",
                mt: 2,
                ml: 6,
                mb: 1,
                borderRadius: "16px",
                maxWidth: "40vw",
                wordWrap: "break-word",
              }}
            >
              <Typography sx={{ p: 1.5, textAlign: "right" }}>
                {props.data.body}
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatBubble;
