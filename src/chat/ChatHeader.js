import React from "react";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";

const ChatHeader = () => {
  const userState = useSelector((state) => state.chat.selectedUserData);

  return (
    <Paper
      elevation="2"
      sx={{
        width: "100%",
        backgroundColor: "white",
        height: "8vh",
        borderRadius: "18px",
        p: 1,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "left",
          width: "40%",
        }}
      >
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src={userState?.photoURL}
            sx={{ width: 32, height: 32, display: "flex", mr: 5 }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography component="div" variant="h8" sx={{ display: "flex" }}>
            {userState?.name}
          </Typography>
          <Typography
            color="text.secondary"
            component="div"
            sx={{ fontSize: "12px" }}
          >
            {userState?.status}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChatHeader;
